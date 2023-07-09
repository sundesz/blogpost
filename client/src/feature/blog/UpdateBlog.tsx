import { Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUpdateBlogMutation } from './blogApiSlice';
import { Blog, CreateUpdateBlogParams } from '../../types';
import Loading from '../../components/Loading';
import BlogForm from './BlogForm';
import slugify from 'slugify';
import { slugifyOptions } from '../../config';
import ErrorPage from '../../components/ErrorPage';
import ErrorNotification from '../../utils/ErrorNotification';
import { message } from '../../utils/notificationMessage';
import { useGetAuthorNamesQuery } from '../author/authorApiSlice';

const UpdateBlog: React.FC = () => {
  const navigate = useNavigate();
  const { data: authors, isLoading, isError, error } = useGetAuthorNamesQuery();
  const [updateBlog] = useUpdateBlogMutation();

  let { state } = useLocation() as { state: { blog: Blog } };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage error={error} />;
  }

  const onSubmit = async (updateBlogData: CreateUpdateBlogParams) => {
    try {
      const updatedBlogSlug = await updateBlog({
        ...updateBlogData,
        blogId: state.blog.blogId,
        slug: slugify(updateBlogData.title, slugifyOptions),
      }).unwrap();

      toast.success(message.SUCCESS.UPDATE_BLOG);

      const navigateUrl = updateBlogData.published
        ? `/blogs/${updatedBlogSlug}`
        : '/';
      navigate(navigateUrl);
    } catch (error) {
      ErrorNotification(error, message.FAILED.UPDATE_BLOG);
    }
  };

  return (
    <Container className="content-container py-5">
      {authors ? (
        <BlogForm
          crudType="update"
          blog={state.blog}
          onSubmit={onSubmit}
          authors={authors}
        />
      ) : (
        <div>Please add author first.</div>
      )}
    </Container>
  );
};

export default UpdateBlog;
