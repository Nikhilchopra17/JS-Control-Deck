// ---------- Live Clock ----------
  const secondHand = document.querySelector('.second-hand');
  const minsHand = document.querySelector('.min-hand');
  const hourHand = document.querySelector('.hour-hand');
  const digitalTime = document.getElementById('digitalTime');

  function setDate() {
    const now = new Date();

    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    const mins = now.getMinutes();
    const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
    minsHand.style.transform = `rotate(${minsDegrees}deg) scaleX(0.75)`;

    const hour = now.getHours();
    const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg) scaleX(0.55)`;

    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    digitalTime.textContent =
      `${displayHour}:${mins < 10 ? '0' : ''}${mins}:${seconds < 10 ? '0' : ''}${seconds} ${ampm}`;
  }

  setInterval(setDate, 1000);
  setDate();

  // ---------- Countdown Timer ----------
  let countdown;
  const timerDisplay = document.querySelector('.display__time-left');
  const endTime = document.querySelector('.display__end-time');
  const buttons = document.querySelectorAll('[data-time]');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');

  const MAX_MINUTES = 999;

  // Web Audio API beep — no external sound file needed
  let audioCtx;
  function playAlarm() {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const now = audioCtx.currentTime;
      const beepTimes = [0, 0.3, 0.6];
      beepTimes.forEach(offset => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now + offset);
        gain.gain.setValueAtTime(0.0001, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.3, now + offset + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.25);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.27);
      });
    } catch (err) {
      console.warn('Audio playback unavailable:', err);
    }
  }

  function showCompletionModal() {
    modalOverlay.classList.add('active');
    playAlarm();
  }

  modalClose.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
  });
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) modalOverlay.classList.remove('active');
  });

  function timer(seconds) {
    clearInterval(countdown);
    modalOverlay.classList.remove('active');

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      if (secondsLeft < 0) {
        clearInterval(countdown);
        displayTimeLeft(0);
        showCompletionModal();
        return;
      }
      displayTimeLeft(secondsLeft);
    }, 1000);
  }

  function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
  }

  function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  buttons.forEach(button => button.addEventListener('click', function () {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
  }));

  document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let mins = parseFloat(this.minutes.value);
    if (!mins || mins <= 0) {
      this.reset();
      return;
    }
    if (mins > MAX_MINUTES) mins = MAX_MINUTES;
    timer(mins * 60);
    this.reset();
  });