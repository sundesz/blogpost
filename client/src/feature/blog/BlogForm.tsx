import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';

import {
  IAuthor,
  BlogCRUDType,
  IBlog,
  ICreateUpdateBlogParams,
} from '../../types';
import { useAppSelector } from '../../hooks/reduxToolkit';
import { selectCurrentUser } from '../auth/authSlice';
import Page404 from '../../components/Page404';
import {
  SubmitButton,
  InputField,
  TextAreaField,
  SelectField,
  capitalize,
} from '../../utils';

interface IBlogFormProps {
  blog?: IBlog;
  crudType: BlogCRUDType;
  authors: IAuthor[];
  onSubmit: (values: ICreateUpdateBlogParams) => void;
}

const VALIDATION_SCHEMA = Yup.object().shape({
  title: Yup.string()
    .min(4, 'Title must be at least 4 character long')
    .max(60, 'Title should be less than 60 characters long')
    .required('Title is required'),

  content: Yup.string().required('Content is required'),
  author: Yup.string().required('Author is required'),
});

const BlogForm: React.FC<IBlogFormProps> = ({
  blog,
  crudType,
  authors,
  onSubmit,
}) => {
  const user = useAppSelector(selectCurrentUser);

  if (crudType === 'update' && blog === undefined) {
    return <Page404 />;
  }

  const INITIAL_VALUES = {
    title: crudType === 'update' ? blog!.title : '',
    slug: '',
    content: crudType === 'update' ? blog!.content : '',
    published: crudType === 'update' ? blog!.published : false,
    author: crudType === 'update' ? blog!.user.userId : '',
  };

  const authorOptions = authors.map((author) => ({
    name: capitalize(author.name),
    value: author.userId,
  }));

  return (
    <div>
      <h1 className="mb-5">{capitalize(crudType)} blog</h1>

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
            placeholder="Blog content ..."
            component={TextAreaField}
          />

          <Field
            id="published"
            label="Published"
            name="published"
            type="checkbox"
            bootstrapClass="form-check checkbox"
            component={InputField}
          />

          <Field
            name="author"
            id="author"
            label="Author"
            selectOptions={authorOptions}
            component={SelectField}
            disabledValue={crudType === 'update' && user.role !== 'admin'}
          />

          <SubmitButton id="create-blog-btn" name={capitalize(crudType)} />
        </Form>
      </Formik>
    </div>
  );
};

export default BlogForm;
