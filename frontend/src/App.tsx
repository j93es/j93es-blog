// React

// External
import { BrowserRouter } from "react-router-dom";

// Local
import { LoadingProvider } from "contexts/LoadingProvider";
import { PostingIndexControllerProvider } from "contexts/PostingIndexControllerProvider";
import Pages from "pages/Pages";
import "App.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <PostingIndexControllerProvider>
          <LoadingProvider>
            <Pages />
          </LoadingProvider>
        </PostingIndexControllerProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
