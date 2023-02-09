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

const UpdateBlog: React.FC = () => {
  const navigate = useNavigate();
  const { data: authors, isLoading, isError, error } = useGetAllAuthorQuery();
  const [updateBlog] = useUpdateBlogMutation();

  let { state } = useLocation() as { state: { blog: IBlog } };

  if (isError) {
    return <p>{JSON.stringify(error)}</p>;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!authors) {
    return <p>No authors</p>;
  }

  const onSubmit = async (updateBlogData: ICreateUpdateBlogParams) => {
    try {
      const updatedBlog = await updateBlog({
        ...updateBlogData,
        blogId: state.blog.blogId,
        slug: slugify(updateBlogData.title),
      }).unwrap();
      toast.success(`Blog successfully updated`);
      navigate('/');
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errorCodes = [400, 401];
        let errMessage;
        if (!error?.status) {
          errMessage = 'No Server Response';
        } else if (errorCodes.includes(error.status as number)) {
          errMessage = error.data as string;
        } else {
          errMessage = 'Creating blog Failed';
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
