import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IBlog } from '../../types';

interface IBlogProps {
  blog: IBlog;
}

const ShortBlog: React.FC<IBlogProps> = ({ blog }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Text>{blog.content}</Card.Text>
        <Link to={`/blogs/${blog.slug}`}>Read more ...</Link>
      </Card.Body>
    </Card>
  );
};

export default ShortBlog;
