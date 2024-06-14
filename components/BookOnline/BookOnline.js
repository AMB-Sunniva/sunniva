"use client";
import Button from '../Button';

const BookOnline = ({ title, description, imageUrl, href }) => {
  const onClick = () => {
    window.open(href, '_blank', 'noopener noreferrer')
  }

  return (
    <div className='m-4 bg-white text-center w-600px'>
      <img src={imageUrl} alt={title} className='w-full h-auto' />
      <div className="text-custom-gray p-4">
        <h2 className="pt-2 text-2xl">{title}</h2>
        <hr style={{width:'5%', borderColor: '#333', margin: '15px auto'}} />
        <p className='mt-2'>{description}</p>
        <Button type="primary" onClick={onClick}>BOOK NOW</Button>
      </div>
    </div>
  );
};

export default BookOnline;
