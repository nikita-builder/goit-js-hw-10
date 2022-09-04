const startButton = document.querySelector('[data-start]');
const endButton = document.querySelector('[data-stop]');

startButton.addEventListener('click', changeBodyColor);
endButton.addEventListener('click', stopChangeBodyColor);

let timerId = null;

function changeBodyColor(color) {
  timerId = setInterval(() => {
    const randomColor = getRandomHexColor();
    document.body.style.background = randomColor;
    startButton.setAttribute('disabled', true);
  }, 1000);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function stopChangeBodyColor() {
  startButton.removeAttribute('disabled');
  clearInterval(timerId);
}
