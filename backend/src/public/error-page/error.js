let countdown = 5;
const redirectUrl = "https://j93.es";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const statusCode = urlParams.get("j93es-status");
const message = urlParams.get("j93es-message");

function setStatus() {
  if (Number(statusCode) < 400 || Number(statusCode) > 500) {
    statusCode = "400";
  }

  document.getElementById("statusCode").textContent = statusCode + " Error";
}

function setErrorMsg() {
  document.getElementById("message").textContent =
    message || "예기치 못한 오류가 발생했습니다.";
}

function startCountdown() {
  document.getElementById("redirectMsg").textContent =
    countdown + "초 뒤에 홈페이지로 이동합니다.";

  if (countdown > 0) {
    countdown--;
    setTimeout(startCountdown, 1000);
  } else {
    window.location.href = redirectUrl;
  }
}

window.onload = function () {
  setStatus();
  setErrorMsg();
  startCountdown();
};
