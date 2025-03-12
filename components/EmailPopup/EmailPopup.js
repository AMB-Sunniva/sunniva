import React from "react";
import styles from "./EmailPopup.module.css";

const EmailPopup = ({ onClose }) => {
  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        <h2>Subscribe to Our Newsletter</h2>
        <p>The latest updates and special offers.</p>
        <input type="email" placeholder="Enter your email" className={styles.emailInput} />
        <button className={styles.submitButton}>Subscribe</button>
      </div>
    </div>
  );
};

export default EmailPopup;