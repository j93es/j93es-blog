// React
import { useContext } from "react";

// External

// Local
import MetaTagSpecifier from "components/MetaTag";
import { PostingIndexControllerContext } from "pages/body/Body";
import { Link } from "react-router-dom";
import { EachPostingMetadata } from "model/postingIndex";
import "pages/body/PostingList.css";

function PostingList() {
  const postingIndexController = useContext(PostingIndexControllerContext);

  return (
    <div className="posting-list-wrap">
      <MetaTagSpecifier
        title="j93es blog"
        description="안녕하세요! j93es 블로그입니다. j93es의 개발 일지를 기록합니다. 더하여 사진 등 취미와 관련한 게시물 작성합니다. 블로그에 방문해주셔서 감사합니다!"
      />
      {postingIndexController &&
        postingIndexController.getCategoryList().map((category: string) => (
          <div key={`category-${category}`} className="category-wrap">
            <h2 className="category-title">{category}</h2>
            <ul className="posting-link-wrap">
              {postingIndexController
                .getPostingList(category)
                .map((posting: EachPostingMetadata) => (
                  <li key={`posting-${posting.title}`}>
                    <Link
                      to={posting.path}
                      className="posting-link-item"
                      aria-label={`A post named ${posting.title} in the ${posting.category} category`}
                    >
                      <span>{posting.title}</span>
                      <span>{posting.date}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
    </div>
  );
}

export default PostingList;
