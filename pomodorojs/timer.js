// Setting variables for DOM elements
const el = document.querySelector(".clock");
const bell = document.querySelector("audio");
const mindiv = document.querySelector(".mins");
const secdiv = document.querySelector(".secs");

// setting counts for session and cycles
let count = 0;
let countTwo = 0;

// Setting up start button
const startBtn = document.querySelector(".start");
sessionStorage.setItem("btn", "focus");

let initial, totalsecs, perc, paused, mins, seconds; // Initialising variables

// Event listener for the start focus button
startBtn.addEventListener("click", () => {
    let btn = sessionStorage.getItem("btn"); // Get value from session storage via btn key

    if (btn === "focus") {
        mins = +sessionStorage.getItem("focusTime") || 25; // If btn value is 'focus', set mins to focus value
    } else if (btn === "break") {
        mins = +sessionStorage.getItem("breakTime") || 5;  // If btn value is 'break', set mins to break value
    }
    else {
        mins = +sessionStorage.getItem("restTime") || 15;  // If btn value is 'rest', set mins to rest value
    }

    // Setting timer to decrease on start button click
    seconds = mins * 60;
    totalsecs = mins * 60;
    setTimeout(decremenT(), 60);
    startBtn.style.transform = "scale(0)";
    paused = false;
});

// function to decrease timer
function decremenT() {
    mindiv.textContent = Math.floor(seconds / 60);
    secdiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;

    // If the timer hasn't reached run out, keep counting down 
    if (seconds > 0) {
        perc = Math.ceil(((totalsecs - seconds) / totalsecs) * 100);
        seconds--;
        initial = window.setTimeout("decremenT()", 1000);

    // If the timer has run out, set timer to 00:00 and get the button value from session storage
    } else {
        mins = 00;
        seconds = 00;
        let btn = sessionStorage.getItem("btn");
        
        // If the button value is 'focus'
        if (btn === "focus"){
            count = count + 1; 
            updateSet(count); // Add one to the session count once a focus mode has been completed
            startBtn.classList.add("break"); 
            
            // When the session count is divisible by 4 set button value to rest
            if (count % 4 == 0){
                sessionStorage.setItem("btn", "rest");
                startBtn.textContent = "Take rest";
            }

            // When the session count is not divisible by 4 set button value to break
            else if (count % 4 != 0){
                sessionStorage.setItem("btn", "break");
                startBtn.textContent = "Start break"; 
            }
            
        // When the button value pressed is rest
        } else if (btn === "rest"){
            count = 0; // Reset the session count to 0
            updateSet(count); 
            countTwo = countTwo + 1 // Add one to the cycle count
            updateGame(countTwo);
            startBtn.classList.remove("break");
            startBtn.textContent = "Start focus"; 
            sessionStorage.setItem("btn", "focus"); // set button value to focus

        // When the button value pressed is break
        } else if (btn === "break") {
            startBtn.classList.remove("break");
            startBtn.textContent = "Start focus";
            sessionStorage.setItem("btn", "focus"); // Set button value to focus
        }
        startBtn.style.transform = "scale(1)";
    }

}

// Function for session count
function updateSet(count){
    const sets = document.querySelector("#sets");
    sets.innerHTML = count;
}

// Function for cycle count
function updateGame(countTwo){
    const games = document.querySelector("#games");
    games.innerHTML = countTwo;
}

