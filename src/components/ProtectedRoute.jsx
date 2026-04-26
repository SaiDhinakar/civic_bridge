import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const userRole = localStorage.getItem('userRole');

  if (!userRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
