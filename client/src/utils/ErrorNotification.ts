import { toast } from 'react-toastify';
import { isFetchBaseQueryError } from './fetchQueryHelper';

const ErrorNotification = (error: unknown, customErrMessage: string) => {
  if (isFetchBaseQueryError(error)) {
    const errorCodes = [400, 401];
    let errMessage;
    if (!error?.status) {
      errMessage = 'No Server Response.';
    } else if (errorCodes.includes(error.status as number)) {
      errMessage = error.data as string;
    } else {
      errMessage = customErrMessage;
    }

    toast.error(errMessage);
  }
};

export default ErrorNotification;
