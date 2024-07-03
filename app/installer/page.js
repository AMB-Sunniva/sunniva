import styles from './page.module.css'
import InstallerSignUp from '@/components/Installer/InstallerSignUp';
import Image from 'next/image';

export default function Installer() {
  return (
    <div>
       <div className={styles.title}>
        <hr style={{width:'3%', borderColor: '#333', margin: '30px auto'}} />
        <h1>INSTALLER DISCOUNT</h1>
      </div>
      <div className={styles.installerSection}>
        <p>Unlock exclusive savings with our Installer Discount: enjoy 10% off all systems purchased through Sunniva Solar, or elevate your savings to 15% when you buy 10 or more systems at once. Sign up below to access this incredible offer and receive all the information you need to start enjoying the benefits of partnering with Sunniva Solar. Join us in revolutionizing solar installation and maximizing your profitability today!</p>
      </div>
      <div className={styles.howItWorks}>
        <div className={styles.card}>
          <Image src='/images/picSix.jpeg' alt='Installer' width={200} height={100} className={styles.cardImage}/>
          <div className={styles.cardContent}>
            <div className={styles.benefits}>
              <h2 className={styles.benefitsTitle}>BENEFITS</h2>
              <p className={styles.benefitsDescription}>Our Installer Discount offers installers a multitude of benefits, including discounted pricing to enhance profitability and save on project costs. By purchasing multiple systems, installers can also enjoy reduced shipping expenses, further maximizing their savings and improving their bottom line. Additionally, offering a wider range of high-quality solar products not only increases installer credibility and customer satisfaction but also fosters greater opportunities for positive reviews and referrals. Join our program today and be a part of making dreams come true for homeowners while boosting your business&apos;s profitability and enhancing the lives of families in your community.</p>
            </div>
            <hr style={{width:'10%', borderColor: '#333', margin: '16px 32px 16px 50%'}} />
            <div className={styles.howContent}>
              <h2 className={styles.howTitle}>HOW IT WORKS</h2>
              <p className={styles.howDescription}>Our installer program operates seamlessly: simply sign up below to receive your exclusive login credentials from Sunniva Solar. Once logged in, you&apos;ll gain access to our installer-only product page, where you can browse and select the systems you wish to purchase. At checkout, apply your company-specific coupon code to unlock your discounted pricing, or reach out to our office directly for personalized assistance and guidance.</p>
            </div>
          </div>
        </div>
      </div>
      <InstallerSignUp />
    </div>
  );
}
