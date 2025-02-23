// React
import React, { useState } from "react";

// External

// Local
import { appDefaultTitle } from "config";
import Loader from "components/Loader";

interface CustomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const CustomImage: React.FC<CustomImageProps> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const onLoad = () => {
    setIsLoading(false);
  };
  const onError = () => {
    onLoad();
    setIsError(true);
  };

  return (
    <div
      style={{
        position: "relative",
        maxWidth: props.width || "100%",
        height: "auto",
        display: "inline-block",
        ...(isLoading && { border: ".0625rem solid #dadce0" }),
      }}
    >
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
        >
          <Loader />
        </div>
      )}
      <img
        {...props}
        style={{
          height: "auto",
          visibility: isLoading ? "hidden" : "visible",
          ...(isError
            ? { width: "100%", objectFit: "contain" }
            : { maxWidth: "100%", objectFit: "cover" }),
        }}
        alt={props.alt || `${appDefaultTitle}의 이미지`}
        onLoad={onLoad}
        onError={onError}
      />
    </div>
  );
};

export default CustomImage;
