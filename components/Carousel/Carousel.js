"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Button from '../Button';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      imgSrc: '/images/IMG_2609 (2).PNG',
      altText: 'Butte 9 Panel',
      title: 'Butte 9 Panel',
      description: 'Traditional style with modern elegance. Check it out now!',
    },
    {
      imgSrc: '/images/IMG_2612 (2).JPG',
      altText: 'Ridge 12 Panel',
      title: 'Ridge 12 Panel',
      description: 'Modern esthetics with robust looks. Buy it now!',
    },
  ];

  const totalSlides = slides.length;

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="relative w-full mx-auto">
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center min-w-full">
              <img
                src={slide.imgSrc}
                alt={slide.altText}
                className="w-full md:w-2/3 h-64 md:h-auto object-cover"
              />
              <div className="w-full md:w-1/3 p-8 text-center md:text-left mt-4 md:mt-0">
                <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
                <p className="text-custom-gray mb-6 text-xl">{slide.description}</p>
                <Link href="/shop">
                    <Button type="secondary">LEARN MORE</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
        <button
          onClick={goToPrev}
          className="text-custom-gray p-3 hover:text-gray-400 text-2xl"
        >
          &lt;
        </button>
        <button
          onClick={goToNext}
          className="text-custom-gray p-3 hover:text-gray-400 text-2xl"
        >
          &gt;
        </button>
      </div>
      </div>
    </div>
  );
};

export default Carousel;
