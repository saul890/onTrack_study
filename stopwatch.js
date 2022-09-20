// Class for state of the stopwatch
class State {
    constructor(startTimestamp, difference, suspended) {
      this.startTimestamp = startTimestamp;
      this.difference = difference;
      this.suspended = suspended;
    }
  
    static ready() {
      return new State(null, 0, 0);
    }
  }
  
class Stopwatch {
  constructor(state) {
    // Initial settings for the stopwatch
    document.getElementById("stop").style.display = "none";
    this.state = state;
    this.requestAnimationId = null;

    // When start button is pressed, run the start function
    this.handleClickStart = this.handleClickStart.bind(this);
    document
      .getElementById("start")
      .addEventListener("click", this.handleClickStart);

    // When stop button is pressed, run the stop function
    this.handleClickStop = this.handleClickStop.bind(this);
    document
      .getElementById("stop")
      .addEventListener("click", this.handleClickStop);

    // When reset button is pressed, run the reset function
    this.handleClickReset = this.handleClickReset.bind(this);
    document
      .getElementById("reset")
      .addEventListener("click", this.handleClickReset);
    this.tick = this.tick.bind(this);
    this.render();
  }
  
  static ready() {
    return new Stopwatch(State.ready());
  }

  // Render the time elapsed
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
  
  // Time from when the start button is pressed until now 
  tick() {
    this.setState({
      difference: new Date() - this.state.startTimestamp
    });
    this.requestAnimationId = requestAnimationFrame(this.tick);
  }
    
  // Function for play button
  handleClickStart() {
    document.getElementById("start").style.display = "none";
    document.getElementById("stop").style.display = "block";
    if (this.state.startTimestamp) {
      // Prevent multi clicks on start
      return;
    }
    this.setState({
      startTimestamp: new Date() - this.state.suspended,
      suspended: 0
    });
    this.requestAnimationId = requestAnimationFrame(this.tick);
  }
  
  // Function for pause button
  handleClickStop() {
    document.getElementById("stop").style.display = "none";
    document.getElementById("start").style.display = "block";
    // Stop the animation and display the time
    cancelAnimationFrame(this.requestAnimationId);
    this.setState({
      startTimestamp: null,
      suspended: this.state.difference
    });
  }

    // Function for reset button
  handleClickReset() {
    // Stop the animation and reset the time
    document.getElementById("stop").style.display = "none";
    document.getElementById("start").style.display = "block";
    cancelAnimationFrame(this.requestAnimationId);
    this.setState(State.ready());
  }
    
  // Calculate the time and display it as text content
  render() {
    const { difference } = this.state;
    const seconds = (difference ? Math.floor(difference/(1000) % 60) : 0)
      .toString()
      .padStart(2, "0");
    const minutes = (difference ? Math.floor(difference/(60*1000) % 60) : 0)
      .toString()
      .padStart(2, "0");
    const hours = (difference ? Math.floor(difference/(3600*1000) % 60) : 0)
      .toString()
      .padStart(2, "0");

    // Render screen
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
  }
}
  
const STOPWATCH = Stopwatch.ready();

// Youtube tutorial https://www.youtube.com/watch?v=yhhFXNHKpsk