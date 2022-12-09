import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ServicesCard = ({ service }) => {

  const { img, price, title, _id } = service;

  return (

    <div className="card bg-base-100 shadow-xl p-4 md:p-6">
      <figure><img className='rounded-lg w-full min-h-[208px]' src={img} alt={title} /></figure>
      <div className="card-body pt-5 pb-0 px-0">
        <h2 className="card-title text-2xl font-bold">
          {title}
        </h2>
        <div className='flex justify-between items-center pt-3'>
          <p className='text-[#FF3811] text-xl font-semibold'>Price: ${price}</p>
          <Link to={`/checkout/${_id}`}>
            <button>
              <FaArrowRight className='text-[#FF3811]' />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;