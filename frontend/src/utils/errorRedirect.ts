// React

// External

// Local
import { apiUrl } from "config";

const errorRedirect = ({
  statusCode,
  message,
}: {
  statusCode: number;
  message: string;
}) => {
  window.location?.replace(
    `${apiUrl}/error-page/error.html?j93es-status=${encodeURIComponent(
      statusCode
    )}&j93es-message=${encodeURIComponent(message)}`
  );
};

export { errorRedirect };
