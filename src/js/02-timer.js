import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMin = document.querySelector('[data-minutes]');
const dataSec = document.querySelector('[data-seconds]');

startBtn.setAttribute(`disabled`, true);
startBtn.addEventListener('click', oncreateTimer);
let endDate = null;
let timerId = null;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      validChoice(selectedDates[0]);
    }};


function validChoice(selectedDates){
    endDate = selectedDates.getTime()
    if (selectedDates < Date.now()) {
        Notiflix.Notify.failure("Please choose a date in the future");
    } else {
        startBtn.removeAttribute('disabled')
    }};

    
function oncreateTimer(){
    timerId = setInterval(startTimer, 1000);
    startBtn.setAttribute(`disabled`, true);
    inputDate.setAttribute(`disabled`, true);
};
function startTimer(){
    const differentDate = endDate - Date.now();
    const formatDate = convertMs(differentDate);
    showDateScreen(formatDate)
    if (dataSec.textContent === '00' && dataMin.textContent === '00') {
        Notiflix.Notify.success('Time end');
      clearInterval(timerId);
  }}

 flatpickr(inputDate, options);  

 function showDateScreen({ days, hours, minutes, seconds }){
    dataSec.textContent = seconds;
    dataMin.textContent = minutes;
    dataHours.textContent = hours;
    dataDays.textContent = days;
  }
 function pad(value){
    return String(value).padStart(2, '0');
  }


  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = pad(Math.floor(ms / day));
    const hours = pad(Math.floor((ms % day) / hour));
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
  
