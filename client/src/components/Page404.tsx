import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <Container className="p-5">
      <div className="display-1 fw-bold text-center">Page not found.</div>
      <div onClick={() => navigate(-1)} className="go-back">
        &#8249; go back
      </div>
    </Container>
  );
};

export default Page404;
