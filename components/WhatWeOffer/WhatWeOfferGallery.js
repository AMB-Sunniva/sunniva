import WhatWeOfferCard from './WhatWeOfferCard';
import styles from './WhatWeOfferGallery.module.css';

const projects = [
  {
    title: 'SOLAR + SHADE',
    description: 'Our custom-designed Solar + Shade systems redefine outdoor living by combining architectural ingenuity with renewable energy. These meticulously crafted structures not only offer an inviting shaded space but also seamlessly incorporate solar panels, transforming sunlight into power. With a range of sizes available, our Solar + Shade systems provide a tailored solution that harmonizes eco-friendliness and personalized aesthetics, making your outdoor retreat both stylish and sustainable.',
    imageUrl: 'https://via.placeholder.com/150'
  },
  {
    title: 'JUST SOLAR',
    description: 'Illuminate your existing shade structures with renewable energy by integrating solar solutions that not only enhance their functionality but also reduce your carbon footprint. Experience the synergy of shade and solar in a seamless upgrade that embraces sustainability and innovation.',
    imageUrl: 'https://via.placeholder.com/150'
  },
  {
    title: 'JUST SHADE',
    description: 'Crafting personalized elegance, we provide homeowners with bespoke wood shade structures that seamlessly blend into your landscape, offering both respite from the sun and a tailored touch of beauty to your outdoor haven. Elevate your property with our custom creations, where form meets function in perfect harmony.',
    imageUrl: 'https://via.placeholder.com/150'
  },
];

const WhatWeOfferGallery = () => {
  return (
    <div className={styles.gallery}>
      {projects.map((project, index) => (
        <WhatWeOfferCard
          key={index}
          title={project.title}
          description={project.description}
          imageUrl={project.imageUrl}
        />
      ))}
    </div>
  );
};

export default WhatWeOfferGallery;
