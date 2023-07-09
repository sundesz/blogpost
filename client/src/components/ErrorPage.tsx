import { Container } from 'react-bootstrap';
import { isFetchBaseQueryError } from '../utils/fetchQueryHelper';
import GoBack from './GoBack';
import Page404 from './Page404';
import ServerError from './ServerError';

const ErrorPage = ({ error }: { error: unknown }) => {
  if (
    isFetchBaseQueryError(error) &&
    Number(error.status) >= 400 &&
    Number(error.status) < 500
  ) {
    return <Page404 />;
  }

  if (isFetchBaseQueryError(error) && Number(error.status) === 500) {
    return <ServerError />;
  }

  let errorMessage = JSON.stringify(error);

  if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <Container className="p-5">
      <div className="display-5 fw-bold text-center">{errorMessage}</div>
      <GoBack />
    </Container>
  );
};

export default ErrorPage;
