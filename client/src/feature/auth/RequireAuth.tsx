import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { useAppSelector } from '../../hooks/reduxToolkit';
import { selectCurrentUser } from './authSlice';

const RequireAuth = () => {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();

  // if (!user.isAuthenticate) {
  //   toast.warn('Authentication required');
  // }

  return user.isAuthenticate ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default RequireAuth;
