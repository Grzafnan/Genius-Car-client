import React from 'react';
import person from '../../../../assets/images/about_us/person.jpg'
import parts from '../../../../assets/images/about_us/parts.jpg'
import { useLocation } from 'react-router-dom';

const About = () => {
  const location = useLocation();
  return (
    <div className={`${location.pathname.includes('about') ? "min-h-screen flex justify-center items-center" : "hero py-5 lg:pt-20"}`}>
      <div className="hero-content p-0 h-full flex-col lg:flex-row">
        <div className='relative h-full w-full md:w-1/2'>
          <img src={person} alt='person' className=" md:w-4/5 h-full rounded-lg" />
          <img src={parts} alt='parts' className=" w-3/5 absolute right-6 top-1/2 rounded-lg border-8" />
        </div>
        <div className='w-full md:w-1/2 px-5 md:px-0 pt-10 md:pt-20 lg:pt-0'>
          <h3 className='text-[#FF3811] text-xl font-bold text-center'>About Us</h3>
          <h1 className=" text-3xl text-center md:text-5xl font-bold pt-5">We are qualified <br /> & of experience <br /> in this field</h1>
          <p className="py-6">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
          <p className='pb-7'>
            the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
          </p>
          <button className="btn btn-warning">Get More Info</button>
        </div>
      </div>
    </div>
  );
};

export default About;