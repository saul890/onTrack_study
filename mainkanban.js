import '../public/jkanban/jkanban.min.js'



// Empty array of task titles
let titles = [];

// Go through local storage and get titles
for (var i = 0; i <= localStorage.length - 1; i++) {
    let key = localStorage.key(i);
    getFromLocalStorage(key);
    updateEmpty();
}

// Push titles to the title array
function getFromLocalStorage(taskId) {
    task = JSON.parse(window.localStorage.getItem(taskId));
    titles.push({"title": task.title});
  }

// Kanban library code from jkanban
var kanban = new jKanban({
    element          : '#kanban_container',                          // selector of the kanban container
    gutter           : '15px',                                       // gutter of the board
    widthBoard       : '250px',                                      // width of the board
    responsivePercentage: false,                                    // if it is true I use percentage in the width of the boards and it is not necessary gutter and widthBoard
    dragItems        : true,                                        // if false, all items are not draggable
    boards           : [
        {
            "id"    : "_todo",
            "title" : "Not Started",
            "item"  : titles, // Tasks from task list loaded
        },
        {
            "id"    : "_working",
            "title" : "In Progress",
            "item"  : []
        },
        {
            "id"    : "_done",
            "title" : "Done",
            "item"  : []
        }
        
    ],                                           // json of boards
    dragBoards       : true,                                         // the boards are draggable, if false only item can be dragged
    itemAddOptions: {
        enabled: false,                                              // add a button to board for easy item creation
        content: '+',                                                // text or html content of the board button   
        class: 'kanban-title-button btn btn-default btn-xs',         // default class of the button
        footer: false                                                // position the button on footer
    },
    itemHandleOptions: {
        enabled             : false,                                 // if board item handle is enabled or not
        handleClass         : "item_handle",                         // css class for your custom item handle
        customCssHandler    : "drag_handler",                        // when customHandler is undefined, jKanban will use this property to set main handler class
        customCssIconHandler: "drag_handler_icon",                   // when customHandler is undefined, jKanban will use this property to set main icon handler class. If you want, you can use font icon libraries here
        customHandler       : "<span class='item_handle'>+</span> %title% "  // your entirely customized handler. Use %title% to position item title 
                                                                             // any key's value included in item collection can be replaced with %key%
    },
    click            : function (el) {},                             // callback when any board's item are clicked
    context          : function (el, event) {},                      // callback when any board's item are right clicked
    dragEl           : function (el, source) {},                     // callback when any board's item are dragged
    dragendEl        : function (el) {},                             // callback when any board's item stop drag
    dropEl           : function (el, target, source, sibling) {
        const allBoards = document.querySelector(".kanban-container");
        // Select the last board/child in the container
        const lastBoard = allBoards.lastChild;
        // Get the ID of that last board/child
        var dataID = lastBoard.getAttribute('data-id');
        if (target == lastBoard.childNodes[1]){
           el.classList.add('full') // Add blue fill
        }
        else{
            el.classList.remove('full')  // Remove blue fill
        }
    },    // callback when any board's item drop in a board
    dragBoard        : function (el, source) {},                     // callback when any board stop drag
    dragendBoard     : function (el) {},                             // callback when any board stop drag
    buttonClick      : function(el, boardId) {},                     // callback when the board's button is clicked
    propagationHandlers: [],                                         // the specified callback does not cancel the browser event. possible values: "click", "context"   
}); 



// Add a board
var addBoardDefault = document.getElementById('addDefault');
addBoardDefault.addEventListener('click', function () {
    kanban.addBoards(
        [{
            'id' : 'New',
            'title'  : 'New Title',
            'item'  : []
        }]
    )
    const theTitles = document.querySelectorAll('.kanban-title-board');

// Change the text of multiple elements with a loop
theTitles.forEach(element => {
  element.contentEditable = "true";
});

});


// Variable for the remove button
var removeButton = document.getElementById('removeButton');

removeButton.addEventListener('click',function(){
    // Select the container/parent of boards
    const allBoards = document.querySelector(".kanban-container");
    // Select the last board/child in the container
    const lastBoard = allBoards.lastChild;
    // Get the ID of that last board/child
    var dataID = lastBoard.getAttribute('data-id');
    // Remove the last board using library function
    kanban.removeBoard(dataID);
});

// Get a NodeList of all .demo elements
const theTitles = document.querySelectorAll('.kanban-title-board');

// Change the text of multiple elements with a loop
theTitles.forEach(element => {
  element.contentEditable = "true";
});


function updateEmpty(){
    if (localStorage.length > 0) {
        document.getElementById("whenEmpty").style.display = 'none';
    } else {
        document.getElementById("whenEmpty").style.display = 'block';
    }
}