// React

// External
import { BrowserRouter } from "react-router-dom";

// Local
import { LoadingProvider } from "contexts/LoadingProvider";
import { PostingIndexControllerProvider } from "contexts/PostingIndexControllerProvider";
import { FooterHiddenProvider } from "contexts/FooterHiddenProvider";
import Pages from "pages/Pages";
import "App.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <PostingIndexControllerProvider>
          <FooterHiddenProvider>
            <LoadingProvider>
              <Pages />
            </LoadingProvider>
          </FooterHiddenProvider>
        </PostingIndexControllerProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
