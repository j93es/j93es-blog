// React

// External
import { Link } from "react-router-dom";

// Local
import { MarkdownMetadata } from "models/markdownMetadata";
import { usePostingIndexController } from "contexts/PostingIndexControllerProvider";
import MetaTag from "pages/body/components/MetaTag";
import "pages/body/PostingList/PostingList.css";

interface PostingListProps {}

const PostingList: React.FC<PostingListProps> = () => {
  const { postingIndexController } = usePostingIndexController();

  return (
    <div className="posting-list-wrap">
      <MetaTag useDefault={true} />
      {postingIndexController &&
        postingIndexController.getCategoryList().map((category: string) => (
          <div key={`category-${category}`} className="category-wrap">
            <h2 className="category-title">{category}</h2>
            <ul className="posting-link-wrap">
              {postingIndexController
                .getPostingList(category)
                .map((posting: MarkdownMetadata) => (
                  <li key={`posting-${posting.title}`}>
                    <Link
                      to={posting.path}
                      className="posting-link-item"
                      aria-label={`${posting.title} 포스팅으로 이동`}
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
};

export default PostingList;
