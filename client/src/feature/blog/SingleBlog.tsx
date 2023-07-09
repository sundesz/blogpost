import { formatDistanceToNow, parseISO } from 'date-fns';
import { Container } from 'react-bootstrap';
import parse from 'html-react-parser';
import { Link, useParams } from 'react-router-dom';
import ErrorPage from '../../components/ErrorPage';
import Loading from '../../components/Loading';
import Page404 from '../../components/Page404';
import PageTitle from '../../components/PageTitle';
import { useAppSelector } from '../../hooks/reduxToolkit';
import { capitalize } from '../../utils';
import { selectCurrentUser } from '../auth/authSlice';
import CommentList from '../comment/CommentList';
import { useGetBlogQuery } from './blogApiSlice';
import ReactionButtons from './ReactionButtons';

const SingleBlog: React.FC = () => {
  const user = useAppSelector(selectCurrentUser);
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Page404 />; // redirects to blog page
  }

  const { data: blog, isLoading, isError, error } = useGetBlogQuery(slug);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage error={error} />;
  }

  if (!blog) {
    return <Page404 />;
  }

  // user is admin or logged in user create the blog
  const conditionForEdit =
    user.isAuthenticate &&
    (user.role === 'admin' || blog.User.userId === user.userId);

  const isOwnBlog = user.userId === blog.User.userId;
  const unPublishedClass = blog.published ? '' : 'bg-warning';

  return (
    <Container className={`content-container py-5 ${unPublishedClass}`}>
      <PageTitle
        title={capitalize(blog.title)}
        divClass="mb-2"
        displayClass="display-6"
      />

      <div className="lead mb-4">{parse(blog.content)}</div>
      <div className="author-misc my-5">
        <div className="author-name">
          by &nbsp;
          <Link to={`/authors/${blog.User.userId}`} className="by-author">
            {blog.User.name}
          </Link>
        </div>
        <div className="blog-date">
          updated {formatDistanceToNow(parseISO(blog.updatedAt!))} ago
        </div>
      </div>

      <div className="button-group">
        <ReactionButtons blog={blog} isOwnBlog={isOwnBlog} />

        <div className="crud-button">
          {conditionForEdit && (
            <Link
              id="edit-btn"
              to={`/blogs/update/${slug}`}
              state={{ blog }}
              className="btn btn-primary"
            >
              Edit
            </Link>
          )}
          {!isOwnBlog && (
            <Link
              id="comment-btn"
              to={`/comments/new`}
              state={{ blog }}
              className="btn btn-primary"
            >
              Add comment
            </Link>
          )}
        </div>
      </div>

      <CommentList blog={blog} />
    </Container>
  );
};

export default SingleBlog;
