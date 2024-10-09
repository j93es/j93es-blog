interface ParsedMarkdown {
  data: { [key: string]: any };
  content: string;
}

export function parseMarkdown(markdown: string): ParsedMarkdown {
  // 첫 번째 메타데이터 블록만 추출하는 정규식
  const metadataRegex = /^---\s*([\s\S]*?)\s*---/m;
  const match = markdown.match(metadataRegex);

  let data = {};
  let content = markdown.trim();

  if (match) {
    // 메타데이터 부분을 추출하고 나머지는 본문으로 남긴다.
    const metadata = match[1].replace(/["']/g, "");
    content = content.slice(match[0].length).trim();

    // 각 줄을 처리하여 key-value 형태로 변환
    data = metadata.split("\n").reduce((acc: any, line: string) => {
      const temp =
        line.indexOf(":") !== -1
          ? line.indexOf(":")
          : line.indexOf("：") !== -1
          ? line.indexOf("：")
          : -1;

      if (temp === -1) {
        return acc;
      }

      const key = line.slice(0, temp).trim();
      const value = line.slice(temp + 1).trim();

      if (key && value) {
        try {
          // 값이 배열 형태일 경우 처리
          if (value.startsWith("[") && value.endsWith("]")) {
            acc[key] = value
              .replace(/[\[\]]/g, "")
              .split(",")
              .map((str) => str.trim());
          } else {
            acc[key] = value;
          }
        } catch (error) {
          acc[key] = value;
        }
      }
      return acc;
    }, {});
  }

  return {
    data: data || {},
    content: content.trim() || "",
  };
}
