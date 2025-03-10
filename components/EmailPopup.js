// Import and export statements (for modular use)
export function openPopup() {
    document.getElementById("popupContainer").style.display = "flex";
}

export function closePopup() {
    document.getElementById("popupContainer").style.display = "none";
}

// Event listeners for buttons
document.getElementById("openPopup").addEventListener("click", openPopup);
document.getElementById("closePopup").addEventListener("click", closePopup);

// Close popup when clicking outside of it
document.getElementById("popupContainer").addEventListener("click", function (event) {
    if (event.target === this) {
        closePopup();
    }
});
