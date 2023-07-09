import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { format } from 'date-fns';
import { Blog } from '../../types';
import AuthorImage from '../../components/AuthorImage';

interface BlogProps {
  blog: Blog;
  isAuthorBlog?: boolean;
}

const ShortBlog: React.FC<BlogProps> = ({ blog, isAuthorBlog = false }) => {
  return (
    <Card className={blog.published ? '' : 'bg-warning'}>
      <Card.Body>
        <Card.Title>
          <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
        </Card.Title>

        <Card.Text>
          <small>{format(new Date(blog.updatedAt!), 'dd LLLL yyyy')}</small>
        </Card.Text>
        <Card.Text>{parse(blog.content)}</Card.Text>
        <Link to={`/blogs/${blog.slug}`}>
          <small>Read more ...</small>
        </Link>
      </Card.Body>
      {!isAuthorBlog && (
        <Card.Footer>
          by&nbsp;&nbsp;
          <AuthorImage author={blog.User} />
          &nbsp;{blog.User.name}
        </Card.Footer>
      )}
    </Card>
  );
};

export default ShortBlog;
