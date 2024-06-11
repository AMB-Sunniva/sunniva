import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>Sunniva</h1>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}><Link href="/">Home</Link></li>
            <li className={styles.navItem}><Link href="/what-we-offer">What We Offer</Link></li>
            <li className={styles.navItem}><Link href="/why-sunniva">Why Sunniva</Link></li>
            <li className={styles.navItem}><Link href="/installer">Installers</Link></li>
            <li className={styles.navItem}><Link href="/shop">Shop</Link></li>
            <li className={styles.navItem}><Link href="/contact-us">Contact Us</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
