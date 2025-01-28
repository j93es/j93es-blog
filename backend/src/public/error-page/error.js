const allowedErrorStatus = [400, 403, 404, 429, 500];
const queryStatusKey = "j93es-status";
const queryMessageKey = "j93es-message";
const redirectUrl = "https://j93.es";
let countdown = 5;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const originStatusCode = Number(urlParams.get(queryStatusKey));
const statusCode = allowedErrorStatus.includes(originStatusCode)
  ? originStatusCode
  : 400;
const message = urlParams.get(queryMessageKey);

const updateElementTextById = (id, text) => {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = text;
  }
};

const checkQueryString = () => {
  if (originStatusCode !== statusCode) {
    const url = new URL(window.location.href);
    url.searchParams.set(queryStatusKey, statusCode);
    url.searchParams.set(queryMessageKey, "잘못된 요청입니다.");
    window.location.replace(url);
  }
};

const setStatus = () => {
  updateElementTextById("statusCode", `${statusCode} Error`);
};

const setErrorMsg = () => {
  updateElementTextById(
    "message",
    message || "예기치 못한 오류가 발생했습니다."
  );
};

const setCopyRight = () => {
  const year = new Date().getFullYear();
  updateElementTextById("copyRight", `© ${year} j93es`);
};

const startCountdown = () => {
  document.getElementById("redirectMsg").textContent =
    countdown + "초 뒤에 홈페이지로 이동합니다.";

  if (countdown > 0) {
    countdown--;
    setTimeout(startCountdown, 1000);
  } else {
    window.location.replace(redirectUrl);
  }
};

window.onload = function () {
  checkQueryString();
  setStatus();
  setErrorMsg();
  startCountdown();
};
