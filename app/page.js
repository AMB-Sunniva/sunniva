import styles from './page.module.css'
import LandingPage from "@/components/LandingPage";
import Link from 'next/link';
import { PiLightbulbFilamentThin, PiStackSimpleThin, PiMoneyThin } from "react-icons/pi";
import Button from '@/components/Button';

export default function HomePage() {
  return (
    <div>
      <LandingPage />
      <div className={styles.homePage}>
        <div className={styles.logo}>
            <img src="/logo.png" alt="Sunniva" />
        </div>
        <div>
          <div className={styles.title}>
            <hr style={{width:'5%', borderColor: '#333', margin: '30px 0'}} />
            <h1>STUNNING BACKYARD SHADE STRUCTURES</h1>
          </div>
          <div className={styles.aboutSection}>
            <p>Sunniva Solar specializes in crafting stunning solar and shade structures, and we are thrilled to announce that you can now purchase them as convenient kits through our online shop today. Explore our collection and discover the perfect addition to your space!</p>
            <Link href="/shop">
                <Button type='bigPrimary'>SHOP NOW</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.overview}>
        <div className={styles.overviewContent}>
          <PiLightbulbFilamentThin size="5em" />
            <h2>MICROINVERTERS</h2>
            <p>We utilize microinverters to maximize the production of your system and offering you an easy and efficient way to track your production.</p>
        </div>
        <div className={styles.overviewContent}>
          <PiStackSimpleThin size="5em" />
            <h2>WARRANTY</h2>
            <p>Our Products our backed by a 25 year warranty with a 10 year construction warranty.</p>
        </div>
        <div className={styles.overviewContent}>
          <PiMoneyThin size="5em"  />
            <h2>FEDERAL AND STATE TAX CREDIT</h2>
            <p>There is a federal solar tax credit which offers you 30% of the cost of your system back. In Utah there is also a tax credit of $400.</p>
        </div>
      </div>
      <div className={styles.homePage}>
        <div className={styles.logo}>
            <img src='https://via.placeholder.com/150' alt="Sunniva" />
        </div>
        <div>
          <div className={styles.benefits}>
            <h1>DUAL PURPOSE</h1>
          </div>
          <div className={styles.aboutSection}>
            <p>Sunniva Solar specializes in crafting stunning solar and shade structures, and we are thrilled to announce that you can now purchase them as convenient kits through our online shop today. Explore our collection and discover the perfect addition to your space!</p>
          </div>
          <div className={styles.benefits}>
            <hr style={{width:'5%', borderColor: '#333', margin: '30px 0 1.5em 0'}} />
            <h1>NO LEAKS</h1>
          </div>
          <div className={styles.aboutSection}>
            <p>Sunniva Solar specializes in crafting stunning solar and shade structures, and we are thrilled to announce that you can now purchase them as convenient kits through our online shop today. Explore our collection and discover the perfect addition to your space!</p>
            <Link href="/why-sunniva">
                <Button type='bigPrimary'>LEARN MORE</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
