import React, { useEffect, useState } from 'react';
import { HiOutlineXCircle } from "react-icons/hi";
import { toast } from 'react-toastify';

const OrderRow = ({ order, handleDelete, handleStatusUpdate }) => {
  const { _id, serviceName, email, price, service, status } = order;
  const [orderService, setOrderService] = useState({})


  useEffect(() => {

    fetch(`https://genius-car-server-with-mongodb.vercel.app/services/${service}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.success) {
          setOrderService(data.data)
        }
        else {
          console.log(data.error);
        }
      })

  }, [service])



  return (
    <tr>
      <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
        <button onClick={() => handleDelete(_id)} className=''>
          <HiOutlineXCircle className='text-4xl text-red-600' />
        </button>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {
              orderService?.img &&
              <img alt="profile" src={orderService?.img} className="mx-auto object-cover rounded-lg h-20 w-20" />
            }
          </div>
          <div className="ml-3">
            <p className="text-gray-900 text-lg font-semibold whitespace-no-wrap">
              {serviceName}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap text-base font-semibold">
          ${price}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap text-base font-semibold">
          {email}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">

        <button onClick={() => handleStatusUpdate(_id)} className='bg-orange-600 hover:bg-orange-700 transition-all ease-in py-[4px] px-4 text-base rounded-full text-white font-semibold'>
          {
            status ? status : "Pending"
          }
        </button>
      </td>
    </tr >
  );
};

export default OrderRow;

