document.addEventListener("DOMContentLoaded", function() {
  const noticeList = document.querySelector('.noticeList');
  const noticeDetails = document.querySelector('.notice-details');
  const parser = new DOMParser();
  const noticesDir = "./notices"

  fetch(noticesDir)
  .then(response => response.text())
  .then(data => {
    // Fetch the list of files in the notices folder
    const doc = parser.parseFromString(data, 'text/html');
    const links = Array.from(doc.querySelectorAll('a'));
    const files = links
      .filter(link => !link.getAttribute('href').includes("../") && !link.getAttribute('href').includes("./"))
      .map(link => link.getAttribute('href'));

    // Fetch notices from files
    fetchNotices(files);
  });

  function fetchNotices(files) {
    try {
      // Count the number of files
      const noticesCount = files.length;

      // Toggle no notices available message
      if (noticesCount != 0) {
        noNoticeText = document.getElementById('no-notice')
        noNoticeText.style.display = "none"
      }

      // Display only latest $limit messages
      limit = 50
      bound = noticesCount - limit
      if (bound < 0) {
        bound = 0
      }

      // Fetch notices based on the count
      for (let i = noticesCount; i > bound; i--) {
        fetch(`${noticesDir}/${i}.html`)
        .then(response => response.text())
        .then(data => {
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
            const prevNotice = document.getElementById('notice-clicked');
            if (prevNotice != null) {
              prevNotice.id = "";
            }
            noticeElement.id = "notice-clicked";
            showNoticeDetails(title, body, timestamp);
          });

          // Append notice to notices container
          noticeList.appendChild(noticeElement);
        });
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
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