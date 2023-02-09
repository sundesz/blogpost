import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxToolkit';
import { selectCurrentUser } from './authSlice';

const RequireNoAuth = () => {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();

  return user.isAuthenticate ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default RequireNoAuth;
