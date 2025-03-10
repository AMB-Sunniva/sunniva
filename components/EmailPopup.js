// Firebase SDK Initialization Handling
document.addEventListener('DOMContentLoaded', function() {
    const loadEl = document.querySelector('#load');

    try {
        let app = firebase.app();
        let features = [
            'auth', 
            'database', 
            'firestore',
            'functions',
            'messaging', 
            'storage', 
            'analytics', 
            'remoteConfig',
            'performance',
        ].filter(feature => typeof app[feature] === 'function');

        loadEl.textContent = `Firebase SDK loaded with ${features.join(', ')}`;
    } catch (e) {
        console.error(e);
        loadEl.textContent = 'Error loading the Firebase SDK, check the console.';
    }
});

// Popup Functionality
export function openPopup() {
    document.getElementById("popupContainer").style.display = "flex";
}

export function closePopup() {
    document.getElementById("popupContainer").style.display = "none";
}

// Event Listeners
document.getElementById("openPopup").addEventListener("click", openPopup);
document.getElementById("closePopup").addEventListener("click", closePopup);

document.getElementById("popupContainer").addEventListener("click", function (event) {
    if (event.target === this) {
        closePopup();
    }
});