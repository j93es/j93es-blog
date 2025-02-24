// React

// External

// Local
import useSafariBackFix from "customHooks/useSafariBackFix";
import useScrollToTop from "customHooks/useScrollToTop";
import Header from "pages/header/Header";
import Body from "pages/body/Body";
import Footer from "pages/footer/Footer";
import "App.css";

const App = () => {
  useSafariBackFix();
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
