// Function to send OTP
async function sendOTP() {
    const email = document.getElementById('email').value;

    if (!email) {
        alert('Please enter an email to send OTP.');
        return;
    }

    try {
        const response = await fetch('/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message); 
            window.location.href = './login.html' // Show success message
        } else {
            alert('Failed to send OTP: ' + result.message);  // Show failure message
        }
    } catch (error) {
        console.log('Error sending OTP:', error);
        alert('Error sending OTP. Please try again.');
    }
}

// Function to handle signup submission
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const otp = document.getElementById('otp').value;

    // Validate form fields
    if (!username || !email || !password || !confirmPassword || !otp) {
        alert('All fields are required.');
        return;
    }

    if (password !== confirmPassword) {
        document.getElementById('passwordError').innerText = 'Passwords do not match.';
        return;
    }

    // Clear any existing error messages
    document.getElementById('passwordError').innerText = '';

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, otp })
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);  // Show success message
            // Send confirmation email after successful signup
            await sendConfirmationEmail(email);
        } else {
            alert('Signup failed: ' + result.message);  // Show failure message
        }
    } catch (error) {
        console.log('Error during signup:', error);
        alert('Error during signup. Please try again.');
    }
});

// Function to send confirmation email
async function sendConfirmationEmail(email) {
    try {
        const response = await fetch('/send-confirmation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const result = await response.json();
        if (response.ok) {
            alert('Confirmation email sent successfully.');
        } else {
            alert('Failed to send confirmation email: ' + result.message);
        }
    } catch (error) {
        console.log('Error sending confirmation email:', error);
        alert('Error sending confirmation email.');
    }
}
