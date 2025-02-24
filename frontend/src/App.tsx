// React

// External

// Local
import useDesktopSafariBackFix from "customHooks/useDesktopSafariBackFix";
import useScrollToTop from "customHooks/useScrollToTop";
import { isMacOs, isSafari, isIOS, isMobileSafari } from "mobile-device-detect";
import Header from "pages/header/Header";
import Body from "pages/body/Body";
import Footer from "pages/footer/Footer";
import "App.css";

const App = () => {
  useDesktopSafariBackFix(isMacOs && isSafari && !isIOS && !isMobileSafari);
  useScrollToTop();

  return (
    <div className="App">
      <p>{`${isMacOs && isSafari && !isIOS && !isMobileSafari}`}</p>
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export default App;
