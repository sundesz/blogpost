import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ErrorPage from '../../components/ErrorPage';
import Loading from '../../components/Loading';
import PageTitle from '../../components/PageTitle';
import { capitalize } from '../../utils';
import { useGetAuthorQuery } from './authorApiSlice';
import AuthorImage from '../../components/AuthorImage';
import ShortBlog from '../blog/ShortBlog';

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

  if (isError || !author) {
    return <ErrorPage error={error} />;
  }

  return (
    <Container className="py-5">
      <PageTitle title={capitalize(author.name)} />

      <AuthorImage author={author} />
      <div>{author.email}</div>
      <div className="blog-container py-5 container">
        {author.Blogs?.map((blog) => (
          <ShortBlog key={blog.blogId} blog={blog} isAuthorBlog={true} />
        ))}
      </div>
    </Container>
  );
};

export default SingleAuthor;
