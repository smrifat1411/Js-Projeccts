class Timer {
  constructor(inputDuration, btnStart, btnPause, callbacks) {
    this.durationInput = inputDuration;
    this.startBtn = btnStart;
    this.pauseBtn = btnPause;
    this.startBtn.addEventListener("click", this.start);
    this.pauseBtn.addEventListener("click", this.pause);

    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }
  }

  start = () => {
    if (this.onStart) {
      this.onStart(this.remainTime);
    }

    this.tick();
    this.intervalId = setInterval(this.tick, 10);
  };
  tick = () => {
    if (this.remainTime <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      this.remainTime = this.remainTime - 0.01;
      if (this.onTick) {
        this.onTick(this.remainTime);
      }
    }
  };

  pause = () => {
    clearInterval(this.intervalId);
  };

  get remainTime() {
    return parseFloat(this.durationInput.value);
  }

  set remainTime(time) {
    this.durationInput.value = time.toFixed(2);
  }
}

const durationInput = document.querySelector("#timeField");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const circle = document.querySelector("circle");
const perimeter = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

let totalTime;

const callbackFunc = {
  onStart(val) {
    totalTime = val
  },
  onTick(timeRemaining) {
    circle.setAttribute(
      "stroke-dashoffset",
      (perimeter * timeRemaining) / totalTime - perimeter
    );
  },
  onComplete() {
    console.log("Timer is completed");
  },
};

const myTimer = new Timer(
  durationInput,
  startButton,
  pauseButton,
  callbackFunc
);

// temporary

// let a = {name:"alif"}

// let b =a;

// b.name = "rifat"

// console.log(a);
// console.log(b)

// let a = 9;
// let b = a;

// b = "hbckjnskc"

// console.log(a);
// console.log(b);
