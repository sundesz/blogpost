import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorPage from '../../components/ErrorPage';
import Loading from '../../components/Loading';
import { capitalize } from '../../utils';
import BlogList from '../blog/BlogList';
import ShortBlog from '../blog/ShortBlog';
import { useGetAuthorQuery } from './authorApiSlice';

const SingleAuthor = () => {
  const navigate = useNavigate();
  const { authorId } = useParams() as { authorId: string };
  const {
    data: author,
    isError,
    error,
    isLoading,
  } = useGetAuthorQuery(authorId);

  if (isError) {
    return <ErrorPage error={error} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className="py-5">
      <div className="page-title">
        <h1 className="display-5 fw-bold">
          {capitalize(author?.name!)} {author?.email}
        </h1>
        <div onClick={() => navigate(-1)} className="go-back">
          &#8249; go back
        </div>
      </div>
      <div></div>
      <div className="blog-container py-5 container">
        {author?.blogs?.map((blog) => (
          <ShortBlog key={blog.blogId} blog={blog} />
        ))}
      </div>
    </Container>
  );
};

export default SingleAuthor;
