import { useContext } from "react";
import { PostingListContext, bodyLoadingContext } from "App";
import { Link } from "react-router-dom";
import Loader from "pages/body/Loader";
import "pages/body/PostingList.css";

function PostingList() {
  const postingList = useContext(PostingListContext);
  const loading = useContext(bodyLoadingContext);
  const postingListJsx = (
    <ul className="posting-list-wrap">
      {postingList.map((posting) => (
        <li key={`posting-${posting.title}`}>
          <Link to={posting.path} className="posting-link">
            {posting.title} - {posting.date}
          </Link>
        </li>
      ))}
    </ul>
  );

  return <>{loading ? <Loader /> : postingListJsx}</>;
}

export default PostingList;
