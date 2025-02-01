// React
import { useEffect } from "react";

// External

// Local
import { errorRedirect } from "components/ErrorRedirect";

export default function useGlobalErrorHandler() {
  useEffect(() => {
    // 전역 스크립트/런타임 에러
    const handleError = (event: ErrorEvent) => {
      errorRedirect({
        statusCode: 429,
        message: `${event}` || "예기치 못한 문제가 발생했습니다.",
      });
    };

    // 처리되지 않은 Promise Rejection
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      errorRedirect({
        statusCode: 500,
        message: event.reason || "예기치 못한 문제가 발생했습니다.",
      });
    };

    // 이벤트 리스너 등록
    try {
      window.addEventListener("error", handleError);
      window.addEventListener("unhandledrejection", handleUnhandledRejection);
    } catch (error) {}

    return () => {
      // 컴포넌트 언마운트 시 리스너 해제
      try {
        window.removeEventListener("error", handleError);
        window.removeEventListener(
          "unhandledrejection",
          handleUnhandledRejection
        );
      } catch (error) {}
    };
  }, []);
}
