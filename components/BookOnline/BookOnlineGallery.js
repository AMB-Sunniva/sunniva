import BookOnline from './BookOnline';

const projects = [
  {
    title: 'VIRTUAL CONSULTATION',
    description: '30 min',
    imageUrl: '/images/picSeven.jpeg',
    href: 'https://calendly.com/dillon-craw/virtual-consultation'
  },
  {
    title: 'FINANCING CONSULTATION',
    description: '30 min',
    imageUrl: '/images/picThree.jpeg',
    href: 'https://calendly.com/dillon-craw/30min'
  },
];

const BookOnlineGallery = () => {
  return (
    <div className="p-4 flex flex-wrap justify-center mx-auto" style={{maxWidth: '1300px'}}>
      {projects.map((project, index) => (
        <BookOnline
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

export default BookOnlineGallery;
