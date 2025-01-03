document.addEventListener('DOMContentLoaded', () => {
  const eventId = new URLSearchParams(window.location.search).get('id'); // Get event ID from URL
  const eventImage = document.getElementById('event-image');
  const eventName = document.getElementById('event-name');
  const eventDescription = document.getElementById('event-description');
  const additionalInfo = document.getElementById('additional-info');
  const countdown = document.getElementById('countdown');
  const registerBtn = document.getElementById('register-btn');
  const authLinks = document.getElementById('auth-links');

  // Check user login status from localStorage
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const username = localStorage.getItem('username');

  // Fetch event data from API using event ID
  fetch(`/api/events/${eventId}`)
    .then(response => response.json())
    .then(event => {
      eventImage.src = event.image;
      eventName.textContent = event.name;
      eventDescription.textContent = event.description;
      additionalInfo.textContent = event.additionalInfo || "No additional information.";

      // Check if the event is upcoming or completed
      const eventDate = new Date(event.date);
      const now = new Date();

      if (eventDate > now) {
        // Upcoming Event: Show countdown and register button
        countdown.style.display = 'block';
        registerBtn.style.display = 'block';

        // Countdown timer
        const interval = setInterval(() => {
          const timeDiff = eventDate - new Date();
          if (timeDiff <= 0) {
            clearInterval(interval);
            countdown.textContent = "Event has started!";
          } else {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days;
            document.getElementById('hours').textContent = hours;
            document.getElementById('minutes').textContent = minutes;
            document.getElementById('seconds').textContent = seconds;
          }
        }, 1000);

        // Register button logic
        registerBtn.addEventListener('click', () => {
          if (isLoggedIn) {
              // Directly redirect to the registration page without checking for prior registration
              window.location.href = `/event-registration.html?eventId=${eventId}`;
          } else {
              alert("Please log in to register for this event.");
          }
      });
      

      } else {
        // Completed Event: Show event is over
        countdown.style.display = 'none';
        registerBtn.style.display = 'none';

        const eventCompleted = document.createElement('div');
        eventCompleted.id = 'event-completed';
        eventCompleted.textContent = "This event is completed.";
        document.querySelector('.event-info').appendChild(eventCompleted);
      }
    });
    const storedPhoto = localStorage.getItem('profilePhoto') || './profile1.jpeg'; // Load stored photo or default
  // Update auth links or profile display based on login status
  if (isLoggedIn) {
    const authLinks = document.getElementById('auth-links');
    authLinks.innerHTML = ` 
      <img src="${storedPhoto}" alt="Profile" class="profile-img" id="profile-photo">`;
    // Redirect to profile page on profile photo click
    document.getElementById('profile-photo').addEventListener('click', () => {
      window.location.href = '/profile.html';
    });
  } else {
    authLinks.innerHTML = `<button onclick="window.location.href='/login.html'"
    style=" margin-left: 10px;
    padding: 8px 16px;
    background-color: #ff6b6b;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;">Login</button>
                           <button onclick="location.href='/index.html'"
                           style=" margin-left: 10px;
                           padding: 8px 16px;
                           background-color: #ff6b6b;
                           color: #fff;
                           border: none;
                           border-radius: 4px;
                           cursor: pointer;">Sign Up</button>`;
  }
});
