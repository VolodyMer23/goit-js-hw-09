const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

console.log(startBtn);

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);
let intervalTime = 1000;
let intervalId = null;

function onStartClick() {
  startBtn.disabled = true;

  document.body.style.backgroundColor = getRandomHexColor();

  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, intervalTime);
}

function onStopClick() {
  if (intervalId) {
    startBtn.disabled = false;
    clearInterval(intervalId);
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
