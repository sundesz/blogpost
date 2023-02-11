import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { isFetchBaseQueryError } from '../../utils';
import { toast } from 'react-toastify';
import { useCreateBlogMutation } from './blogApiSlice';
import { ICreateUpdateBlogParams } from '../../types';
import Loading from '../../components/Loading';
import BlogForm from './BlogForm';
import { useGetAllAuthorQuery } from '../author/authorApiSlice';
import slugify from 'slugify';
import { slugifyOptions } from '../../config';
import ErrorPage from '../../components/ErrorPage';

const CreateBlog: React.FC = () => {
  const navigate = useNavigate();
  const { data: authors, isLoading, isError, error } = useGetAllAuthorQuery();
  const [createBlog] = useCreateBlogMutation();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage error={error} />;
  }

  if (!authors) {
    return <p>No authors</p>;
  }

  const onSubmit = async (newBlogData: ICreateUpdateBlogParams) => {
    try {
      const createdBlogSlug = await createBlog({
        ...newBlogData,
        slug: slugify(newBlogData.title, slugifyOptions),
      }).unwrap();

      toast.success(`Blog created successfully.`);
      navigate(`/blogs/${createdBlogSlug}`);
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errorCodes = [400, 401];
        let errMessage;
        if (!error?.status) {
          errMessage = 'No Server Response';
        } else if (errorCodes.includes(error.status as number)) {
          errMessage = error.data as string;
        } else {
          errMessage = 'Failed creating blog.';
        }
        toast.error(errMessage);
      }
    }
  };

  return (
    <Container className="content-container py-5">
      <BlogForm crudType="create" onSubmit={onSubmit} authors={authors} />
    </Container>
  );
};

export default CreateBlog;
