import AddOnCard from './AddOnCard';
import styles from './AddOnGallery.module.css';

const projects = [
  {
    title: 'SPAN PANEL',
    description: 'Smart electrical panel to help reduce energy costs in your home',
    imageUrl: 'https://via.placeholder.com/530x353',
    href: 'https://www.span.io/panel'
  },
  {
    title: 'SPAN DRIVE',
    description: 'EV Charger that integrates with the Span Panel',
    imageUrl: 'https://via.placeholder.com/530x353',
    href: 'https://www.span.io/drive'
  },
  {
    title: 'WALLBOX PULSAR PLUS',
    description: 'Inexpensive, quick EV Charger',
    imageUrl: 'https://via.placeholder.com/530x353',
    href: 'https://wallbox.com/en_us/wallbox-pulsar-plus'
  },
  {
    title: 'ABB TERRA AC WALLBOX',
    description: 'Sleek, powerful EV Charger',
    imageUrl: 'https://via.placeholder.com/530x353',
    href: 'https://new.abb.com/ev-charging/terra-ac-wallbox'
  }
];

const AddOnGallery = () => {
  return (
    <div className={styles.gallery}>
      {projects.map((project, index) => (
        <AddOnCard
          key={index}
          title={project.title}
          description={project.description}
          imageUrl={project.imageUrl}
          href={project.href}
        />
      ))}
    </div>
  );
};

export default AddOnGallery;
