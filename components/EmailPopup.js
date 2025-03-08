import { useState, useEffect } from "react";
import styles from "./EmailPopup.module.css";

export default function EmailPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
      setTimeout(() => setIsVisible(true), 5000);
    
  }, []);

  const closePopup = () => {
    console.log("Popup Closed"); // Debugging
    setIsVisible(false);
    localStorage.setItem("popupDismissed", "true");
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
          />
          <button onClick={closePopup}>Subscribe</button>
        </div>
      </div>
    )
  );
}
