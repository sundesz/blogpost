import { Container } from 'react-bootstrap';
import GoBack from './GoBack';

const ServerError = () => {
  return (
    <Container className="p-5">
      <div className="display-1 fw-bold text-center">Server not connected.</div>
      <GoBack />
    </Container>
  );
};

export default ServerError;
