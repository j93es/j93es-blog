// React

// External
import { BrowserRouter } from "react-router-dom";

// Local
import { LoadingProvider } from "contexts/LoadingProvider";
import { PostingIndexControllerProvider } from "contexts/PostingIndexControllerProvider";
import useSafariBackFix from "customHooks/useSafariBackFix";
import ScrollToTop from "components/ScrollToTop";
import Header from "pages/header/Header";
import Body from "pages/body/Body";
import Footer from "pages/footer/Footer";
import "App.css";

const App = () => {
  useSafariBackFix(); // Safari에서만 뒤로 가기/앞으로 가기 문제 해결

  return (
    <div className="App">
      <BrowserRouter>
        <PostingIndexControllerProvider>
          <LoadingProvider>
            <ScrollToTop />
            <Header />
            <Body />
            <Footer />
          </LoadingProvider>
        </PostingIndexControllerProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
