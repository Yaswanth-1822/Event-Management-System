document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registration-form');

  // Extract eventId from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('eventId');  // Get eventId from query parameter

  // Check if user is logged in using localStorage
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const username = localStorage.getItem('username');

  if (!isLoggedIn || !username) {
      alert('You are not logged in. Please log in to register for this event.');
      return;
  }

  form.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent form submission

      const participant = {
          registerNumber: document.getElementById('registerNumber').value,
          department: document.getElementById('department').value,
          section: document.getElementById('section').value,
          eventId,  // Pass eventId from URL
          username  // Send the logged-in user's username from localStorage
      };

      // Submit participant data to the backend
      fetch('/api/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(participant), // Send registration data including username
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              alert('You have successfully registered for the event.');
          } else {
              alert('Registration failed: ' + data.message);
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
  });
});
