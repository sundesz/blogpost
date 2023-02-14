import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateBlogMutation } from './blogApiSlice';
import { ICreateUpdateBlogParams } from '../../types';
import Loading from '../../components/Loading';
import BlogForm from './BlogForm';
import { useGetAllAuthorQuery } from '../author/authorApiSlice';
import slugify from 'slugify';
import { slugifyOptions } from '../../config';
import ErrorPage from '../../components/ErrorPage';
import ErrorNotification from '../../utils/ErrorNotification';
import { message } from '../../utils/notificationMessage';

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

  const onSubmit = async (newBlogData: ICreateUpdateBlogParams) => {
    try {
      const createdBlogSlug = await createBlog({
        ...newBlogData,
        slug: slugify(newBlogData.title, slugifyOptions),
      }).unwrap();

      toast.success(message.SUCCESS.CREATE_BLOG);

      const navigateUrl = newBlogData.published
        ? `/blogs/${createdBlogSlug}`
        : '/';
      navigate(navigateUrl);
    } catch (error) {
      ErrorNotification(error, message.FAILED.CREATE_BLOG);
    }
  };

  return (
    <Container className="content-container py-5">
      {authors ? (
        <BlogForm crudType="create" onSubmit={onSubmit} authors={authors} />
      ) : (
        <div>Please add author first.</div>
      )}
    </Container>
  );
};

export default CreateBlog;
