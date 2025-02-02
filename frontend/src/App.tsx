// React
import React, { createContext, useState } from "react";

// External
import { BrowserRouter } from "react-router-dom";

// Local
import Header from "pages/header/Header";
import Body from "pages/body/Body";
import Footer from "pages/footer/Footer";
import "App.css";

export const SetFooterHideCmdContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>(() => {});

const App = () => {
  const [footerHideCmd, setFooterHideCmd] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <SetFooterHideCmdContext value={setFooterHideCmd}>
          <Header />
          <Body />
          <Footer footerHideCmd={footerHideCmd} />
        </SetFooterHideCmdContext>
      </BrowserRouter>
    </div>
  );
};

export default App;
