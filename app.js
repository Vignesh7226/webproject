// DOM Elements
const elements = {
  userImage: document.getElementById('user-image'),
  userName: document.getElementById('user-name'), 
  userAge: document.getElementById('user-age'),
  userGender: document.getElementById('user-gender'),
  userLocation: document.getElementById('user-location'),
  userEmail: document.getElementById('user-email'),
  userPhone: document.getElementById('user-phone'),
  generateBtn: document.getElementById('generate-btn')
};

// Check if all required elements exist
for (const [name, element] of Object.entries(elements)) {
  if (!element) {
    console.error(`Missing required element: ${name}`);
    document.body.innerHTML = `
      <div style="color: red; padding: 20px; font-family: sans-serif;">
        Error: Required element '${name}' not found. Please check the HTML.
      </div>
    `;
    throw new Error(`Missing required element: ${name}`);
  }
}

// Fetch Random User
async function fetchRandomUser() {
    try {
        // Show loading state
        elements.generateBtn.disabled = true;
        elements.generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

        const response = await fetch('https://randomuser.me/api/');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        const user = data.results[0];

        // Update UI with user data
        elements.userImage.src = user.picture.large;
        elements.userName.textContent = `${user.name.first} ${user.name.last}`;
        elements.userAge.textContent = user.dob.age;
        elements.userGender.textContent = user.gender;
        elements.userLocation.textContent = `${user.location.city}, ${user.location.country}`;
        elements.userEmail.textContent = user.email;
        elements.userPhone.textContent = user.phone;

        // Restore button state
        elements.generateBtn.disabled = false;
        elements.generateBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Generate New User';

    } catch (error) {
        console.error('Error:', error);
        if (elements.generateBtn) {
            elements.generateBtn.disabled = false;
            elements.generateBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Try Again';
        }
        document.body.insertAdjacentHTML('beforeend', `
            <div style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 15px;
                background: #ff4444;
                color: white;
                border-radius: 5px;
                font-family: sans-serif;
            ">
                Error: ${error.message}
            </div>
        `);
    }
}

// Event Listeners
elements.generateBtn.addEventListener('click', fetchRandomUser);

// Load initial user
document.addEventListener('DOMContentLoaded', fetchRandomUser);
