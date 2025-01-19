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

function App() {
  const [footerHideCmd, setFooterHideCmd] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <SetFooterHideCmdContext.Provider value={setFooterHideCmd}>
          <Header />
          <Body />
          <Footer footerHideCmd={footerHideCmd} />
        </SetFooterHideCmdContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
