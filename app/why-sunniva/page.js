import styles from './page.module.css'

export default function WhySunnivaPage() {
  return (
    <div className={styles.whyDescription}>
    <hr style={{width:'3%', borderColor: '#333', margin: '30px auto'}} />
      <h2>WHY SUNNIVA?</h2>
        <p>
            Choose Sunniva as your solar and pergola installer, and unlock a world of benefits that go beyond expectations. By harnessing the power of solar energy, our installations bring not only substantial savings on energy bills but also an undeniable increase in property value. We offer flexible financing options that make transitioning to renewable energy hassle-free, while also guiding you through tax credits to maximize your investment.
        </p>
        <p>
            Our commitment to customizability ensures that your solar shade structure perfectly complements your unique aesthetic preferences and outdoor space. Experience the dual purpose of our installations, providing both shade and clean energy generation, all while seamlessly preserving the integrity of your roof. With us, you're not just investing in a structure; you're embracing a greener future, enhancing your property's appeal, and enjoying the unmatched charm of a personalized outdoor sanctuary.
        </p>

        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.content}>
                    <h2>OUR STORY</h2>
                    <p>
                        Driven by an unwavering passion, we are committed to enriching people's lives by delivering exceptional products that seamlessly blend innovation, aesthetics, and functionality.
                        <br/>
                        <br/>
                        We are a passionate team dedicated to reimagining outdoor spaces through the synergy of sustainability and creativity. Our mission is to bring the beauty of nature and the power of renewable energy together, crafting exceptional structures that not only enhance lives but also contribute positively to the environment.
                    </p>
                </div>
            </div>
            <div className={styles.box}>
                <div className={styles.content}>
                    <p>
                        We pride ourselves on delivering the pinnacle of solar innovation and design. We utilize top-tier solar panels, harnessing cutting-edge technology to maximize energy conversion and efficiency. Our use of microinverters guarantees optimal performance by individually optimizing panel outputs. Our custom racking system ensures a robust foundation for your solar array. Complementing this excellence, our wood shade structures stand as unique and enduring masterpieces, combining bespoke craftsmanship with rugged durability for an outdoor space that truly stands the test of time.
                    </p>
                    <h2>OUR PRODUCTS</h2>
                </div>
            </div>
        </div>
    </div>
  );
}
