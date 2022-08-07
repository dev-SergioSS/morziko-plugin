let letter = document.querySelector('.letter');
let btnStart = document.querySelector('.btn-start');
let btnStop = document.querySelector('.btn-stop');
let btnsSetTime = document.querySelectorAll('.btn-set-time');

let timerDigits = document.querySelector('.timer-digits');
let timerCircle = document.querySelector('.timer-circle');
let timerDot = document.querySelector('.dot');

const soundStart = document.querySelector('.sound-start');
const soundEnd = document.querySelector('.sound-end');

const alphabet = 'АБВГДЕЄЖЗІЇКЛМНОПРСТУФХЦЧШЩЮЯ';
let circleLenth = 698;

let startTimerValue;
let interval;
let timer;

btnsSetTime.forEach((btn) =>
  btn.addEventListener('click', (e) => {
    let newTime;

    if (e.currentTarget.classList.contains('inc') && e.currentTarget.classList.contains('active')) {
      newTime = startTimerValue + 10;
    }
    if (e.currentTarget.classList.contains('dec') && e.currentTarget.classList.contains('active')) {
      if (startTimerValue > 30) {
        newTime = startTimerValue - 10;
      } else {
        newTime = 30;
      }
    }

    localStorage.setItem('timerValue', newTime);
    setStartTimerValue();
  }),
);

btnStart.addEventListener('click', () => {
  clearInterval(interval);
  playSound(soundStart);

  // rundom letter
  let index = Math.floor(Math.random() * alphabet.length);
  letter.innerHTML = alphabet[index];
  letter.classList.add('active');

  // set start position circle & Dot
  timerCircle.style.strokeDashoffset = circleLenth * 2;
  timerDot.classList.add('active');
  timerDot.style.transform = 'rotate(-360deg)';
  btnsSetTime.forEach((btn) => btn.classList.remove('active'));

  // set start timer & run
  timer = startTimerValue;
  timerDigits.innerHTML = timer;
  interval = setInterval(handleTimer, 1000);
});

btnStop.addEventListener('click', () => {
  letter.innerHTML = '?';
  stopTimer();
});

function setStartTimerValue() {
  startTimerValue = +localStorage.getItem('timerValue') || 120;
  timerDigits.innerHTML = startTimerValue;
}

function handleTimer() {
  if (timer > 0) {
    timer -= 1;
    timerDigits.innerHTML = timer;
    timerCircle.style.strokeDashoffset = circleLenth + (circleLenth * timer) / startTimerValue;
    timerDot.style.transform = `rotate(-${(360 / startTimerValue) * timer}deg)`;
  }
  if (timer == 0) {
    playSound(soundEnd);
    stopTimer();
    if (window.navigator && window.navigator.vibrate) {
      navigator.vibrate(300);
    }
  }
}

function playSound(sound) {
  sound.volume = 1;
  sound.play();
}

function stopTimer() {
  clearInterval(interval);
  setStartTimerValue();
  timerCircle.style.strokeDashoffset = circleLenth;
  btnsSetTime.forEach((btn) => btn.classList.add('active'));
  timerDot.classList.remove('active');
  //   timerDot.style.transform = 'rotate(0deg)'; 0 = Dot рух. разом з промінем
  timerDot.style.transform = 'rotate(-360deg)';
  letter.classList.remove('active');
}

setStartTimerValue();
