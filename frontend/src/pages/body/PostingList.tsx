import { useContext } from "react";
import { PostingListContext } from "App";
import { Link } from "react-router-dom";
import "pages/body/PostingList.css";

function PostingList() {
  const postingList = useContext(PostingListContext);

  return (
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
}

export default PostingList;
