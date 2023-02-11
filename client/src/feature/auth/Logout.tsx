import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxToolkit';
import { useLogoutMutation } from './authApiSlice';
import { logOut } from './authSlice';

const Logout: React.FC = () => {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  useEffect(() => {
    void (async () => {
      await logout();
    })();
    dispatch(logOut());
  }, []);

  return <Navigate to="/" />;
};

export default Logout;
