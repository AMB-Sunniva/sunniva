import styles from './page.module.css'
import Image from 'next/image';

export default function WhySunnivaPage() {
  return (
    <div className={styles.whyDescription}>
    <hr style={{width:'3%', borderColor: '#333', margin: '30px auto'}} />
      <h2>WHY SUNNIVA?</h2>
        <p>
        At Sunniva Solar, we are passionate about enhancing outdoor living spaces through innovative
        solar and shade solutions. Our mission is to bring families together by creating beautiful,
        functional environments where memories are made. We understand that your home is a reflection
        of your values and lifestyle, and we are dedicated to providing products that combine
        sustainability, quality, and design excellence.
        </p>
        <p>
        Our commitment to you goes beyond just providing top-notch solar and shade structures. We
        strive to make a positive impact on the environment while delivering products that enrich your
        life. By harnessing the power of renewable energy and offering customizable designs, we
        empower you to create outdoor spaces that are both eco-friendly and uniquely yours.
        </p>

            <div className={styles.box}>
                <div className={styles.content}>
                    <div>
                    <h3>Core Values</h3>
                    <hr style={{width:'3%', borderColor: '#333', margin: '30px auto'}} />
                        <div className={styles.values}>
                        Sunniva Solar holds itself to a certain set of standards. We provide a value and experience that you will not find elsewhere. Our goal is to maintain these values and assure our customers that their products are sustainable and high quality. Above all, we are a family here at Sunniva.
                        </div>
                        <ul>
                            <h1>Family</h1>
                                <h5>We believe in the importance of creating spaces where families can gather, bond,
                                and enjoy quality time together.</h5>
                            <h1>Sustainability</h1>
                                <h5>Our commitment to eco-friendly practices ensures that our products
                                contribute to a greener, more sustainable future.</h5>
                            <h1>Quality</h1>
                                <h5>We are dedicated to using premium materials and craftsmanship to deliver
                                durable, high-performance products that stand the test of time.</h5>
                            </ul>
                            <div className={styles.image}>
                                <Image src="/images/RLSWarm.jpg" alt="Sunniva" width="{250}" height="{50}" className={styles.centeredImage} />
                            </div>
                            <div className={styles.closing}>
                            At Sunniva Solar, we&apos;re not just designing structures; we&apos;re shaping the places where life&apos;s moments unfold. Join us in building a more beautiful and sustainable future, one outdoor space
                            at a time.                            
                            </div>
                    </div>
                </div>
            </div>
        
            <div className={styles.box}>
                <div className={styles.content}>
                    <div>
                    <h3>Our Sustainability Commitment</h3>
                    <hr style={{width:'3%', borderColor: '#333', margin: '30px auto'}} />
                        <div className={styles.sustainability}>
                        At Sunniva Solar, we are dedicated to fostering a sustainable future through responsible practices
                        and innovative solutions. Our commitment to sustainability is reflected in every aspect of our
                        business, from the materials we use to the community initiatives we support.
                        </div>
                        <ul>
                            <h4>Materials and Design</h4>
                                <li>
                                <span>Premium Quality Wood:</span> Our structures are built using high quality, rough-sawn Douglas, known for its strength, durabilty, and natural beauty. This carefully selected wood provides a sturdy and long-lasting foundation while enhancing the aesthetic appeal of any space.
                                </li>
                                <li>
                                <span>High-Quality Solar Panels:</span> Our structures feature tier 1 solar panels renowned for their efficiency and durability. These panels contribute to clean energy generation and support a reduction in greenhouse gas emissions.
                                </li>
                            <h4>Environmental Impact</h4>
                                <li>
                                <span>Reduced Carbon Footprint:</span> By harnessing solar energy, our products help decrease dependence on fossil fuels, making a positive impact on the environment and reducing your carbon footprint.
                                </li>
                                <li>
                                <span>Recycling and Waste Reduction:</span> We are committed to minimizing waste during production and encourage the recycling of materials. Our goal is to lessen our environmental impact and promote a circular economy.
                                </li>
                            <h4>Community and Partnerships</h4>
                                <li>
                                <span>Supporting Local Installers:</span> We partner with local solar installers to foster economic growth and create job opportunities within communities across the country.
                                </li>
                                <li>
                                <span>Educational Initiatives:</span> Through workshops and online resources, we educate homeowners and installers on the benefits of renewable energy and sustainable practices, empowering them to make informed decisions.
                                </li>
                            <h4>Continuous Improvement</h4>
                                <li>
                                <span>Research and Innovation:</span> We invest in research and development to continuously enhance the efficiency and sustainability of our products. Our focus is on integrating new materials and technologies to improve our offerings.
                                </li>
                                <li>
                                <span>Customer Education:</span> We are committed to providing our customers with knowledge about sustainable practices and energy savings, helping them make eco-friendly choices that benefit both their homes and the planet.
                                </li>
                            </ul>
                            <div className={styles.image}>
                                <Image src="/images/blueLogo.png" alt="Sunniva" width="{250}" height="{50}" className={styles.centeredImage} />
                            </div>
                            <div className={styles.closing}>
                                Together, we can create beautiful spaces that not only bring families closer but also contribute to a healthier planet for future generations. Thank you for choosing Sunniva Solar and joining us in building a sustainable future.
                            </div>
                    </div>
                </div>
            </div>
        </div>
  );
}
