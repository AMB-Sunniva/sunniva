import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Sunniva" />
        </div>
        <div className={styles.links}>
          <a href="/what-we-offer">What We Offer</a>
          <a href="/why-sunniva">Why Sunniva</a>
          <a href="/installer">Installers</a>
          <a href="/shop">Shop</a>
          <a href="/contact-us">Contact Us</a>
        </div>
      </div>
      <p className={styles.copyright}>© 2023 My Site</p>
    </footer>
  );
};

export default Footer;
