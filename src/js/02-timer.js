import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_blue.css";
import Notiflix from 'notiflix';

const refs = {
  button:document.querySelector('button'),
  input:document.querySelector('input#datetime-picker'),
  timerEl:document.querySelector('.timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
}
refs.timerEl.style.display = 'flex';
refs.button.disabled = true;
let timeoutID = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
    // console.log("selectedDates: ", selectedDates[0])
    // const defaultDateCalendars = new Date();
    // console.log("defaultDateCalendars", defaultDateCalendars);
    // const delta = selectedDates[0].getTime() - defaultDateCalendars.getTime();
    // console.log(delta);
    if (selectedDates[0] <= options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future')
      refs.button.disabled = true
    }
    if (selectedDates[0] >= options.defaultDate) {
      {
        refs.button.disabled = false
      }
    }
  },
}

const calendar = flatpickr(refs.input, options)

refs.button.addEventListener('click', onButtonClick)

function onButtonClick() {
  timeoutID = setInterval(() => {
    updateTime()
  }, 1000)
  refs.input.disabled = true
  refs.button.disabled = true
}

function ddLeadingZero(value) {
  return String(value).padStart(2, '0')
};

//Подсчет значений
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = ddLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = ddLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = ddLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = ddLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}


function updateTime() {
  const currentTime = new Date()
  const selectedTime = new Date(refs.input.value)

  const deltaTime = selectedTime - currentTime

  if (deltaTime < 0) {
    return
  } else {
    const { days, hours, minutes, seconds } = convertMs(deltaTime)
    refs.days.textContent = `${days}`
    refs.hours.textContent = `${hours}`
    refs.minutes.textContent = `${minutes}`
    refs.seconds.textContent = `${seconds}`
  }
}