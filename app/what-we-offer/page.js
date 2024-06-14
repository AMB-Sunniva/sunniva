import styles from './page.module.css'
import AddOnGallery from "@/components/AddOn/AddOnGallery"
import WhatWeOfferGallery from '@/components/WhatWeOffer/WhatWeOfferGallery'
import Link from 'next/link'
import Button from '@/components/Button'

export default function WhatWeOffer() {
  return (
    <div>
      <div className={styles.title}>
        <h1 style={{paddingTop: '32px'}}>WHAT WE OFFER</h1>
      </div>
      <WhatWeOfferGallery />
      <div className={styles.title}>
        <hr style={{width:'3%', borderColor: '#333', margin: '30px auto'}} />
        <h1>DIY KITS</h1>
      </div>
      <div className={styles.diySection}>
        <p>Experience ultimate flexibility with our DIY options – all our products, including EV chargers, solar panels, and shade structures, are available for purchase in our online shop, allowing you to customize and install them yourself.</p>
        <ul>
          <li>Solar + Shade</li>
          <li>Just Solar</li>
          <li>Just Shade</li>
          <li>EV Chargers</li>
          <li>Smart Electrical Panels</li>
        </ul>
        <p>Visit our online shop today to explore our exceptional range of products and make your purchase, bringing innovation, sustainability, and style to your doorstep.</p>
        <Link href="/shop">
            <Button type='bigPrimary'>SHOP NOW</Button>
        </Link>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <hr style={{width:'3%', borderColor: '#333', margin: '30px auto'}} />
          <h1>ADD-ONS</h1>
        </div>
        <AddOnGallery />
      </div>
    </div>
  )
}
