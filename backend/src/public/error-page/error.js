const allowedErrorStatus = [400, 403, 404, 429, 500];
const queryStatusKey = "j93es-status";
const queryMessageKey = "j93es-message";

let countdown = 5;
const redirectUrl = "https://j93.es";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const statusCode = urlParams.get(queryStatusKey);
const message = urlParams.get(queryMessageKey);

const checkQueryString = () => {
  if (!allowedErrorStatus.includes(Number(statusCode))) {
    const url = new URL(window.location.href);
    url.searchParams.set(queryStatusKey, "400");
    url.searchParams.set(queryMessageKey, "잘못된 요청입니다.");
    console.log(url);
    window.location.replace(url);
  }
};

const setStatus = () => {
  document.getElementById("statusCode").textContent = statusCode + " Error";
};

const setErrorMsg = () => {
  document.getElementById("message").textContent =
    message || "예기치 못한 오류가 발생했습니다.";
};

const startCountdown = () => {
  document.getElementById("redirectMsg").textContent =
    countdown + "초 뒤에 홈페이지로 이동합니다.";

  if (countdown > 0) {
    countdown--;
    setTimeout(startCountdown, 1000);
  } else {
    window.location.href = redirectUrl;
  }
};

window.onload = function () {
  checkQueryString();
  setStatus();
  setErrorMsg();
  startCountdown();
};
