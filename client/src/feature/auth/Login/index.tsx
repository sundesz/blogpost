import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxToolkit';
import { LoginAttributes } from '../../../types';
import ErrorNotification from '../../../utils/ErrorNotification';
import { message } from '../../../utils/notificationMessage';
import { useLoginMutation } from '../authApiSlice';
import { selectCurrentUser, setCredentials } from '../authSlice';
import LoginForm from './LoginForm';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const handleSubmit = async (credentials: LoginAttributes) => {
    try {
      const userData = await login(credentials).unwrap();

      dispatch(setCredentials({ ...userData }));
      navigate('/');
    } catch (error) {
      ErrorNotification(error, message.FAILED.LOGIN);
    }
  };

  const render = () => {
    if (!isLoading) {
      return <LoginForm onSubmit={handleSubmit} />;
    }

    return <h1>Loading ...</h1>;
  };

  return <Container className="content-container py-5">{render()}</Container>;
};

export default Login;
