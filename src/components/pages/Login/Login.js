import { FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { FaFacebook, FaGoogle, FaLinkedinIn } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import image from '../../../assets/images/login/login.svg'
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { verifyJWT } from '../Utilities/utilities';


const Login = () => {

  const [error, setError] = useState('');
  const { user, signIn, signInWithProvider } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/'

  // console.log(user);


  const handelSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);

    signIn(email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // console.log(user);
        const currentUser = {
          email: user.email
        };
        setError('')
        toast.success('Logged in!', { autoClose: 1000 })
        verifyJWT(currentUser)
        navigate(from, { replace: true })


        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage)
        toast.error(errorMessage, { autoClose: 1000 })
        console.error(errorCode, errorMessage);
      });

  }


  const handelSignInWithGoogle = () => {
    signInWithProvider(googleProvider)
      .then((result) => {
        const user = result.user;
        const currentUser = {
          email: user.email
        };
        toast.success('Logged in!', { autoClose: 1000 });
        verifyJWT(currentUser);
        navigate(from, { replace: true })
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(error);
        toast.error(errorMessage, { autoClose: 1000 })
      });
  }

  const handelSignInWithFacebook = () => {
    signInWithProvider(facebookProvider)
      .then((result) => {
        const user = result.user;
        const currentUser = {
          email: user.email
        };
        // console.log(user);
        toast.success('Logged in!', { autoClose: 1000 });
        verifyJWT(currentUser)
        navigate(from, { replace: true })
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(error);
        toast.error(errorMessage, { autoClose: 1000 })
      });
  }





  return (
    <div className="hero min-h-screen md:py-10 lg:py-0">
      <div className="hero-content lg:px-36 w-full flex-col lg:flex-row">
        <div className="text-center lg:text-left md:w-1/2">
          <img src={image} alt="" />
        </div>
        <div className="card flex-shrink-0 shadow-2xl bg-base-100 w-1/2">
          <h2 className='text-4xl font-bold text-center pt-16'>Login</h2>
          <form onSubmit={handelSubmit} className="card-body w-full">
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
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
              <label className="label">
                <p className='text-red-600'>{error}</p>
              </label>
            </div>
            <div className="form-control mt-6">
              <input type='submit' value='Sign In' className="btn bg-[#FF3811] hover:bg-[#f52900] text-lg font-semibold border-none w-full text-white mr-5" />
            </div>
          </form>
          <div className='pt-7 pb-16'>
            <p className='text-center text-lg font-medium'>Or Sign In with</p>
            <div className="w-1/3 pt-7 mx-auto flex justify-between text-xl">
              <button className='bg-[#ebebeb] hover:bg-gray-300 transition ease-in p-2 rounded-full'>
                <FaFacebook onClick={handelSignInWithFacebook} />
              </button>
              <button className='bg-[#ebebeb] hover:bg-gray-300 transition ease-in p-2 rounded-full'>
                <FaLinkedinIn />
              </button>
              <button onClick={handelSignInWithGoogle} className='bg-[#ebebeb] hover:bg-gray-300 transition ease-in p-2 rounded-full'>
                <FaGoogle />
              </button>
            </div>
            <p className='text-center pt-12'>
              Have an account? <Link to='/register' className='text-[#FF3811] text-lg font-semibold'>Sign Up</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;