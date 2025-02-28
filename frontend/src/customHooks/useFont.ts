// React
import { useEffect } from "react";

// External

// Local

const useFont = () => {
  useEffect(() => {
    const link = document.createElement("link");

    setTimeout(() => {
      link.rel = "stylesheet";
      link.as = "style";
      link.crossOrigin = "anonymous";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/pretendard/1.3.9/static/pretendard.min.css";
      document.head.appendChild(link);
    }, 3000);

    return () => {
      document.head.removeChild(link);
    };
  }, []);
};

export default useFont;
