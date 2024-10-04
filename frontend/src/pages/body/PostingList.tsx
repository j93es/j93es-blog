import { useContext } from "react";
import { PostingListContext } from "App";
import { Link } from "react-router-dom";
import { categoryList } from "config";
import "pages/body/PostingList.css";
import { MarkdownMetadata } from "module/metadata";

function PostingList() {
  const postingList = useContext(PostingListContext);
  const categoryJsx: { [key: string]: JSX.Element[] } = {};

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

    if (!categoryList.includes(posting.category)) {
      posting.category = "etc";
    }

    if (!Object.keys(categoryJsx).includes(posting.category)) {
      categoryJsx[posting.category] = [];
    }

    categoryJsx[posting.category].push(jsxElem);
  });

  return (
    <div className="posting-list-wrap">
      {Object.keys(categoryJsx).map((category: string) => (
        <div key={`category-${category}`}>
          <h2>{category}</h2>
          <ol className="posting-category-wrap">{categoryJsx[category]}</ol>
        </div>
      ))}
    </div>
  );
}

export default PostingList;
