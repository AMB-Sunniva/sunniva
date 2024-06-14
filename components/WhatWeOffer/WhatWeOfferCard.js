import styles from './WhatWeOfferCard.module.css';
import Link from 'next/link';
import Button from '../Button';

const WhatWeOfferCard = ({ title, description, imageUrl }) => {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={title} className={styles.cardImage} />
      <div className={styles.cardSetUp}>
        <div className={styles.cardContent}>
          <h2 className={styles.cardTitle}>{title}</h2>
          <hr style={{width:'5%', borderColor: '#333', margin: '15px 0'}} />
          <p className={styles.cardDescription}>{description}</p>
          <Link href="/contact-us">
            <Button type='secondary'>REQUEST A QUOTE</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WhatWeOfferCard;
