import { Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { isFetchBaseQueryError } from '../../utils';
import { toast } from 'react-toastify';
import { useUpdateBlogMutation } from './blogApiSlice';
import { IBlog, ICreateUpdateBlogParams } from '../../types';
import Loading from '../../components/Loading';
import BlogForm from './BlogForm';
import { useGetAllAuthorQuery } from '../author/authorApiSlice';
import slugify from 'slugify';
import { slugifyOptions } from '../../config';
import ErrorPage from '../../components/ErrorPage';

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

  if (!authors) {
    return <p>No authors</p>;
  }

  const onSubmit = async (updateBlogData: ICreateUpdateBlogParams) => {
    try {
      const updatedBlogSlug = await updateBlog({
        ...updateBlogData,
        blogId: state.blog.blogId,
        slug: slugify(updateBlogData.title, slugifyOptions),
      }).unwrap();

      toast.success(`Blog updated successfully.`);
      navigate(`/blogs/${updatedBlogSlug}`);
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errorCodes = [400, 401];
        let errMessage;
        if (!error?.status) {
          errMessage = 'No Server Response';
        } else if (errorCodes.includes(error.status as number)) {
          errMessage = error.data as string;
        } else {
          errMessage = 'Failed updating blog.';
        }
        toast.error(errMessage);
      }
    }
  };

  return (
    <Container className="content-container py-5">
      <BlogForm
        crudType="update"
        blog={state.blog}
        onSubmit={onSubmit}
        authors={authors}
      />
    </Container>
  );
};

export default UpdateBlog;
