// Store html content areas as variables
const content = document.getElementById("searchResult");

// Variable for form
const form = document.getElementById("searchForm")

// Variable for input field (word being searched)
const inputField = document.getElementById("searchWord")

// Variable for submit button
const submitBtn = document.getElementById("submitWord")

// Create the request for data collection using API
var request = new XMLHttpRequest();

let defCount = 1;

//function getData(){
submitBtn.addEventListener("click", function(){
    defCount = 1;
    content.innerHTML = "";
    let wordInput = inputField.value;
    //console.log(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput}`)
    request.open('GET', `https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput}`);

    request.onload = function (){

        // Check the outcome of the request
        if(request.status >= 200 && request.status < 400) {

            // Create variable to store response data
            let data = JSON.parse(this.response);

            // Create an element for the heading (entered word)
            let theWord = document.createElement('h2');
            theWord.classList.add("theWord");

            // Changing first letter to uppercase
            theWord.textContent = data[0].word[0].toUpperCase() + data[0].word.substring(1);

            // Append the word to the content area
            content.appendChild(theWord);

            // If successful, process the data
            data.forEach(function(define){
                renderDefine(define)
            });

           

        } else {
            // If unsuccessful, inform user
            console.log("API ERROR")
        }
}


// Send request to API server
request.send();

});


// add an event listener to the enter key
inputField.addEventListener("keypress", function(event){
    // targeting the enter key
    if (event.key == "Enter"){
        event.preventDefault();
        // trigger the submite button
        document.getElementById("submitWord").click();
    }
});


// Define function to display data
function renderDefine(define){

    // Empty array for synonyms to be pushed to
    var synonymList = []
    // For loop pushing synonyms into synonymList array
    for(i=0 ; i<define.meanings[0].synonyms.length; i++){
        synonymList.push(define.meanings[0].synonyms[i]);
    }
    
    // Create a div for the card
    let card = document.createElement('div');
    card.setAttribute('class', 'card');

    // Create a smaller heading element for short definition
    let theDefinition = document.createElement('h5');
    theDefinition.classList.add("theDefinition");
    

    theDefinition.textContent = `${defCount}.       ` + define.meanings[0].definitions[0].definition;

    // Create a paragraph element for synonyms
    let theSynonyms = document.createElement('p');
    if (synonymList.length != 0){
        theSynonyms.textContent = "Synonyms: " + synonymList.join(", ");
    }
    
    theSynonyms.classList.add("theSynonyms");
    
    // Append the definitions and synonyms to the card
    card.appendChild(theDefinition);
    card.appendChild(theSynonyms);

    // Append to content area
    content.appendChild(card);

    defCount += 1;
}