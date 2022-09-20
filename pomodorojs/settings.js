// Variables for HTML DOM elements
const focusTimeInput = document.querySelector("#focusTime");
const breakTimeInput = document.querySelector("#breakTime");
const restTimeInput = document.querySelector("#restTime");
const pauseBtn = document.querySelector(".pause");
const focusValue = document.getElementById("focusValue");
const breakValue = document.getElementById("breakValue");
const restValue = document.getElementById("restValue");
const addMin = document.querySelector("#restTime");

// Default values for pomodoro timer
focusTimeInput.value = 25;
breakTimeInput.value = 5;
restTimeInput.value = 15;

// Event listener for when the start focus button is pressed
document.querySelector(".start").addEventListener("click", (e) => {
  e.preventDefault();

  // Storing user input in the session storage
  sessionStorage.setItem("focusTime", focusTimeInput.value);
  sessionStorage.setItem("breakTime", breakTimeInput.value);
  sessionStorage.setItem("restTime", restTimeInput.value);
});

// Event listener for when the reset button is pressed
document.querySelector(".reset").addEventListener("click", () => {
  startBtn.style.transform = "scale(1)"; // Display the start focus button again
  clearTimeout(initial); // Clear the timer
  mindiv.textContent = "00"; 
  secdiv.textContent = "00"; // Display timer as 00:00 again
});

// Event listener for when the pause button is pressed
pauseBtn.addEventListener("click", () => {
  if (paused === undefined) {
    return;
  }

  // If pause button isn't pressed, show the pause button
  if (paused) {
    paused = false;
    initial = setTimeout("decremenT()", 60);
    pauseBtn.textContent = "pause";
    pauseBtn.classList.remove("resume");
  } 

  // If pause button is pressed, pause the timer and show the resume button
  else {
    clearTimeout(initial);
    pauseBtn.textContent = "resume";
    pauseBtn.classList.add("resume");
    paused = true;
  }
});

// Show the user the value of their slider input
function onFocusInput(sliderValue){
  focusValue.innerHTML = sliderValue.value;
}
function onBreakInput(sliderValue){
  breakValue.innerHTML = sliderValue.value;
}
function onRestInput(sliderValue){
  restValue.innerHTML = sliderValue.value;
}