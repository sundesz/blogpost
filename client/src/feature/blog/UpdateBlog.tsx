import { Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUpdateBlogMutation } from './blogApiSlice';
import { IBlog, ICreateUpdateBlogParams } from '../../types';
import Loading from '../../components/Loading';
import BlogForm from './BlogForm';
import { useGetAllAuthorQuery } from '../author/authorApiSlice';
import slugify from 'slugify';
import { slugifyOptions } from '../../config';
import ErrorPage from '../../components/ErrorPage';
import ErrorNotification from '../../utils/ErrorNotification';
import { message } from '../../utils/notificationMessage';

const UpdateBlog: React.FC = () => {
  const navigate = useNavigate();
  const { data: authors, isLoading, isError, error } = useGetAllAuthorQuery();
  const [updateBlog] = useUpdateBlogMutation();

  let { state } = useLocation() as { state: { blog: IBlog } };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage error={error} />;
  }

  const onSubmit = async (updateBlogData: ICreateUpdateBlogParams) => {
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
