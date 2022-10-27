// Setting up variables for our HTML elements using DOM selection
const form = document.getElementById("taskform");
const button = document.querySelector("#taskform > button"); // Complex CSS query
const tasklist = document.getElementById("tasklist");
const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDateInput");
const estimatedTimeInput = document.getElementById("estimatedTimeInput");
const priorityInput = document.getElementById("priorityInput");
const submitButton = document.getElementById("submit-button");

// Event listener for Button click
submitButton.addEventListener("click", function (event) {
    event.preventDefault(); // Not as necessary for button, but needed for form submit

    let task = taskInput.value; // Task name value
    
    let unformattedDate = dueDateInput.value; // Due date value
    let date =  unformattedDate[8] + unformattedDate[9]+'/'+ unformattedDate[5]+ unformattedDate[6]; // formatted date

    let time = estimatedTimeInput.value; // Estimated time value

    let priority = priorityInput.value; // Priority value

    // If invalid input, highlight the border in red
    if (taskInput.value == ""){
        taskInput.classList.add('red');
    }
    if (taskInput.value != ""){
        taskInput.classList.remove('red');
    }

    if (dueDateInput.value == ""){
        dueDateInput.classList.add('red');
    }
    if (dueDateInput.value != ""){
        dueDateInput.classList.remove('red');
    }

    if (estimatedTimeInput.value == ""){
        estimatedTimeInput.classList.add('red');
    }
    if (estimatedTimeInput.value != ""){
        estimatedTimeInput.classList.remove('red');
    }

    if (priorityInput.value == ""){
        priorityInput.classList.add('red');
    }
    if (priorityInput.value != ""){
        priorityInput.classList.remove('red');
    }
    // If valid input, add the task to the task list
    if (taskInput.value != "" && dueDateInput.value != "" && estimatedTimeInput.value != "" && priorityInput.value != ""){
        addTask(task, date, time, priority, false);
    }

    console.log(taskList);
})

// Create an empty array to store our tasks
var taskList = [];

// Function for saving the task
function addTask(title, dueDate, estimatedTime, priorityRating, checked) {
    var task = {
        id: Date.now(),
        title: title,
        dueDate: dueDate,
        estimatedTime: estimatedTime,
        priorityRating: priorityRating,
        checked: checked
    };

    // Add the task to our array of tasks
    taskList.push(task);
    
    window.localStorage.setItem(task.id, JSON.stringify({ 
        title: title,
        dueDate: dueDate,
        estimatedTime: estimatedTime,
        priorityRating: priorityRating,
        checked: checked }));

    // Separate the DOM manipulation from the object creation logic
    renderTask(task);
}

// when there are elements in the local storage, get them by index number
for (var i = 0; i <= localStorage.length - 1; i++) {
    let key = localStorage.key(i);
    getFromLocalStorage(key)
}

// Render tasks from local storage
function getFromLocalStorage(taskId) {
    let task = JSON.parse(window.localStorage.getItem(taskId));
    renderTask(task);
  }



// Function to display the item on the page
function renderTask(task) {
    // Empty state
    updateEmpty();

    // For each item item create a new unordered list
    let item = document.createElement("ul");

    // Add class of .tasks
    item.classList.add("tasks");

    // Set data-id attribute to task.id
    item.setAttribute('date-id', task.id)

    // Content to be displayed on the page
    item.innerHTML = "<p>" + "<li class=task_title>" + task.title + task.priorityRating + "</li>" + "<div id='extraInfo'>" + "<li class=task_due>" + task.dueDate + "</li>" + "<li class=task_time>" + task.estimatedTime + " min" + "</li>" + "<li class=task_priority>" + "</div>" + "<p>";
    
    // Append each item to the task list
    tasklist.appendChild(item);

    // Setup delete button DOM elements
    let delButton = document.createElement("button");
    let delButtonText = document.createTextNode("x");
    delButton.appendChild(delButtonText);
    delButton.classList.add("del-button");

    // Setup checkbox button DOM elements
    let checkbox = document.createElement('input');
    checkbox.classList.add("done")
    checkbox.type = "checkbox";

    item.appendChild(checkbox); // Adds a checkbox to every task
    item.appendChild(delButton); // Adds a delete button to every task
    

    // Event listener for checkbox change
    checkbox.addEventListener("change", function(event){
        if (this.checked) {
            item.classList.add("blue") // if checked, add blue styling
        } else {
            item.classList.remove("blue") // if unchecked, remove blue styling
        }
    });

    // Event listener for delete button
    delButton.addEventListener("click", function (event) {
        event.preventDefault();

        // this removes the item from the consoles array
        let id = event.target.parentElement.getAttribute('date-id');
        let index = taskList.findIndex(task => task.id === Number(id));
        window.localStorage.removeItem(id);
        removeItemFromArray(taskList, index);
        // Remove the task item from the page when button clicked
        item.remove();

    });

    // Clear the value of the input once the task has been added to the page
    form.reset();
}

// Function removing item from array
function removeItemFromArray(arr, index) {
    if (index > -1) {
        arr.splice(index, 1)
    }
    return arr;
}

// Function to hide and show empty states
function updateEmpty(){
    if (localStorage.length > 0) {
        document.getElementById("whenEmpty").style.display = 'none';
    } else {
        document.getElementById("whenEmpty").style.display = 'block';
    }
}