// =====================
// Variable Declarations
// =====================
var numSquares = 6;
var colours = [];
var pickedColour;
var h1 = document.querySelector("h1");
var colourDisplay = document.getElementById("colourDisplay");
var messageDisplay = document.querySelector("#message");
var modeButtons = document.querySelectorAll(".mode");
var squares = document.querySelectorAll(".square");
var resetButton = document.querySelector("#reset");

// Run Game Initialise
init();

// =====================
// Function Declarations
// =====================

// Initialise Game
function init(){
    setupModeButtons();
    setupSquares();
    reset();
}

// Setup Game Modes
function setupModeButtons(){
    for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            // Remove class from both Mode buttons
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            // Add 'selected' class to clicked Mode button
            this.classList.add("selected");
            // Determine number of squares to play game with
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            reset();
        });
    }
}

// Generate Array of Random Colours
function generateRandomColours(num){
    // Make an empty array
    var arr = [];
    // Add num random colours to array
    for(var i = 0; i < num; i++){
        // Create random colour and push into arr
        arr.push(randomColour());
    }
    // Return array of random colours
    return arr;
}

// Generate Random RGB Colour
function randomColour(){
    // Pick a red from 0 to 255
    var red = Math.round(Math.random() * 255);
    // Pick a green from 0 to 255
    var green = Math.round(Math.random() * 255);
    // Pick a blue from 0 to 255
    var blue = Math.round(Math.random() * 255);
    // Concatenate and return RGB string
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}

// Pick Random Colour from Colours Array
function pickColour(){
    var random = Math.floor(Math.random() * colours.length);
    return colours[random];
}

// Add Event Listeners to Squares & check if clickedColour = pickedColour
function setupSquares(){
    for(var i = 0; i < squares.length; i++){
    squares[i].addEventListener("click", function(){
        var clickedColour = this.style.backgroundColor;
        if(clickedColour === pickedColour){
            gameWin();
            messageDisplay.textContent = "Correct!";
            resetButton.textContent = "Play Again?";
        } else {
            this.style.backgroundColor = "#232323";
            messageDisplay.textContent = "Try Again";
            }
        });
    }
}

function gameWin(){
    h1.style.backgroundColor = pickedColour;
    for(var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = pickedColour;
    }
}

// Reset Game
function reset(){
    // Generate new random colours
    colours = generateRandomColours(numSquares);
    // Pick colour from random colours
    pickedColour = pickColour();
    // Update text content of colourDisplay to match pickedColour
    colourDisplay.textContent = pickedColour;
    // Update squares to new colours 
    for (var i = 0; i < squares.length; i++){
        if(colours[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colours[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
    resetButton.textContent = "New Colours";
    messageDisplay.textContent = "";
}

// Add Event Listener to Reset Button
resetButton.addEventListener("click", function(){
    reset();
});