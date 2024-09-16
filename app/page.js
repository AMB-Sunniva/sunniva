import styles from './page.module.css'
import LandingPage from "@/components/LandingPage";
import Link from 'next/link';
import Button from '@/components/Button';
import Image from 'next/image';
import Carousel from '@/components/Carousel/Carousel'

export default function HomePage() {
  return (
    <div>
      <LandingPage />
      <div className={styles.homePage}>
        <div>
          <hr className={styles.customLine} />
          <div className={styles.intro}>
            <p>Transform your outdoor spaces with our easy-to-install, customizable solar shade structures. Enjoy sustainable living, quality craftsmanship, and beautiful designs that bring families together. Discover the Sunniva Solar difference today.</p>
            <Link href="/shop">
                <Button type='bigPrimary'>SHOP NOW</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.overview}>
     <Carousel/>
      </div>
      <div className={styles.homePage}>
        <div className={styles.logo}>
            <Image src="/images/blueLogo.png" alt="Sunniva" width={500} height={100} className='md:w-3/4 pb-4'/>
        </div>
        <div>
          <div className={styles.benefits}>
            <h1>Benefits</h1>
          </div>
          <div className={styles.aboutSection}>
            <div>
              <p>
              <span className='font-bold'>Sustainability:</span> Our solar shade structures harness renewable energy, reducing your carbon footprint and promoting a greener future
              </p>
            </div>
            <div>
              <p>
                <span className='font-bold'>DIY Friendly:</span> Our kits come with everything you need and are designed for simple, DIY assembly, giving you the freedom to create your perfect outdoor space
              </p>
            </div>
            <div>
              <p>
                <span className='font-bold'>High Quality Materials:</span> Crafted from durable, FSC-certified materials and high-efficiency solar panels, our structures ensure long-lasting performance and reliability 
              </p>
            </div>
            <div>
              <p> 
                <span className='font-bold'>Aesthetic and Functionality:</span> Our designs not only provide energy savings but also add beauty and value to your property, creating enjoyable spaces for family and friends
              </p>
            </div>
          </div>
          <div className={styles.benefits}>
            <hr className={styles.customHr} />
            <h1>Contact Us</h1>
          </div>
          <div className={styles.aboutSection}>
            <p>
              office@sunnivasol.com <br />
              970-759-5502
            </p>
            <Link href="/contact-us">
                <Button type='bigPrimary'>LEARN MORE</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
