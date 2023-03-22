import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const daysCounterEl = document.querySelector('[data-days]');
const hoursCounterEl = document.querySelector('[data-hours]');
const minutesCounterEl = document.querySelector('[data-minutes]');
const secondsCounterEl = document.querySelector('[data-seconds]');
startBtn.disabled = true;
startBtn.addEventListener('click', onStartBtn);

let timerIntervalId = null;
let currentTime = null;
let selectedTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTime = selectedDates[0];
    currentTime = Date.now();
    // console.log(selectedTime.getTime());
    // console.log(currentTime);
    if (selectedTime.getTime() < currentTime) {
      Notiflix.Notify.failure('Please choose a date in the future', {
        width: '900px',
        svgSize: '320px',
        fontSize: '80px',
        position: 'center-center',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function onStartBtn() {
  timerIntervalId = setInterval(() => {
    currentTime = Date.now();
    if (selectedTime.getTime() - currentTime > 0) {
      const timerCount = selectedTime.getTime() - currentTime;
      const { days, hours, minutes, seconds } = convertMs(timerCount);
      daysCounterEl.textContent = days;
      hoursCounterEl.textContent = hours;
      minutesCounterEl.textContent = minutes;
      secondsCounterEl.textContent = seconds;
    } else if (selectedTime.getTime() - currentTime <= 0) {
      clearInterval(timerIntervalId);
    }
    return;
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
