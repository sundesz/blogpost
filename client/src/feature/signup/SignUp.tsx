import { Container } from 'react-bootstrap';
import { NewUser } from '../../types';
import SignUpForm from './SignUpForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateUserMutation } from './signupApiSlice';
import ErrorNotification from '../../utils/ErrorNotification';
import { message } from '../../utils/notificationMessage';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();

  const onSubmit = async (newUserData: NewUser) => {
    try {
      const formData = new FormData();

      if (newUserData.image) {
        formData.append('image', newUserData.image);
      }

      formData.append('name', newUserData.name);
      formData.append('email', newUserData.email);
      formData.append('password', newUserData.password);
      formData.append('role', newUserData.role);

      // If you need to access the error or success payload immediately after a mutation, you can chain .unwrap().
      await createUser(formData).unwrap();
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
