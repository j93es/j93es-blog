// React

// External

// Local

const errorRedirect = ({
  statusCode,
  message,
}: {
  statusCode: number;
  message: string;
}) => {
  window.location?.replace(
    `/error-page/error.html?j93es-status=${encodeURIComponent(
      statusCode
    )}&j93es-message=${encodeURIComponent(message)}`
  );
};

export { errorRedirect };
