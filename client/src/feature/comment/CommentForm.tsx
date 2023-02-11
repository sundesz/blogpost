import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import {
  SubmitButton,
  InputField,
  TextAreaField,
  SelectField,
} from '../../utils';
import { ICreateUpdateCommentParams } from '../../types';

interface ICommentFormProps {
  blogId: string;
  onSubmit: (values: ICreateUpdateCommentParams) => void;
}

const VALIDATION_SCHEMA = Yup.object().shape({
  title: Yup.string()
    .min(4, 'Title must be at least 4 character long')
    .max(60, 'Title should be less than 60 characters long')
    .required('Title is required'),

  content: Yup.string().required('Content is required'),

  rating: Yup.number()
    .required('Rating is required')
    .oneOf([1, 2, 3, 4, 5], 'Rating is required'),
});

const CommentForm: React.FC<ICommentFormProps> = ({ blogId, onSubmit }) => {
  const INITIAL_VALUES = {
    blogId,
    title: '',
    content: '',
    published: true,
    rating: 0,
  };

  const rateOptions = [1, 2, 3, 4, 5].map((rate) => ({
    name: rate,
    value: rate,
  }));

  return (
    <div>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={onSubmit}
      >
        <Form>
          <Field
            id="title"
            label="Title"
            name="title"
            placeholder="Title"
            component={InputField}
          />

          <Field
            id="content"
            label="Content"
            name="content"
            placeholder="Comment ..."
            component={TextAreaField}
            rows="5"
          />

          <Field
            name="rating"
            id="rating"
            label="Rating"
            selectOptions={rateOptions}
            component={SelectField}
          />

          <SubmitButton id="create-comment-btn" name="Create" />
        </Form>
      </Formik>
    </div>
  );
};

export default CommentForm;
