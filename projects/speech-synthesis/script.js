window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const words = document.querySelector('.words');
    const toggleBtn = document.getElementById('toggleBtn');

    // browser doesn't support it, just bail out and tell the user
    if (!window.SpeechRecognition) {
      toggleBtn.disabled = true;
      toggleBtn.textContent = 'Not supported in this browser';
    } else {

      const recognition = new SpeechRecognition();
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      let p = null; // current line we're writing into
      let listening = false;

      recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');

        if (!p) {
          p = document.createElement('p');
          words.appendChild(p);
        }

        p.textContent = transcript.replace(/poop|poo|shit|dump/gi, '💩');

        if (e.results[0].isFinal) {
          p = null; // start a fresh line next time
        }
      });

      // it stops itself after a few seconds of silence, so just
      // kick it back on if we're still supposed to be listening
      recognition.addEventListener('end', () => {
        if (listening) recognition.start();
      });

      toggleBtn.addEventListener('click', () => {
        if (listening) {
          listening = false;
          recognition.stop();
          toggleBtn.textContent = 'Start Listening';
          toggleBtn.classList.remove('listening');
        } else {
          listening = true;
          recognition.start();
          toggleBtn.textContent = 'Stop Listening';
          toggleBtn.classList.add('listening');
        }
      });
    }