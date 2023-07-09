import { Formik, Form as FormikForm, Field } from 'formik';
import * as Yup from 'yup';
import PageTitle from '../../../components/PageTitle';
import { LoginAttributes } from '../../../types';
import { SubmitButton, InputField } from '../../../utils';

interface LoginFormProps {
  onSubmit: (values: LoginAttributes) => void;
}

const INITIAL_VALUES = {
  username: '',
  password: '',
};

const VALIDATION_SCHEMA = Yup.object().shape({
  username: Yup.string()
    // .email('Username should be in email format')
    .required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  return (
    <div>
      <PageTitle title="Sign in" />

      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={onSubmit}
      >
        {() => (
          <FormikForm>
            <Field
              id="username"
              label="Username (Email)"
              placeholder="Username"
              name="username"
              component={InputField}
            />

            <Field
              id="password"
              label="Password"
              placeholder="Password"
              name="password"
              type="password"
              component={InputField}
            />

            <SubmitButton id="signin-btn" name="Sign in" />
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
