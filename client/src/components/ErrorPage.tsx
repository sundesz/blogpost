import { isFetchBaseQueryError } from '../utils/fetchQueryHelper';
import Page404 from './Page404';

const ErrorPage = ({ error }: { error: unknown }) => {
  if (
    isFetchBaseQueryError(error) &&
    (error.status >= 400 || error.status < 500)
  ) {
    return <Page404 />;
  }

  return <div>{JSON.stringify(error)}</div>;
};

export default ErrorPage;
