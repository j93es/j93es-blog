// React
import React, { createContext, useState } from "react";

// External

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
      <SetFooterHideCmdContext.Provider value={setFooterHideCmd}>
        <Header />
        <Body />
        <Footer footerHideCmd={footerHideCmd} />
      </SetFooterHideCmdContext.Provider>
    </div>
  );
}

export default App;
