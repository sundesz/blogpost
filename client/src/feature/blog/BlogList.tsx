import { Container } from 'react-bootstrap';
import ErrorPage from '../../components/ErrorPage';
import Loading from '../../components/Loading';
import { useGetAllBlogQuery } from './blogApiSlice';
import ShortBlog from './ShortBlog';

const BlogList = () => {
  const { data: blogs, isLoading, error, isError } = useGetAllBlogQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage error={error} />;
  }

  return (
    <Container className="blog-container py-5">
      {blogs?.map((blog) => (
        <ShortBlog key={blog.blogId} blog={blog} />
      ))}
    </Container>
  );
};

export default BlogList;
