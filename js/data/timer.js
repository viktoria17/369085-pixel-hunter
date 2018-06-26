export default class Timer {
  constructor({seconds, timeEndedCallback}) {
    this.seconds = seconds;
    this.secondsLeft = this.seconds;
    this.timeEndedCallback = timeEndedCallback;
  }

  start() {
    this.timer = setInterval(() => {
      // First second of timer tick is not recorded
      if (this.secondsLeft === 1) {
        this.timeEndedCallback();
        clearInterval(this.timer);
      }
      this.tick();
    }, 1000);
  }

  tick() {
    this.secondsLeft--;
  }
}
