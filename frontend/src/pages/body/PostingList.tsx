import { useContext } from "react";
import { PostingListContext } from "App";
import { Link } from "react-router-dom";
import "pages/body/PostingList.css";

function PostingList() {
  const postingList = useContext(PostingListContext);

  return (
    <li className="posting-list-wrap">
      {postingList.map((posting) => (
        <Link
          key={`link-${posting.title}`}
          to={posting.path}
          className="posting-link"
        >
          {posting.title} - {posting.date}
        </Link>
      ))}
    </li>
  );
}

export default PostingList;
