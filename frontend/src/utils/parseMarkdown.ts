// External

// Local

interface ParsedMarkdown {
  data: { [key: string]: any };
  content: string;
}

class ParseMarkdown {
  private _parseMarkdownData(
    match: RegExpMatchArray | null
  ): ParsedMarkdown["data"] {
    let data = {};

    if (match) {
      // 메타데이터 부분을 추출하고 나머지는 본문으로 남긴다.
      const metadata = match[1].replace(/["']/g, "");

      // 각 줄을 처리하여 key-value 형태로 변환
      data = metadata.split("\n").reduce((acc: any, line: string) => {
        const temp =
          line.indexOf(":") !== -1
            ? line.indexOf(":")
            : line.indexOf("：") !== -1
            ? line.indexOf("：")
            : line.indexOf("=") !== -1
            ? line.indexOf("=")
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
                // eslint-disable-next-line
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

    return data || {};
  }

  private _parseMarkdownContent(
    markdown: string,
    match: RegExpMatchArray | null
  ): string {
    let content = markdown.trim();

    if (match) {
      content = content.slice(match[0].length).trim();
    }

    return content || "";
  }

  getData(markdown: string): ParsedMarkdown["data"] {
    const metadataRegex = /^---\s*([\s\S]*?)\s*---/m;
    const match = markdown.match(metadataRegex);

    return this._parseMarkdownData(match);
  }

  getContent(markdown: string): string {
    const metadataRegex = /^---\s*([\s\S]*?)\s*---/m;
    const match = markdown.match(metadataRegex);

    return this._parseMarkdownContent(markdown, match);
  }

  get(markdown: string): ParsedMarkdown {
    const metadataRegex = /^---\s*([\s\S]*?)\s*---/m;
    const match = markdown.match(metadataRegex);

    const data = this._parseMarkdownData(match);
    const content = this._parseMarkdownContent(markdown, match);

    return {
      data,
      content,
    };
  }
}

export { ParseMarkdown };
