import React, { useEffect, useRef, useState } from 'react';
import ServicesCard from './ServicesCard';
import { Circles } from 'react-loader-spinner'


const Services = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState('');
  const searchRef = useRef();
  const [loading, setLoading] = useState(false);

  // https://genius-car-server-with-mongodb.vercel.app/services

  const [isAsc, setIsAsc] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://genius-car-server-with-mongodb.vercel.app/services?search=${search}&order=${isAsc ? 'asc' : 'desc'}`)
      .then(res => res.json())
      .then(data => {
        setServices(data.data);
        setLoading(false);
      })
  }, [isAsc, search]);

  const handleSearch = () => {
    setSearch(searchRef.current.value);
  }


  return (
    <div className='py-10 md:py-32'>
      <div className='text-center pb-12 md:px-36'>
        <h3 className='text-xl text-[#FF3811] font-bold'>Services</h3>
        <h1 className='text-3xl md:text-5xl text-[#151515] font-bold py-5'>Our Service Area</h1>
        <p className=' px-4 md:px-0'>the majority have suffered alteration in some form, by injected humour, or randomized <br />
          words which don't look even slightly believable. </p>
      </div>
      <div className='my-3 flex justify-between md:px-36 px-2'>
        <div className='flex gap-2'>
          <input ref={searchRef} type="text" placeholder="Services name here" className="input input-bordered input-sm input-warning w-full max-w-xs" />
          <button onClick={handleSearch} className="btn btn-sm text-gray-900 btn-warning ">search</button>
        </div>

        <button className='btn btn-sm btn-warning capitalize ' onClick={() => setIsAsc(!isAsc)}>Price: {isAsc ? 'High to low' : 'Low to high'}</button>
      </div>



      {
        loading ? <div className='flex justify-center items-center w-full h-96'>
          <Circles
            height="80"
            width="80"
            color="#F52900"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
          :
          <>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:px-36 px-2'>
              {
                services?.map(service => <ServicesCard key={service._id} service={service} />)
              }
            </div>
          </>
      }





      <div className='flex justify-center pt-16'>
        <button className='btn btn-outline hover:bg-[#FF3811] hover:border-[#FF3811] text-lg font-semibold text-[#FF3811] capitalize'>More Services</button>
      </div>
    </div>
  );
};

export default Services;