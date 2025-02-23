// React
import React, { createContext, useState, useContext } from "react";

// External

// Local

const FooterHiddenContext = createContext<{
  footerHidden: boolean;
  setFooterHidden: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  footerHidden: false,
  setFooterHidden: () => {},
});

const FooterHiddenProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [footerHidden, setFooterHidden] = useState<boolean>(false);

  return (
    <FooterHiddenContext
      value={{
        footerHidden,
        setFooterHidden,
      }}
    >
      {children}
    </FooterHiddenContext>
  );
};

const useFooterHidden = () => useContext(FooterHiddenContext);

export { FooterHiddenProvider, useFooterHidden };
