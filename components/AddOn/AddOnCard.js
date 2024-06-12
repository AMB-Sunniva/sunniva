"use client";
import styles from './AddOnCard.module.css';

const AddOnCard = ({ title, description, imageUrl, href }) => {
  const onClick = () => {
    window.open(href, '_blank', 'noopener noreferrer')
  }

  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={title} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{title}</h2>
        <hr style={{width:'5%', borderColor: '#333', margin: '15px auto'}} />
        <p className={styles.cardDescription}>{description}</p>
        <button className={styles.cardButton} onClick={onClick}>LEARN MORE</button>
      </div>
    </div>
  );
};

export default AddOnCard;
