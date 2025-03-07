const queryMessageKey = "j93es-message";
const redirectUrl = "/";
let countdown = 5;
const queryString = window.location.search;
const message = new URLSearchParams(queryString).get(queryMessageKey);

const updateElementTextById = (id, text) => {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = text;
  }
};

const setErrorMsg = () => {
  updateElementTextById(
    "message",
    message || "예기치 못한 오류가 발생했습니다."
  );
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
  setErrorMsg();
  startCountdown();
};
