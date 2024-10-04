import { useContext } from "react";
import { PostingListContext } from "App";
import { Link } from "react-router-dom";
import { categoryList } from "config";
import { MarkdownMetadata } from "module/metadata";
import "pages/body/PostingList.css";

function PostingList() {
  const postingList = useContext(PostingListContext);
  const categoryJsx: { [key: string]: JSX.Element[] } = {};

  categoryList.forEach((category: string) => {
    categoryJsx[category] = [];
  });

  postingList.forEach((posting: MarkdownMetadata) => {
    const jsxElem = (
      <li key={`posting-${posting.title}`}>
        <Link
          to={posting.path}
          className="posting-link"
          aria-label={`posting ${posting.title}`}
        >
          <span>{posting.title}</span>
          <span>{posting.date}</span>
        </Link>
      </li>
    );

    if (categoryList.includes(posting.category)) {
      categoryJsx[posting.category].push(jsxElem);
    }
  });

  return (
    <div className="posting-list-wrap">
      {Object.keys(categoryJsx).map((category: string) => (
        <div key={`category-${category}`} className="category-wrap">
          <h2>{category}</h2>
          <ul className="posting-link-wrap">{categoryJsx[category]}</ul>
        </div>
      ))}
    </div>
  );
}

export default PostingList;
