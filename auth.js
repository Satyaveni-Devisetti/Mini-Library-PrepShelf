// Authentication utility functions for PrepShelf

// Check if user is logged in
function isLoggedIn() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser !== null;
}

// Get current user data
function getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear current user session
        localStorage.removeItem('currentUser');
        // Redirect to login page
        window.location.href = 'login.html';
    }
}

// Check authentication on page load
function checkAuth() {
    if (!isLoggedIn()) {
        // Redirect to login if not authenticated
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Update logout links on page load
function updateLogoutLinks() {
    const logoutLinks = document.querySelectorAll('a[href*="index.html"], a[href*="logout"]');
    logoutLinks.forEach(link => {
        if (link.textContent.toLowerCase().includes('logout') || 
            link.innerHTML.includes('fa-sign-in-alt')) {
            link.href = '#';
            link.onclick = logout;
        }
    });
}

// Initialize authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a protected page (not login or registration)
    const currentPage = window.location.pathname.split('/').pop();
    const publicPages = ['login.html', 'registration.html', 'register.html', 'index.html'];
    
    if (!publicPages.includes(currentPage)) {
        checkAuth();
    }
    
    // Update logout links
    updateLogoutLinks();
});

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isLoggedIn,
        getCurrentUser,
        logout,
        checkAuth,
        updateLogoutLinks
    };
} 