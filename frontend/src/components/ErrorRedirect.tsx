// React
import { useEffect } from "react";

// External

// Local
import { errorRedirect } from "utils/index";

interface ErrorRedirectProps {
  statusCode: number;
  message: string;
}

const ErrorRedirect: React.FC<ErrorRedirectProps> = ({
  statusCode,
  message,
}) => {
  useEffect(() => {
    errorRedirect({ statusCode, message });
  }, [statusCode, message]);

  return null;
};

export default ErrorRedirect;
