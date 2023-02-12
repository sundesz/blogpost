import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ErrorPage from '../../components/ErrorPage';
import Loading from '../../components/Loading';
import { useGetAllAuthorQuery } from './authorApiSlice';

const AuthorList = () => {
  const { data: authors, isError, error, isLoading } = useGetAllAuthorQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage error={error} />;
  }

  return (
    <Container className="author-container py-5">
      {authors && authors.length ? (
        authors.map((author) => (
          <Card key={author.userId}>
            <Card.Body>
              <Card.Title>
                <Link to={`/authors/${author.userId}`}>{author.name}</Link>
              </Card.Title>
              <Card.Body>{author.email}</Card.Body>
              <Card.Footer>
                {author.blogs ? author.blogs.length : 0} blog(s)
              </Card.Footer>
            </Card.Body>
          </Card>
        ))
      ) : (
        <div className="no-data">No author yet.</div>
      )}
    </Container>
  );
};

export default AuthorList;
