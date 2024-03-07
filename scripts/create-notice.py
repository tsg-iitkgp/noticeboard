import os
import argparse
import subprocess
from datetime import datetime
from dotenv import load_dotenv

# Take input for title and body content
def get_notice_content():
  title = input("Enter the title for the notice: ").strip()

  # Take input for body content
  print("Enter/Paste the notice (press Ctrl+D to finish):")
  body_content_lines = []
  try:
      while True:
          line = input().strip()
          body_content_lines.append(line)
  except EOFError:
      pass

  # Join the body content lines into a single string
  body_content = "\n".join(body_content_lines).strip()

  return title, body_content


# Format HTML content
def parse_notice_to_html(title, notice):
  # Generate current time
  current_time = datetime.now().strftime("%b %d, %Y | %H:%M")

  html_notice = f"""<!DOCTYPE html>
<html>

<head>
  <title>{title}</title>
  <link rel="stylesheet" href="../css/styles.css">  
  <link rel="stylesheet" href="../css/noticedetails.css">  
  <style>
    body {{
      height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }}
    .notice-details {{
      width: 90vw;
    }}
  </style>
</head>

<body>
  <div class="notice-details">
    <h2>{title}</h2>
    <hr>
    <p>
      <pre>
{notice}
      </pre>
    </p>
    <hr>
    <h5>{current_time}</h5>
  </div>

  <div class="footer">
    <pre>Maintained by <a href="../pages/techcoordi.html" target="_blank">Technology Coordinators(s), Technology Students' Gymkhana, IIT Kharagpur</a></pre>
  </div>
</body>
</html>
"""

  return html_notice


# Genereate new filename
def generate_file_seq(notices_folder):
  # Check if folder exists, create if not
  if not os.path.exists(notices_folder):
      os.makedirs(notices_folder)

  notice_files = os.listdir(notices_folder)
  if len(notice_files) != 0:
    notice_files.sort(key=lambda x: int(x.split('.')[0]))
    latest_notice_file = notice_files[-1]
    latest_notice_seq = os.path.splitext(latest_notice_file)[0]
  else:
    latest_notice_seq = 0

  return int(latest_notice_seq) + 1


# CLI argument parsing
def parse_args():
  parser = argparse.ArgumentParser(description='Genereate notices in required format')
  parser.add_argument('--sync', action="store_true", help='Sync the notices folder with the server', required=False)
  args = parser.parse_args()

  return args


def main():
  title, notice = get_notice_content()
  html_notice = parse_notice_to_html(title, notice)
  
  notices_dir = "../notices"
  file_seq = generate_file_seq(notices_dir)

  # Write HTML content to a file
  with open(f"{notices_dir}/{file_seq}.html", "w") as file:
      file.write(html_notice)
  print("HTML file generated successfully.")

  args = parse_args()
  if args.sync:
    # Load environment variables
    load_dotenv() 
    SERVER_USERNAME = os.getenv('SERVER_USERNAME')
    SERVER_IP = os.getenv('SERVER_IP')
    SERVER_DIR = os.getenv('SERVER_DIR')
    SERVER_PASSWORD = os.getenv('SERVER_PASSWORD')
    
    # Construct rsync command
    if SERVER_PASSWORD:
      rsync_cmd = [
        'rsync', '-avzi', 
        f'{notices_dir}/',
        '-e', 
        f'sshpass -p {SERVER_PASSWORD} ssh {SERVER_USERNAME}@{SERVER_IP}:{SERVER_DIR}'
      ]
    else:
      rsync_cmd = [
        'rsync', '-avzi', 
        f'{notices_dir}/', 
        f'{SERVER_USERNAME}@{SERVER_IP}:{SERVER_DIR}'
      ]

    # Execute rsync subprocess  
    process = subprocess.run(rsync_cmd)
    
    if process.returncode == 0:
      print("Sync successful")
    else:
      print("Sync failed")

if __name__ == "__main__":
  main()
