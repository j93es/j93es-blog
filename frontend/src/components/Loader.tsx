// React
import { useContext, useEffect } from "react";

// External

// Local
import { SetFooterHideCmdContext } from "App";
import "components/Loader.css";

const Loader = () => {
  const setFooterHideCmd = useContext(SetFooterHideCmdContext);

  useEffect(() => {
    setFooterHideCmd(true);
    return () => {
      setFooterHideCmd(false);
    };
  }, [setFooterHideCmd]);

  return (
    <div className="dot-spinner">
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
    </div>
  );
};

export default Loader;
