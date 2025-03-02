import styles from './page.module.css'

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

        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.content}>
                    <h2>OUR CORE VALUES</h2>
                    <div>
                        <ul>
                            <li>
                            <span>Family:</span> We believe in the importance of creating spaces where families can gather, bond,
                            and enjoy quality time together.
                            </li>
                            <li>
                            <span> Sustainability:</span> Our commitment to eco-friendly practices ensures that our products
                            contribute to a greener, more sustainable future.
                            </li>
                            <li>
                            <span>Quality:</span> We are dedicated to using premium materials and craftsmanship to deliver
                            durable, high-performance products that stand the test of time.
                            </li>
                        </ul>
                        <div className={styles.values}>At Sunniva Solar, we&apos;re not just designing structures; we&apos;re shaping the places where life&apos;s moments unfold. Join us in building a more beautiful and sustainable future, one outdoor space
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
                                <span>FSC Certified Wood:</span> We use sustainably sourced, FSC certified rough sawn doug fir for our structures. This ensures that our materials come from responsibly managed forests, promoting environmental stewardship.
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
                            <div className={styles.closing}>
                                Together, we can create beautiful spaces that not only bring families closer but also contribute to a healthier planet for future generations. Thank you for choosing Sunniva Solar and joining us in building a sustainable future.
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
