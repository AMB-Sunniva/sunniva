import { useState, useEffect } from "react";
import styles from "./EmailPopup.module.css"; // Create a separate CSS file for styling

export default function EmailPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Show the pop-up only if it hasn't been dismissed
    if (!localStorage.getItem("popupDismissed")) {
      setTimeout(() => setIsVisible(true), 5000); // Show after 5 seconds
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    localStorage.setItem("popupDismissed", "true");
  };

  const subscribe = async () => {
    if (!email) {
      alert("Please enter a valid email.");
      return;
    }

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      alert(data.message || "Subscription successful!");
      closePopup();
    } catch (error) {
      alert("Subscription failed. Please try again.");
    }
  };

  return (
    isVisible && (
      <div className={styles.popup}>
        <div className={styles.popupContent}>
          <span className={styles.closeBtn} onClick={closePopup}>&times;</span>
          <h2>Subscribe to our Newsletter</h2>
          <p>Stay updated with our latest news and offers!</p>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button onClick={subscribe}>Subscribe</button>
        </div>
      </div>
    )
  );
}