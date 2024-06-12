import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Sunniva" />
        </div>
        <div className={styles.links}>
          <a href="/what-we-offer">WHAT WE OFFER</a>
          <a href="/why-sunniva">WHY SUNNIVA</a>
          <a href="/installer">INSTALLERS</a>
          <a href="/shop">SHOP</a>
          <a href="/contact-us">CONTACT US</a>
        </div>
      </div>
      <p className={styles.copyright}>© 2023 SUNNIVA</p>
    </footer>
  );
};

export default Footer;
