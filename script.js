// Demo user database (for demonstration purposes only)
let users = [
    { name: "Demo User", email: "demo@example.com", password: "password123" }
];

// Form submission handlers
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        document.getElementById("loginSuccess").style.display = "block";
        document.getElementById("loginError").style.display = "none";
        
        // Simulate redirect after successful login
        setTimeout(() => {
            alert(`Welcome back, ${user.name}!`);
            document.getElementById("loginForm").reset();
            document.getElementById("loginSuccess").style.display = "none";
        }, 1500);
    } else {
        document.getElementById("loginError").style.display = "block";
        document.getElementById("loginSuccess").style.display = "none";
    }
});

document.getElementById("signupForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    
    const userExists = users.some(u => u.email === email);
    
    if (password !== confirmPassword) {
        document.getElementById("signupError").textContent = "Passwords don't match.";
        document.getElementById("signupError").style.display = "block";
        return;
    }
    
    if (userExists) {
        document.getElementById("signupError").textContent = "Email already registered.";
        document.getElementById("signupError").style.display = "block";
        return;
    }
    
    // Add user to demo database
    users.push({ name, email, password });
    
    document.getElementById("signupSuccess").style.display = "block";
    document.getElementById("signupError").style.display = "none";
    
    // Simulate redirect after successful signup
    setTimeout(() => {
        document.getElementById("signupForm").reset();
        document.getElementById("signupSuccess").style.display = "none";
        showCard('loginCard');
    }, 1500);
});

document.getElementById("forgotForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("forgotEmail").value;
    
    const userExists = users.some(u => u.email === email);
    
    if (userExists) {
        document.getElementById("forgotSuccess").style.display = "block";
        document.getElementById("forgotError").style.display = "none";
        
        // Simulate email sending
        setTimeout(() => {
            document.getElementById("forgotForm").reset();
            document.getElementById("forgotSuccess").style.display = "none";
            showCard('loginCard');
        }, 1500);
    } else {
        document.getElementById("forgotError").style.display = "block";
        document.getElementById("forgotSuccess").style.display = "none";
    }
});

// Function to show different cards
function showCard(cardId) {
    // Hide all messages
    document.querySelectorAll('.success-message, .error-message').forEach(el => {
        el.style.display = 'none';
    });
    
    // Reset all forms
    document.querySelectorAll('form').forEach(form => {
        form.reset();
    });
    
    // Get all cards
    const loginCard = document.getElementById('loginCard');
    const signupCard = document.getElementById('signupCard');
    const forgotCard = document.getElementById('forgotCard');
    
    // Hide all cards first
    loginCard.style.display = 'none';
    signupCard.style.display = 'none';
    forgotCard.style.display = 'none';
    
    // Show the requested card
    document.getElementById(cardId).style.display = 'block';
    
    // Apply appropriate classes for animation
    if (cardId === 'loginCard') {
        loginCard.classList.remove('card-back');
        signupCard.classList.add('card-back');
        forgotCard.classList.add('card-back');
    } else if (cardId === 'signupCard') {
        loginCard.classList.add('card-back');
        signupCard.classList.remove('card-back');
        forgotCard.classList.add('card-back');
    } else if (cardId === 'forgotCard') {
        loginCard.classList.add('card-back');
        signupCard.classList.add('card-back');
        forgotCard.classList.remove('card-back');
    }
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggle = input.nextElementSibling;
    
    if (input.type === "password") {
        input.type = "text";
        toggle.textContent = "Hide";
    } else {
        input.type = "password";
        toggle.textContent = "Show";
    }
}