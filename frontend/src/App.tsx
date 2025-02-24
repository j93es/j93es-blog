// React

// External

// Local
import useDesktopSafariBackFix from "customHooks/useDesktopSafariBackFix";
import useScrollToTop from "customHooks/useScrollToTop";
import { isMacOs, isSafari } from "mobile-device-detect";
import Header from "pages/header/Header";
import Body from "pages/body/Body";
import Footer from "pages/footer/Footer";
import "App.css";

const App = () => {
  console.log("isMacOs", isMacOs);
  useDesktopSafariBackFix(isMacOs && isSafari);
  useScrollToTop();

  return (
    <div className="App">
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export default App;
