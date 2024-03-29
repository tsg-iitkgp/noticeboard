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

  async function fetchNotices(files) {
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
        const file = `${noticesDir}/${i}.html`;
        const response = await fetch(file);
        const data = await response.text();
        const htmlDocument = parser.parseFromString(data, 'text/html');
        const title = htmlDocument.querySelector('h2').textContent;
        const timestamp = htmlDocument.querySelector('h5').textContent;
        const body = htmlDocument.querySelector('pre').textContent;
        
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
          showNoticeDetails(title, body, timestamp, i);
        });

        // Append notice to notices container
        noticeList.appendChild(noticeElement);
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  }

  function showNoticeDetails(title, body, timestamp, noticeIndex) {
    noticeDetails.innerHTML = `
      <h2>${title} <a href="../notices/${noticeIndex}.html" target="_blank"><img width="25px" src="../favicons/share.png"></a></h2>
      <hr>
      <p>
        <pre>${body}</pre>
      </p>
      <hr>
      <h5>${timestamp}</h5>
    `;
  }
});