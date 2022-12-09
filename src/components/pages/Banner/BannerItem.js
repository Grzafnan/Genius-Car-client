import React, { useEffect } from 'react';
import './BannerItem.css'


const BannerItem = ({ slide }) => {
  const { image, id, prev, next } = slide;



  return (
    <div id={`slide${id}`} className="carousel-item relative w-full">
      <div className='carousel-img w-full'>
        <img alt="" src={image} className="w-full h-full rounded-xl" />
      </div>
      <div className="absolute flex transform -translate-y-1/2 left-24 top-1/4">
        <h1 className='text-6xl font-bold text-white'>
          Affordable <br />
          Price For Car <br />
          Servicing
        </h1>
      </div>
      <div className="absolute flex transform -translate-y-1/2 left-24 top-2/4 w-2/5 text-white">
        <p className='text-lg'>There are many variations of passages of  available, but the majority have suffered alteration in some form</p>
      </div>
      <div className="absolute flex justify-start transform -translate-y-1/2 left-24 top-3/4 w-2/5 text-white">
        <button className="btn bg-[#FF3811] hover:bg-[#f52900] text-lg font-semibold text-white mr-5">Discover More</button>
        <button className="btn btn-outline hover:bg-[#FF3811] hover:border-[#FF3811] text-lg font-semibold text-white">Latest Project</button>

      </div>

      <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
        <a href={`#slide${prev}`} className="btn btn-circle mr-5">❮</a>
        <a href={`#slide${next}`} className="btn btn-circle btn-warning ">❯</a>
      </div>
    </div>
  );
};

export default BannerItem;