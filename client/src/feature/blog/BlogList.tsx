import { Container } from 'react-bootstrap';
import ShortBlog from './ShortBlog';
import { Blog } from '../../types';

interface BlogListProps {
  blogs: Blog[];
}

const BlogList = ({ blogs }: BlogListProps) => {
  return (
    <Container className="blog-container py-5">
      {blogs && blogs.length ? (
        blogs.map((blog) => <ShortBlog key={blog.blogId} blog={blog} />)
      ) : (
        <div className="no-data">No blog yet.</div>
      )}
    </Container>
  );
};

export default BlogList;
