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

const CreateBlog: React.FC = () => {
  const navigate = useNavigate();
  const { data: authors, isLoading, isError, error } = useGetAllAuthorQuery();
  const [createBlog] = useCreateBlogMutation();

  if (isError) {
    return <p>{JSON.stringify(error)}</p>;
  }

  if (authors === undefined) {
    return <p>No authors</p>;
  }

  if (isLoading) {
    return <Loading />;
  }

  const onSubmit = async (newBlogData: ICreateUpdateBlogParams) => {
    try {
      await createBlog({
        ...newBlogData,
        slug: slugify(newBlogData.title),
      }).unwrap();
      toast.success(`Blog successfully created`);
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
      <BlogForm crudType="create" onSubmit={onSubmit} authors={authors} />
    </Container>
  );
};

export default CreateBlog;
