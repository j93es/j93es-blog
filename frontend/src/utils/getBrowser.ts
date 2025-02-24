// External

// Local

const browsers = [
  "Instagram",
  "Chrome",
  "Opera",
  "WebTV",
  "Whale",
  "Beonex",
  "Chimera",
  "NetPositive",
  "Phoenix",
  "Firefox",
  "Safari",
  "SkipStone",
  "Netscape",
  "Mozilla",
];

/**
 * @description 브라우저 종류를 알아내는 함수입니다.
 * @returns string - 브라우저 이름 or 'Unknown'
 */

const getBrowser = () => {
  if (!window) return null;

  const userAgent = `${window.navigator.userAgent || ""}`.toLowerCase();

  if (userAgent.includes("edg")) {
    return "Edge";
  }

  if (userAgent.includes("trident") || userAgent.includes("msie")) {
    return "Internet Explorer";
  }

  if (userAgent.includes("crios")) {
    // 추가
    return "Chrome";
  }

  return (
    browsers.find((browser) => userAgent.includes(browser.toLowerCase())) ||
    "Unknown"
  );
};

export { getBrowser };
