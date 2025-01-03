document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();  // Prevent default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        
        if (data.success) {
            alert('Login successful!');

            // Set isLoggedIn to true and store username after successful login
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);  // Correctly store the username
            
            // Redirect to main page
            window.location.href = './test.html';
        } else if (data.error === 'Invalid Username') {
            alert('Username is incorrect. Please enter the correct one.');
        } else if (data.error === 'Invalid Password') {
            alert('Password is incorrect. Please enter the correct one.');
        }
    } catch (err) {
        console.error('Error during login:', err);
    }

  // Example login function (after a successful login)
function login(username) {
    localStorage.setItem('username', username); // Store the username in localStorage
    localStorage.setItem('isLoggedIn', true);   // Mark the user as logged in
    window.location.href = './test.html';       // Redirect to main page after login
}

      // Call this function upon successful login
      loginUser();
});
