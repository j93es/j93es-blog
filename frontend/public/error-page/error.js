let countdown = 5;
const redirectUrl = "/";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const statusCode = urlParams.get("status");
const message = urlParams.get("message");

function setStatus() {
  document.getElementById("statusCode").textContent = statusCode + " Error";
}

function setErrorMsg() {
  document.getElementById("message").textContent = message;
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
