// External

// Local

const errorRedirect = ({
  statusCode,
  message,
}: {
  statusCode: number;
  message: string;
}) => {
  setTimeout(
    () => {
      window.location?.replace(
        `/error-page/${statusCode}.html?j93es-message=${encodeURIComponent(
          message
        )}`
      );
    },
    statusCode === 429 ? 1000 : 0
  );
};

export { errorRedirect };
