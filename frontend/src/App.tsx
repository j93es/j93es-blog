// React

// External
import { BrowserRouter } from "react-router-dom";

// Local
import { LoadingProvider } from "contexts/LoadingProvider";
import { PostingIndexControllerProvider } from "contexts/PostingIndexControllerProvider";
import Header from "pages/header/Header";
import Body from "pages/body/Body";
import Footer from "pages/footer/Footer";
import "App.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <PostingIndexControllerProvider>
          <LoadingProvider>
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
