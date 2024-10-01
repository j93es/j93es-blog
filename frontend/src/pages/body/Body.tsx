import PostingList from "pages/body/PostingList";
import Posting from "pages/body/Posting";
import "pages/body/Body.css";

function Body({ path }: { path: string }) {
  const jsxElem = path === "/" ? <PostingList /> : <Posting path={path} />;

  return <div className="body-wrapper">{jsxElem}</div>;
}

export default Body;
