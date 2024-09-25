import PostingList from "pages/body/PostingList";
import { useContext } from "react";
import { LoadingContext } from "App";
import Posting from "pages/body/Posting";
import "pages/body/Body.css";

function Body({ path }: { path: string }) {
  const loading = useContext(LoadingContext);
  const jsxElem = path === "/" ? <PostingList /> : <Posting path={path} />;

  return (
    <div className="body-wrapper">
      {loading ? <div>Loading...</div> : jsxElem}
    </div>
  );
}

export default Body;
