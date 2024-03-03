document.addEventListener("DOMContentLoaded", function() {
  fetch("../techcoordi.json")
  .then(response => response.json())
  .then(data => {
    generateCard(data);
  });

  function generateCard(data){
    // Get card container
    const container = document.querySelector('.card-container');

    data.forEach(user => {
      // Create card
      const card = document.createElement('div');
      card.classList.add('card');

      // img 
      const img = document.createElement('img');
      img.classList.add('pic')
      img.src = `../assets/${user.id}.png`; 
      img.alt = user.id;

      // Info div
      const info = document.createElement('div');
      info.classList.add('contact-info');

      // Name  
      const name = document.createElement('p');
      name.textContent = user.name;

      // Socials div
      const socials = document.createElement('div');
      socials.classList.add('socials');
      
      const faviconSize = "40rem"
      // Email
      const email = document.createElement('a');
      email.classList.add('favicon')
      email.href = `mailto:${user.email}`;
      email.innerHTML = `<img width="${faviconSize}" src="../assets/favicons/mail.png"">`;
      
      // Phone 
      const phone = document.createElement('a');
      phone.classList.add('favicon')
      phone.href = `tel:+91${user.tele}`;
      phone.innerHTML = `<img width="${faviconSize}" src="../assets/favicons/tele.png"">`;

      // Linekdin
      const linkedin = document.createElement('a');
      linkedin.classList.add('favicon')
      linkedin.href = user.linkedin
      linkedin.innerHTML = `<img width="${faviconSize}" src="../assets/favicons/linkedin.png"">`;

      // Append social elements to social div
      socials.append(email, phone, linkedin)
      // Append info elements to info div
      info.append(name, socials);
      // Append card elements to card div
      card.append(img, info);

      container.appendChild(card);
    });
  }
});