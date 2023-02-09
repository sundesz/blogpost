import { formatDistanceToNow, parseISO } from 'date-fns';
import { Container } from 'react-bootstrap';
import nl2br from 'react-nl2br';
import { Link, useParams } from 'react-router-dom';
import ErrorPage from '../../components/ErrorPage';
import GoBack from '../../components/GoBack';
import Loading from '../../components/Loading';
import Page404 from '../../components/Page404';
import { useAppSelector } from '../../hooks/reduxToolkit';
import { capitalize } from '../../utils';
import { selectCurrentUser } from '../auth/authSlice';
import CommentList from '../comment/CommentList';
import { useGetBlogQuery } from './blogApiSlice';
import ReactionButtons from './ReactionButtons';

const SingleBlog: React.FC = () => {
  const user = useAppSelector(selectCurrentUser);
  const { blogId } = useParams() as { blogId: string };
  const { data: blog, isLoading, isError, error } = useGetBlogQuery(blogId);

  if (isError) {
    return <ErrorPage error={error} />;
  }

  if (!blog) {
    return <Page404 />;
  }

  if (isLoading) {
    return <Loading />;
  }

  // user is admin or logged in user create the blog
  const conditionForEdit =
    user.isAuthenticate &&
    (user.role === 'admin' || blog.user.userId === user.userId);

  return (
    <Container className="content-container py-5">
      <div className="page-title">
        <h1 className="display-5 fw-bold">{capitalize(blog.title)} </h1>
        <GoBack />
      </div>
      <div className="">
        <p className="lead mb-4">{nl2br(blog.content)}</p>
      </div>
      <div className="author-misc my-5">
        <div className="author-name">
          by{' '}
          <b>
            <i>
              <Link to={`/authors/${blog.user.userId}`}>{blog.user.name}</Link>
            </i>
          </b>
        </div>
        <div className="blog-date">
          updated {formatDistanceToNow(parseISO(blog.updatedAt!))} ago
        </div>
      </div>

      <div className="button-group">
        <ReactionButtons blog={blog} />

        <div>
          {conditionForEdit && (
            <Link
              to={`/blogs/update/${blogId}`}
              state={{ blog }}
              className="btn btn-primary"
            >
              Edit
            </Link>
          )}
          <Link
            to={`/comments/new`}
            state={{ blog }}
            className="btn btn-primary"
          >
            Add comment
          </Link>
        </div>
      </div>

      <CommentList comments={blog.comments} />
    </Container>
  );
};

export default SingleBlog;
