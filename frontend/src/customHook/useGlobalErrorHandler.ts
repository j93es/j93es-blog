// React
import { useEffect, useState } from "react";

// External

// Local

export default function useGlobalErrorHandler(): boolean {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // 전역 스크립트/런타임 에러
    const handleError = (event: ErrorEvent) => {
      setHasError(true);
    };

    // 처리되지 않은 Promise Rejection
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      setHasError(true);
    };

    // 이벤트 리스너 등록
    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      // 컴포넌트 언마운트 시 리스너 해제
      window.removeEventListener("error", handleError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, []);

  return hasError;
}
