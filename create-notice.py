import os
from datetime import datetime

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

  html_notice = f""" <title>
{title}
</title>

<time>
{current_time}
</time>

<body>
{notice}
</body>
"""

  return html_notice


# Genereate new filename
def generate_file_seq():
  notices_folder = "./notices"
  notice_files = os.listdir(notices_folder)
  notice_files.sort(key=lambda x: int(x.split('.')[0]))
  latest_notice_file = notice_files[-1]
  latest_notice_seq = os.path.splitext(latest_notice_file)[0]

  return int(latest_notice_seq) + 1


def main():
  title, notice = get_notice_content()
  html_notice = parse_notice_to_html(title, notice)
  file_seq = generate_file_seq()

  # Write HTML content to a file
  with open(f"./notices/00{file_seq}.html", "w") as file:
      file.write(html_notice)

  print("HTML file generated successfully.")

main()