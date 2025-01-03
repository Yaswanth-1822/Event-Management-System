document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch events from the backend
    async function fetchEvents() {
      try {
        const response = await fetch('/api/events'); // Adjust the endpoint based on your backend
        const events = await response.json();
        return events;
      } catch (error) {
        console.error('Error fetching events:', error);
        return [];
      }
    }
  
    // Function to create slides dynamically
    function createSlides(events) {
      const eventSlider = document.getElementById('event-slider');
  
      events.forEach(event => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
  
        slide.innerHTML = `
          <img src="${event.image}" alt="${event.name}" onclick="window.location.href='/event-details.html?id=${event._id}'">
          <h3 onclick="window.location.href='/event-details.html?id=${event._id}'">${event.name}</h3>
          <p onclick="window.location.href='/event-details.html?id=${event._id}'">${event.description}</p>
         <button onclick="window.location.href='/event-details.html?id=${event._id}'" style="padding:10px; border-radius:5px; background-color: #2a8aea; cursor:pointer; color:white;">Explore</button>

        `;
  
        eventSlider.appendChild(slide);
      });
    }
  
    // Initialize Swiper
    function initializeSwiper() {
      new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
  
    // Fetch events and initialize swiper
    fetchEvents().then(events => {
      createSlides(events);
      initializeSwiper();
    });
  });
  