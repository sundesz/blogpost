import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';

import {
  AuthorNames,
  BlogCRUDType,
  Blog,
  CreateUpdateBlogParams,
} from '../../types';
import { useAppSelector } from '../../hooks/reduxToolkit';
import { selectCurrentUser } from '../auth/authSlice';
import Page404 from '../../components/Page404';
import {
  SubmitButton,
  InputField,
  SelectField,
  capitalize,
  BlogContentField,
} from '../../utils';
import PageTitle from '../../components/PageTitle';

interface BlogFormProps {
  blog?: Blog;
  crudType: BlogCRUDType;
  authors: AuthorNames[];
  onSubmit: (values: CreateUpdateBlogParams) => void;
}

const VALIDATION_SCHEMA = Yup.object().shape({
  title: Yup.string()
    .min(4, 'Title must be at least 4 character long')
    .max(60, 'Title should be less than 60 characters long')
    .required('Title is required'),

  content: Yup.string().required('Content is required'),
  author: Yup.string().required('Author is required'),
});

const BlogForm: React.FC<BlogFormProps> = ({
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
    published: crudType === 'update' ? blog!.published : true,
    author: crudType === 'update' ? blog!.User.userId : user.userId,
  };

  const authorOptions = authors.map((author) => ({
    name: capitalize(author.name),
    value: author.userId,
  }));

  const isAdmin = user.role === 'admin';
  const isOwnBlog = crudType === 'update' && blog!.User.email === user.email;
  const hasPermission = isAdmin ? true : isOwnBlog ? true : false;

  return (
    <div>
      <PageTitle title={`${capitalize(crudType)} blog`} />

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
            gridLeft="2"
            gridRight="10"
          />

          <Field
            id="blog-content"
            label="Content"
            name="content"
            component={BlogContentField}
            gridLeft="2"
            gridRight="10"
          />

          {hasPermission && (
            <Field
              id="published"
              label="Published"
              name="published"
              type="checkbox"
              bootstrapClass="form-check checkbox"
              component={InputField}
              gridLeft="2"
              gridRight="10"
            />
          )}

          {hasPermission && (
            <Field
              name="author"
              id="author"
              label="Author"
              selectOptions={authorOptions}
              component={SelectField}
              disabledValue={!hasPermission}
              gridLeft="2"
              gridRight="10"
            />
          )}

          <SubmitButton
            id={`${crudType}-blog-btn`}
            name={capitalize(crudType)}
            gridLeft={2}
            gridRight={10}
          />
        </Form>
      </Formik>
    </div>
  );
};

export default BlogForm;
