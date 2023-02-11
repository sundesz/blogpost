import { Container } from 'react-bootstrap';
import GoBack from './GoBack';

const Page404 = () => {
  return (
    <Container className="p-5">
      <div className="display-1 fw-bold text-center">Page not found.</div>
      <GoBack />
    </Container>
  );
};

export default Page404;
