import { Container } from 'react-bootstrap';
import ShortBlog from './ShortBlog';
import { Blog } from '../../types';

interface BlogListProps {
  blogs: Blog[];
}

const renderBlog = (blogs: Blog[]) => {
  if (blogs.length <= 0) {
    return <div className="no-data">No blog yet.</div>;
  }

  return blogs.map((blog) => <ShortBlog key={blog.blogId} blog={blog} />);
};

const BlogList = ({ blogs }: BlogListProps) => {
  return (
    <Container className="blog-container py-5">{renderBlog(blogs)}</Container>
  );
};

export default BlogList;
