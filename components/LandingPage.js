import React from 'react';
import Image from 'next/image';

const LandingPage = () => {
  return (
    <div style={{height: '100vh'}}>
      <Image src='/images/picTen.jpeg' alt='Solar' layout="fill" objectFit="cover" />
    </div>
  );
};

export default LandingPage;
