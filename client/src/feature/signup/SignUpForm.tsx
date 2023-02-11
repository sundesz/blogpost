import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { INewUser, UserRole } from '../../types';
import { SubmitButton, InputField, SelectField, capitalize } from '../../utils';
import PageTitle from '../../components/PageTitle';

interface ISignUpFormProps {
  onSubmit: (values: INewUser) => void;
}

const INITIAL_VALUES = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  role: Yup.string().required('Role is required').oneOf(['user', 'author']),
  password: Yup.string()
    .min(6, 'Password must be at least 6 character long')
    .max(20, 'Password should be less than 20 characters long')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Password don't match")
    .required('Password confirmation is required'),
});

const SignUpForm: React.FC<ISignUpFormProps> = ({ onSubmit }) => {
  const roleOptions = UserRole.filter((user) => user !== 'admin').map(
    (user) => ({
      name: capitalize(user),
      value: user,
    })
  );

  return (
    <div>
      <PageTitle title="Sign up" />

      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={onSubmit}
      >
        <Form>
          <Field
            id="name"
            label="Name"
            name="name"
            placeholder="Name"
            component={InputField}
          />

          <Field
            id="email"
            label="Email (Username)"
            name="email"
            placeholder="Username"
            component={InputField}
          />

          <Field
            name="role"
            id="role"
            label="Role"
            selectOptions={roleOptions}
            component={SelectField}
          />

          <Field
            id="password"
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            component={InputField}
          />

          <Field
            id="confirmPassword"
            label="Password confirmation"
            name="confirmPassword"
            type="password"
            placeholder="Password"
            component={InputField}
          />

          <SubmitButton id="signup-btn" name="Sign up" />
        </Form>
      </Formik>
    </div>
  );
};

export default SignUpForm;
