document.addEventListener("DOMContentLoaded", function() {
  const noticeList = document.querySelector('.noticeList');
  const noticeDetails = document.querySelector('.notice-details');

  // Fetch notices from files
  fetchNotices();

  function fetchNotices() {
    fetchNoticesFromFolder('./notices')
      .then(files => {
        if (files.length != 0) {
          noNoticeText = document.getElementById('no-notice')
          noNoticeText.style.display = "none"
        }

        files.forEach(file => {
          fetchNotice(`./notices/${file}`);
        });
      })
      .catch(error => console.error('Error fetching notices:', error));
  }

  async function fetchNoticesFromFolder(folderPath) {
    const response = await fetch(folderPath);
    const data = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    const links = Array.from(doc.querySelectorAll('a'));
    // Extract filenames and sort them numerically
    const files = links.map(link => link.getAttribute('href')).sort((a, b) => {
      const numA = parseInt(a.split('.')[0]);
      const numB = parseInt(b.split('.')[0]);
      return numB - numA;
    });
    return files;
  }

  function fetchNotice(file) {
    fetch(file)
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(data, 'text/html');
        const title = htmlDocument.querySelector('title').textContent;
        const timestamp = htmlDocument.querySelector('time').textContent;
        const body = htmlDocument.querySelector('body').textContent.split('\n').slice(5).join('\n').trim();
        // Create a notice element
        const noticeElement = document.createElement('div');
        noticeElement.classList.add('notice');
        noticeElement.innerHTML = `
          <h3>${title}</h3>
          <h5>${timestamp}</h5>
        `;
        // Add click event listener to show notice details
        noticeElement.addEventListener('click', () => {
          // Manipulating Id to display clicked or not
          prevNotice = document.getElementById('notice-clicked')
          if (prevNotice != null) {
            prevNotice.id = ""
          }
          noticeElement.id = "notice-clicked"

          // Display the notice
          showNoticeDetails(title, body, timestamp);
        });
        // Append notice to notices container
        noticeList.appendChild(noticeElement);
      })
      .catch(error => console.error(`Error fetching notice ${i}:`, error));
  }

  function showNoticeDetails(title, body, timestamp) {
    noticeDetails.innerHTML = `
      <h2>${title}</h2>
      <hr>
      <p>
        <pre>${body}</pre>
      </p>
      <hr>
      <h5>${timestamp}</h5>
    `;
  }
});
