const timer = document.querySelector('#timer');
const start = document.querySelector('.start');
const pause = document.querySelector('.pause');
const reset = document.querySelector('.reset');
const announcement = document.querySelector('.announcement');
const progressCircle = document.querySelector('.progress-circle');
const hours = document.querySelector('#hours');
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');

let timerInterval;
let totalTime = 0;
let remainingTime = 0;
let isRunning = false;
//validate input to ensure correct time values

function validateInput(input,max){
  if(input.value < 0) input.value = 0;
  if(input.value > max) input.value = max;
}
//format time in HH:MM:SS format
function formatTime(seconds){
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600)/60);
  const secs = seconds % 60;

  return `${hrs.toString().padStart(2,'0')}:${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`
}


//update the timer display
function updateTimer(){
  remainingTime--;
  timer.textContent = formatTime(remainingTime);
  updateProgressBar();
  if(remainingTime <= 0){
    clearInterval(timerInterval);
    isRunning = false;
    start.disabled = false;
    pause.disabled = true;
    reset.disabled = false;
    // Show the announcement and hide the timer
    announcement.classList.add('display');
    timer.style.display = 'none';
  }
}

//start the timer
function startTimer(){
  if(!isRunning){
    const hrs = parseInt(hours.value) || 0;
    const mins = parseInt(minutes.value) || 0;
    const secs = parseInt(seconds.value) || 0;
    totalTime = hrs *3600 + mins *60 +secs;
    if(remainingTime === 0 && totalTime >0){
      remainingTime = totalTime;
    }

    if(remainingTime >0){
      isRunning = true;
      start.disabled = true;
      pause.disabled = false;
      reset.disabled = false;

      timerInterval = setInterval(updateTimer,1000)
    }
  }


}


function pauseTimer(){
  if(isRunning){
    clearInterval(timerInterval);
    isRunning = false;
    pause.disabled = true;
    start.disabled = false;
    
  }
}

function resetTimer(){
  clearInterval(timerInterval);
  remainingTime = 0;
  totalTime = 0;
  isRunning = false;

  timer.textContent = '00:00:00';
  start.disabled = false;
  pause.disabled = true;
  reset.disabled = true;

   // Hide the announcement and show the timer
   announcement.classList.remove('display');
   timer.style.display = 'block';

  updateProgressBar(0)
  document.querySelector('#hours').value = '';
  document.querySelector('#minutes').value = '';
  document.querySelector('#seconds').value = '';
}

function updateProgressBar(progress = (remainingTime>0 ?(1 - remainingTime / totalTime) *100 :100)){
  progressCircle.style.background = `conic-gradient(#00aedf ${progress}%,#ddd ${progress}%)`
}

start.addEventListener('click',startTimer)
pause.addEventListener('click',pauseTimer)
reset.addEventListener('click',resetTimer)


