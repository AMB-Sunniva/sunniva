import React, { useState, useEffect } from "react";
import styles from "./EmailPopup.module.css";

const EmailPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClick = () => setIsOpen(true);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const closePopup = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className={styles.popupOverlay} onClick={closePopup}>
        <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
          <button className={styles.closeButton} onClick={closePopup}>&times;</button>
          <h2>Subscribe to Our Newsletter</h2>
          <p>Get the latest updates and special offers.</p>
          <input type="email" placeholder="Enter your email" className={styles.emailInput} />
          <button className={styles.submitButton}>Subscribe</button>
        </div>
      </div>
    )
  );
};

export default EmailPopup;
