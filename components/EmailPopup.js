import { useState } from 'react';
import styles from './EmailPopup.module.css';

export default function EmailPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    handleClose();
  };

  return (
    <div>
      <button className={styles.openButton} onClick={handleOpen}>Subscribe</button>
      {isOpen && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <h2>Subscribe to Our Newsletter</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Submit</button>
              <button type="button" onClick={handleClose}>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}