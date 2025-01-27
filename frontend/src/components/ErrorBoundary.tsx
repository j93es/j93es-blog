// React
import React, { ReactNode } from "react";

// External

// Local
import { errorRedirect } from "./ErrorRedirect";

interface ErrorBoundaryProps {
  /** 자식 컴포넌트 */
  children: ReactNode;
  /** 에러 발생 시 표시할 대체 UI (선택 사항) */
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * 에러 발생 시 state를 업데이트해 렌더링을 변경하는 역할
   * @param error - 발생한 에러 객체
   */
  static getDerivedStateFromError(error: Error) {
    // 에러 발생 시 hasError를 true로 바꿔 렌더링을 fallback UI로 전환
    return { hasError: true };
  }

  /**
   * 실제 에러 로깅 용도로 사용
   * @param error - 발생한 에러 객체
   * @param errorInfo - 에러가 발생한 컴포넌트 스택 정보
   */
  // componentDidCatch(error: Error, errorInfo: ErrorInfo) {}

  render() {
    const { hasError } = this.state;
    const { fallback, children } = this.props;

    // 에러가 발생한 경우, fallback UI를 렌더하거나 기본 문구를 표시
    if (hasError) {
      if (fallback) {
        return <>{fallback}</>;
      } else {
        errorRedirect({
          statusCode: 500,
          message: "예기치 않은 오류가 발생했습니다.",
        });
        return null;
      }
    }

    // 에러가 없으면 정상적으로 자식 컴포넌트를 렌더
    return <>{children}</>;
  }
}

export default ErrorBoundary;
