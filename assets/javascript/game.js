// Global Variables
//  Arrays and Variables for holding data
var wordOptions = ["acura", "audi", "alfaromeo", "astonmartin", "bentley", "bmw", "bugatti", "buick", "cadillac", "cheverolet", "chrysler", "dodge", "ferrari", "fiat", "ford", 'generalmotors', "honda", "hyundai", "infiniti", "jaguar", "kia", "koenigsegg", "landrover", "lexus", "lincoln", "lotus", "lamborghini"];
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];
// Game Counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

// Functions 
function startGame() {
  selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
  lettersinWord = selectedWord.split("");
  numBlanks = lettersinWord.length;


  // Reset
  guessesLeft = 9;
  wrongLetters = [];
  blanksAndSuccesses = [];

  // Populate blanks and successes with right number of blanks.
  for (var i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push("_");
  }
  //  Change HTML to reflect round conditions
  document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
  document.getElementById("numGuesses").innerHTML = guessesLeft;
  document.getElementById("winCounter").innerHTML = winCount;
  document.getElementById("lossCounter").innerHTML = lossCount;
  document.getElementById("wrongGuesses").innerHTML = [];

  // Testing/debugging
  console.log(selectedWord);
  console.log(lettersinWord);
  console.log(numBlanks);
  console.log(blanksAndSuccesses)
}

function checkLetters(letter) {
  var isLetterInWord = false;
  for (var i = 0; i < numBlanks; i++) {
    if (selectedWord[i] == letter) {
      isLetterInWord = true;
    }
  }


  // Check where in word letter exists, then populate out blanks andSuccesses array.
  if (isLetterInWord) {
    for (var i = 0; i < numBlanks; i++) {
      if (selectedWord[i] == letter) {
        blanksAndSuccesses[i] = letter;
      }
    }
  }

  // letter wasn't found
  else {
    wrongLetters.push(letter);
    guessesLeft--
  }
  // Testing and Debugging
  console.log(blanksAndSuccesses);

}

function roundComplete() {
  console.log("Win count: " + winCount + "|Loss Count: " + lossCount + "|Guesses Left:" + guessesLeft);

  // update the html to reflect the most recent count stats
  document.getElementById('numGuesses').innerHTML = guessesLeft;
  document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses.join(" ");
  document.getElementById('wrongGuesses').innerHTML = wrongLetters.join(" ");

  // check if user won
  if (lettersinWord.toString() == blanksAndSuccesses.toString()) {
      window.setTimeout(function(){
            winCount++;
    alert("You Won!");

    document.getElementById("winCounter").innerHTML = winCount;

    startGame();
      },10)
    
  }
  // check if user lost
  else if (guessesLeft == 0) {
    lossCount++;
    alert("You lost!");
    document.getElementById("lossCounter").innerHTML = lossCount;

    startGame();
  }
}


// Main Processs;
//  Initiates the code for the first time
startGame();

// Registers the code for key clicks
document.onkeyup = function (event) {
  var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  checkLetters(letterGuessed);
  roundComplete();

  // Testing 
  console.log(letterGuessed);
}
