import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.svg'
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';


const Header = () => {
  const { user, logOut } = useContext(AuthContext)


  const menuItems = <>
    <li><Link to="/" className='font-semibold'>Home</Link></li>
    <li><Link to="/services" className='font-semibold'>Services</Link></li>
    <li><Link to="/blog" className='font-semibold'>Blog</Link></li>
    <li><Link to="/about" className='font-semibold'>About</Link></li>
    <li><Link to="/contact" className='font-semibold'>Contact</Link></li>
    {
      user && user?.email ?
        <>
          <li><Link to="/orders" className='font-semibold'>Orders</Link></li>
          <li className='flex items-center lg:ml-5'>
            <button onClick={logOut} className='text-center font-semibold text-gray-900 h-2 px-3 outline-2 transition-all ease-in bg-warning outline-warning hover:bg-amber-500 hover:text-gray-900 hover:outline-amber-500'>Sign Out</button>
          </li>
        </>
        :
        <li><Link to="/login" className='font-semibold'>Log in</Link></li>
    }
  </>


  return (
    <div className="navbar h-20 bg-base-100 py-12 shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <img src={logo} className='h-full' alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          {menuItems}
        </ul>
      </div>
      <div className="navbar-end">
        <a href="/" className="">
          <button className="btn btn-outline btn-warning">Appointment</button>
        </a>
      </div>
    </div>
  );
};

export default Header;