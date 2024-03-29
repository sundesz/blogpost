import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Author } from '../../types';
import AuthorImage from '../../components/AuthorImage';

interface AuthorListProps {
  authors: Author[];
}

const renderAuthor = (authors: Author[]) => {
  if (authors.length <= 0) {
    return <div className="no-data">No author yet.</div>;
  }

  return authors.map((author) => (
    <Card key={author.userId}>
      <AuthorImage author={author} />

      <Card.Body>
        <Card.Title>
          <Link to={`/authors/${author.userId}`}>{author.name}</Link>
        </Card.Title>
        <Card.Body>{author.email}</Card.Body>
        <Card.Footer>
          <Link to={`/authors/${author.userId}`}>
            {author.blogCount ? author.blogCount : 0} blog(s)
          </Link>
        </Card.Footer>
      </Card.Body>
    </Card>
  ));
};

const AuthorList = ({ authors }: AuthorListProps) => {
  return (
    <Container className="author-container py-5">
      {renderAuthor(authors)}
    </Container>
  );
};

export default AuthorList;
