import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxToolkit';
import { ILogin } from '../../../types';
import { isFetchBaseQueryError } from '../../../utils';
import { useLoginMutation } from '../authApiSlice';
import { selectCurrentUser, setCredentials } from '../authSlice';
import LoginForm from './LoginForm';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const handleSubmit = async (credentials: ILogin) => {
    try {
      const userData = await login(credentials).unwrap();

      dispatch(setCredentials({ ...userData }));
      navigate('/');
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errorCodes = [400, 401];
        let errMessage;
        if (!error?.status) {
          errMessage = 'No Server Response';
        } else if (errorCodes.includes(error.status as number)) {
          errMessage = error.data as string;
        } else {
          errMessage = 'Login Failed';
        }

        toast.error(errMessage);
      }
    }
  };

  return (
    <Container className="content-container py-5">
      {isLoading ? <h1>Loading ...</h1> : <LoginForm onSubmit={handleSubmit} />}
    </Container>
  );
};

export default Login;
