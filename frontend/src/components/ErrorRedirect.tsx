// React
import { useEffect } from "react";

// External

// Local
import { errorRedirect } from "utils/index";

const ErrorRedirect = ({
  statusCode,
  message,
}: {
  statusCode: number;
  message: string;
}) => {
  useEffect(() => {
    errorRedirect({ statusCode, message });
  }, [statusCode, message]);

  return null;
};

export default ErrorRedirect;
