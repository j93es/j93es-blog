// React
import React, { useState } from "react";

// External

// Local

interface CustomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const CustomImage: React.FC<CustomImageProps> = (props) => {
  const [isError, setIsError] = useState(false);

  const handleError = () => {
    setIsError(true);
  };

  return (
    <img
      {...props}
      style={
        isError
          ? {
              width: "100%",
              height: "auto",
              objectFit: "contain",
            }
          : {
              maxWidth: "100%",
              height: "auto",
            }
      }
      alt={props.alt || "이미지 로드 실패"}
      onError={handleError}
    />
  );
};

export default CustomImage;
