import styles from './WhatWeOfferCard.module.css';

const WhatWeOfferCard = ({ title, description, imageUrl }) => {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={title} className={styles.cardImage} />
      <div className={styles.cardSetUp}>
        <div className={styles.cardContent}>
          <h2 className={styles.cardTitle}>{title}</h2>
          <hr style={{width:'5%', borderColor: '#333', margin: '15px 0'}} />
          <p className={styles.cardDescription}>{description}</p>
          <button className={styles.cardButton}>REQUEST A QUOTE</button>
        </div>
      </div>
    </div>
  );
};

export default WhatWeOfferCard;
