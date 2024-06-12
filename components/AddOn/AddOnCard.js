import styles from './AddOnCard.module.css';

const AddOnCard = ({ title, description, imageUrl }) => {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={title} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{title}</h2>
        <hr style={{width:'5%', borderColor: '#333', margin: '15px auto'}} />
        <p className={styles.cardDescription}>{description}</p>
        <button className={styles.cardButton}>LEARN MORE</button>
      </div>
    </div>
  );
};

export default AddOnCard;
