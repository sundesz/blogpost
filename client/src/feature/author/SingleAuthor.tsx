import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ErrorPage from '../../components/ErrorPage';
import Loading from '../../components/Loading';
import PageTitle from '../../components/PageTitle';
import { capitalize } from '../../utils';
import ShortBlog from '../blog/ShortBlog';
import { useGetAuthorQuery } from './authorApiSlice';

const SingleAuthor = () => {
  const { authorId } = useParams() as { authorId: string };
  const {
    data: author,
    isError,
    error,
    isLoading,
  } = useGetAuthorQuery(authorId);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage error={error} />;
  }

  return (
    <Container className="py-5">
      <PageTitle title={`${capitalize(author?.name!)} (${author?.email})`} />

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
