import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { toast } from 'react-toastify';

const CheckOut = () => {
  const { id } = useParams();
  const [service, setServices] = useState({});
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();


  // console.log(service);


  useEffect(() => {
    fetch(`https://genius-car-server-with-mongodb.vercel.app/services/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setServices(data.data)
        }
        else {
          console.log(data.error);
        }
      })
  }, [id])



  const handlePlaceOrder = event => {
    event.preventDefault();
    const form = event.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const phone = form.phone.value;
    const email = user?.email || 'Unregistered';
    const message = form.message.value;

    const order = {
      service: id,
      serviceName: service.title,
      price: service.price,
      customer: name,
      phone,
      email,
      message
    }

    fetch('https://genius-car-server-with-mongodb.vercel.app/orders', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('genius-token')}`
      },
      body: JSON.stringify(order)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          form.reset();
          toast.success(data.message, { autoClose: 1000 });
          navigate('/orders');
        }
        else {
          console.log(data.error);
          toast.error(data.message, { autoClose: 1000 });
        }
      })
      .catch(err => {
        console.log(err);
      })
  }


  return (
    <div className='py-20'>
      <div className='w-full h-[300px] flex items-center'
        style={{
          backgroundImage: `url(${service?.img})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          borderRadius: '10px'
        }}>
        <h1 className='text-4xl font-bold text-white ml-20' > Check Out</h1>
      </div >

      <form onSubmit={handlePlaceOrder} className="flex w-full space-x-2">
        <div className="w-full max-w-4xl px-5 py-10 m-auto mt-10 bg-white rounded-lg shadow dark:bg-gray-800">

          <div className="grid max-w-3xl grid-cols-2 gap-4 m-auto">
            <div className="col-span-2 lg:col-span-1">
              <div className=" relative ">
                <input type="text" id="contact-form-name" name="firstName"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent" placeholder="First Name" required />
              </div>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <div className=" relative ">
                <input type="text" name='lastName' id="contact-form-last-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent" placeholder="Last Name" required />
              </div>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <div className=" relative ">
                <input type="text" name='phone' id="contact-form-phone" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent" placeholder="Phone" required />
              </div>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <div className=" relative ">
                <input type="text" id="contact-form-email"
                  defaultValue={user?.email}
                  name='email'
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent" placeholder="Email" readOnly />
              </div>
            </div>
            <div className="col-span-2">
              <label className="text-gray-700" htmlFor="name">
                <textarea className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent" id="message" placeholder="Enter Your Message" name="message" rows="5" cols="40" required>
                </textarea>
              </label>
            </div>
            <div className="col-span-2 text-right">
              <input type='submit' value='Order Confirm' className="btn bg-[#FF3811] hover:bg-[#f52900] text-lg font-semibold border-none w-full text-white mr-5 capitalize" />
            </div>
          </div>
        </div>
      </form>
    </div >
  );
};

export default CheckOut;