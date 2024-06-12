import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>SUNNIVA</h1>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}><Link href="/">HOME</Link></li>
            <li className={styles.navItem}><Link href="/what-we-offer">WHAT WE OFFER</Link></li>
            <li className={styles.navItem}><Link href="/why-sunniva">WHY SUNNIVA</Link></li>
            <li className={styles.navItem}><Link href="/installer">INSTALLERS</Link></li>
            <li className={styles.navItem}><Link href="/shop">SHOP</Link></li>
            <li className={styles.navItem}><Link href="/contact-us">CONTACT US</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
