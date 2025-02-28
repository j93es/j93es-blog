// React
import { useEffect } from "react";

// External

// Local

const useStaticFont = () => {
  useEffect(() => {
    // 정적 서브셋 로딩을 위한 link 태그 생성
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/pretendard/1.3.9/static/pretendard.min.css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);
};

export default useStaticFont;
