import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { ThreeDots } from 'react-loader-spinner'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation()

  if (loading) {
    return (
      <div className='flex justify-center min-h-screen'>
        <ThreeDots
          height="100"
          width="100"
          radius="9"
          color="#FF3811"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    )
  }

  if (user && user.uid) {
    return children;
  }

  return <Navigate to='/login' state={{ from: location }} replace />


};

export default PrivateRoute;