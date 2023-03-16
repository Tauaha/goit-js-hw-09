const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId;

startBtn.addEventListener('click', handlerStartRandomColor);
stopBtn.addEventListener('click', handlerStopRandomColor);


function handlerStartRandomColor (){
    if(!timerId){
        timerId = setInterval(changeColor, 1000);
        startBtn.disabled = true;
    }
}

 function changeColor(e){
    const body = document.querySelector('body');
    body.style.backgroundColor = getRandomHexColor();   
 };

 function handlerStopRandomColor(){
    clearInterval(timerId);
    timerId = null;
    startBtn.disabled = false;
 };


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
