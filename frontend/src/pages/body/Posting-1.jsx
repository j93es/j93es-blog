import { useEffect, useState } from "react";
import { apiUrl } from "config/app-config";

function Posting({ path }) {
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    if (!path || path === "/") {
      return;
    }
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(apiUrl + path);
        if (!response.ok) {
          throw new Error("Failed to fetch markdown");
        }
        const markdownText = await response.text();
        setMarkdownContent(markdownText.split("---")[2]);
      } catch (error) {
        console.error("Failed to fetch markdown", error);
      }
    };

    fetchMarkdown();
  }, [path]);

  console.log(markdownContent);

  return <my-md-block>{markdownContent}</my-md-block>;
}

export default Posting;
