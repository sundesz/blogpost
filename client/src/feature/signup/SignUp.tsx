import { Container } from 'react-bootstrap';
import { INewUser } from '../../types';
import SignUpForm from './SignUpForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateUserMutation } from './signupApiSlice';
import ErrorNotification from '../../utils/ErrorNotification';
import { message } from '../../utils/notificationMessage';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();

  const onSubmit = async (newUserData: INewUser) => {
    try {
      await createUser(newUserData).unwrap();
      toast.success(message.SUCCESS.CREATE_USER);

      navigate('/signin');
    } catch (error) {
      ErrorNotification(error, message.FAILED.CREATE_USER);
    }
  };

  return (
    <Container className="content-container py-5">
      <SignUpForm onSubmit={onSubmit} />
    </Container>
  );
};

export default SignUp;
