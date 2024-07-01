import Link from 'next/link';
import styles from './Header.module.css';
import { CiShoppingCart } from "react-icons/ci";
import { useCart } from '@/app/context/CartContext';

export default function Header({openCart}) {
  const { cart } = useCart();

  const totalItemsInCart = cart.reduce((acc, item) => {
    return acc + item.quantity
}, 0)

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
            <div className='relative'>
              <button onClick={openCart} className={styles.navItem}>
                <CiShoppingCart  size="2.5em" />
                {totalItemsInCart > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 absolute -top-1 -right-1 transform translate-x-1/4 -translate-y-1/8">
                {totalItemsInCart}
              </span>
            )}
              </button>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
}
