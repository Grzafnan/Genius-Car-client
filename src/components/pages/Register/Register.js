import React, { useContext, useState } from 'react';
import { FaFacebook, FaGoogle, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import image from '../../../assets/images/login/login.svg'
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { verifyJWT } from '../Utilities/utilities';

const Register = () => {

  const { createUser, updateName, verify } = useContext(AuthContext);
  const [error, setError] = useState('')

  const handelSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        const currentUser = {
          email: user.email
        };

        handelUpdateName();
        verifyEmail();
        form.reset();
        setError('')
        verifyJWT(currentUser);
      })
      .catch(error => {
        console.error(error.message);
        setError(error.message)
      })

    const handelUpdateName = () => {
      updateName(name)
        .then(() => {
          // Profile updated!
          // ...
        }).catch((error) => {
          // An error occurred
          console.error(error.message);
          // ...
        });
    }


    const verifyEmail = () => {
      verify()
        .then(() => {
          // Email verification sent!
          // ...
          toast.success('Verification sent! Check your email address.', { autoClose: 1500 })
        })
        .catch(error => console.error(error))
    }
  }




  return (
    <div>
      <div className="hero min-h-screen md:py-10 lg:py-0">
        <div className="hero-content lg:px-36 w-full flex-col lg:flex-row">
          <div className="text-center lg:text-left md:w-1/2">
            <img src={image} alt="" />
          </div>
          <div className="card flex-shrink-0 shadow-2xl bg-base-100 w-1/2">
            <h2 className='text-4xl font-bold text-center pt-16'>Sign Up</h2>
            <form onSubmit={handelSubmit} className="card-body w-full">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" name='name' placeholder="Name" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name='email' placeholder="Email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name='password' placeholder="Password" className="input input-bordered" required />
                <label className="label">

                  <p className='text-red-600'> {error}</p>

                </label>
              </div>
              <div className="form-control mt-6">
                <input type='submit' value='Sign Up' className="btn bg-[#FF3811] hover:bg-[#f52900] text-lg font-semibold border-none w-full text-white mr-5" />
              </div>
            </form>
            <div className='pt-7 pb-16'>
              <p className='text-center text-lg font-medium'>Or Sign Up with</p>
              <div className="w-1/3 pt-7 mx-auto flex justify-between text-xl">
                <button className='bg-[#ebebeb] hover:bg-gray-300 transition ease-in p-2 rounded-full'>
                  <FaFacebook />
                </button>
                <button className='bg-[#ebebeb] hover:bg-gray-300 transition ease-in p-2 rounded-full'>
                  <FaLinkedinIn />
                </button>
                <button className='bg-[#ebebeb] hover:bg-gray-300 transition ease-in p-2 rounded-full'>
                  <FaGoogle />
                </button>
              </div>
              <p className='text-center pt-12'>
                Already have an account? <Link to='/login' className='text-[#FF3811] text-lg font-semibold'>Sign In</Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;