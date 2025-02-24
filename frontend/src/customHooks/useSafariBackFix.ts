// React
import { useEffect } from "react";

// External

// Local
import { isSafari } from "utils/index";

// Safari에서 트랙패드로 뒤로가기, 앞으로가기 이용 시 브라우저가 1초간 멈추는 이슈 해결
const useSafariBackFix = () => {
  useEffect(() => {
    if (!isSafari()) return;

    // popstate 이벤트가 발생하면 페이지를 새로고침
    // setTimeout을 사용하면 popstate가 트리거된 후 약간의 시간이 지나도록 강제하여, 브라우저의 상태 변화가 완료될 가능성을 높혀 안정성 증대(정확하진 않음)
    const handlePopState = () => {
      setTimeout(() => {
        window.location.reload();
      }, 10);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
};

export default useSafariBackFix;
