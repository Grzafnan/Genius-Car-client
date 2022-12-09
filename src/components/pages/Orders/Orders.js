import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';
import { toast } from 'react-toastify';

const Orders = () => {
  const { user, logOut } = useContext(AuthContext)
  const [orders, setOrders] = useState({});
  const [update, setUpdate] = useState(false)


  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // }, []);


  // const url = `https://genius-car-server-with-mongodb.vercel.app/orders?${user.email}`;

  // {
  //   headers: {
  //     authorization: `Bearer ${localStorage.getItem('genius-token')}`
  //   }
  // }

  useEffect(() => {
    fetch(`https://genius-car-server-with-mongodb.vercel.app/orders?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('genius-token')}`
      }
    })
      .then(res => {

        if (res.status === 401 || res.status === 403) {
          // console.log(res);
          toast.error('Unauthorized access denied.', { autoClose: 1000 })
          return logOut();
        }

        return res.json();
      })
      .then(data => {

        setOrders(data.data);

      });
  }, [user?.email, logOut, update])




  const handleDelete = (id) => {
    const proceed = window.confirm('Are you sure, you want to cancle this order?');

    if (proceed) {

      fetch(`https://genius-car-server-with-mongodb.vercel.app/orders/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('genius-token')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          // if (data.success) {
          //   toast.success(data.message, { autoClose: 1000 });
          //   const remaining = orders?.filter(odr => odr._id !== id)
          //   setOrders(remaining)
          // }
          setUpdate(!update)
        })
        .catch(err => {
          console.log(err);
          toast.error(err.message, { autoClose: 1000 })
        });

    }
  }


  const handleStatusUpdate = id => {
    fetch(`https://genius-car-server-with-mongodb.vercel.app/orders/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('genius-token')}`
      },
      body: JSON.stringify({ status: "Approved" })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        const remaining = orders?.filter(odr => odr._id !== id);
        const approving = orders?.find(odr => odr._id === id);
        approving.status = "Approved";
        const newOrders = [approving, ...remaining];
        setOrders(newOrders);
      })
      .catch(err => {
        console.error(err);
      })

  }



  return (
    <div className='py-10'>
      <h2 className='text-2xl font-semibold text-orange-600 text-center'>Orders Summary: {orders?.length}</h2>
      <div className="container mx-auto px-4 sm:px-8 max-w-4xl">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <tbody>


                {
                  orders?.length > 0 ? <>
                    {
                      orders?.map(order => <OrderRow
                        key={order._id}
                        order={order}
                        handleDelete={handleDelete}
                        handleStatusUpdate={handleStatusUpdate}
                      />)
                    }
                  </>
                    :
                    <>
                      <tr className=''>
                        <td className="px-2 py-5 border-b border-gray-200 bg-red-600 text-white text-2xl font-semibold text-center">
                          No orders found!
                        </td>
                      </tr>
                    </>
                }


                {/* {
                  loading ? (

                    <span></span>

                  ) : (
                    <>
                      {
                        orders?.length > 0 ? <>
                          {
                            orders?.map(order => <OrderRow
                              key={order._id}
                              order={order}
                              handleDelete={handleDelete}
                              handleStatusUpdate={handleStatusUpdate}
                            />)
                          }
                        </>
                          :
                          <>
                            <tr className=''>
                              <td className="px-2 py-5 border-b border-gray-200 bg-red-600 text-white text-2xl font-semibold text-center">
                                No orders found!
                              </td>
                            </tr>
                          </>
                      }
                    </>
                  )
                } */}

              </tbody>
            </table>
          </div>
        </div>

      </div>


    </div>
  );
};

export default Orders;