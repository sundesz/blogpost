import { Container } from 'react-bootstrap';
import { INewUser } from '../../types';
import SignUpForm from './SignUpForm';
import { useNavigate } from 'react-router-dom';
import { isFetchBaseQueryError } from '../../utils';
import { toast } from 'react-toastify';
import { useCreateUserMutation } from './signupApiSlice';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();

  const onSubmit = async (newUserData: INewUser) => {
    try {
      const signUp = await createUser(newUserData).unwrap();
      toast.success(`User creation successful`);

      navigate('/signin');
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errorCodes = [400, 401];
        let errMessage;
        if (!error?.status) {
          errMessage = 'No Server Response';
        } else if (errorCodes.includes(error.status as number)) {
          errMessage = error.data as string;
        } else {
          errMessage = 'Creating user Failed';
        }

        toast.error(errMessage);
      }
    }
  };

  return (
    <Container className="content-container py-5">
      <SignUpForm onSubmit={onSubmit} />
    </Container>
  );
};

export default SignUp;
