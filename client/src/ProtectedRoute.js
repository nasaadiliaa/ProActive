import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Start with null to handle loading state
  const cookies = new Cookies();

  useEffect(() => {
    const token = cookies.get('accessToken');
    console.log("token", token);

    if (token) {
      setIsAuthenticated(true); // User is authenticated
    } else {
      setIsAuthenticated(false); // User is not authenticated
    }
  }, []);

  // Handling the loading state
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to login page
  if (isAuthenticated === false) {
    return <Navigate to="/Login" />;
  }

  // If authenticated, render the protected content
  return <Outlet />;
};

export default ProtectedRoute;