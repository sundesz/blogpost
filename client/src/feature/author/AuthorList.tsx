import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import { useGetAllAuthorQuery } from './authorApiSlice';

const AuthorList = () => {
  const { data: authors, isError, error, isLoading } = useGetAllAuthorQuery();

  if (isError) {
    return <div>{JSON.stringify(error)}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className="py-5">
      {authors?.map((author) => (
        <div key={author.userId}>
          <Link to={`/authors/${author.userId}`}>{author.name}</Link>
        </div>
      ))}
    </Container>
  );
};

export default AuthorList;
