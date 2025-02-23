// React
import { useEffect } from "react";

// External

// Local
import { useLoading } from "contexts/LoadingProvider";

const LoadingIndicator: React.FC<{}> = () => {
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading();
    return () => stopLoading();

    // eslint-disable-next-line
  }, []);

  return null;
};

export default LoadingIndicator;
