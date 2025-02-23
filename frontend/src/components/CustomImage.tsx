// React
import React, { useState } from "react";

// External

// Local
import { appDefaultTitle } from "config";

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
      alt={
        isError
          ? props.alt || `${appDefaultTitle}의 이미지`
          : "이미지를 불러오지 못했습니다."
      }
      onError={handleError}
    />
  );
};

export default CustomImage;
