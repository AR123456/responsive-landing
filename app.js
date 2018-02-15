// Load the inquirer pacakge
var inquirer = require("inquirer");
var fs = require("fs");
// Link in the letters to display
var checkForLetter = require('./letter.js');
//require wor.js file 
var lettersDisplay  = require('./word.js');
//link to array of words 
var  wordArray = require('./array.js');
// Link in the letters to display
var checkForLetter = require('./letter.js');
var badGuess = [];
var matchingLetters = [];      
var underscoreWord;

//start game get word from the array 
var game = {
  wordArray : wordArray, //  list of words
  guessesLeft : 9, // per word
  currentWord : null, // the word object
  startGame : function(){
    // console.log("you are in the startGame function ");
    //set guesses to 9
    this.guessesLeft = 9;
    // get a  word from array
    var i = Math.floor(Math.random() * this.wordArray.length);
    this.currentWord = this.wordArray[i];
    //show word for testing 
        console.log("  " );
    console.log('\x1b[34m%s\x1b[0m',"****Help with word for testing:    " +this.currentWord); 
    console.log("________________________________________" );
    console.log("  " );
     //Display start game 
    console.log('\x1b[33m%s\x1b[0m',"Its time to play neuro anatomy Hangman, guess a letter");
    // make the underscore word object.
    underscoreWord = new lettersDisplay(this.currentWord);
    //send underscoreWord object to setDispaly functon 
    underscoreWord.setDisplay();
    console.log('\x1b[36m%s\x1b[0m',"You have " + game.guessesLeft+" guesses left");
    // prompt for a letter
    promptUser();
  }
};
///start of game prompt 
inquirer.prompt([
   {
    type: "list",
    name: "wanaPlay",
    message: "Would you like to play a game?",
    choices: [
      "yes",
      "no"
    ]
  }
])
.then(function(answers) {
  var action = answers.wanaPlay;
  // console.log(action);
  switch (action) {
    case "yes":
     game.startGame();
      break;
    case "no":
    console.log('\x1b[36m%s\x1b[0m', 'The only way to win is not to play');  
         break;
  }
});
///prompt to get letters input 
//prompt user function 
function promptUser(){
  //put  gap between inputs
  console.log(' ');
  //  prompt for new letter
  if(game.guessesLeft > 0){
    inquirer.prompt([
      {
        type: "value",
        name: "letter",
        message: "Guess a Letter: "
      }
    ]).then(function(userInput){
      // get guess
      var letterGuessed = userInput.letter.toLowerCase();
        if(badGuess.indexOf(letterGuessed) != -1){
        // if a repeat letter
        console.log(' ');
        console.log('\x1b[31m%s\x1b[0m', "You already guessed "+ letterGuessed+ " Try again!");
        console.log(' ');
        console.log('\x1b[36m%s\x1b[0m', 'Guesses Left: ' + game.guessesLeft); 
        console.log(' ');
        console.log('\x1b[36m%s\x1b[0m', "Wrong guesses " + badGuess); 
        console.log(' ');
        promptUser();
      }
      else{
         badGuess.push(letterGuessed);
        // Check matching letter in the word
        var letterInWord = checkForLetter(letterGuessed, game.currentWord);
        // If the letter is in the word, update display
        if(letterInWord){
         matchingLetters.push(letterGuessed);
          // display 
          console.log(' ');
           console.log("\x1b[32m%s\x1b[0m","Correct!!!")
           console.log(' ');
          underscoreWord = new lettersDisplay(game.currentWord, matchingLetters);
          underscoreWord.setDisplay();
          // Test if the user has won
          if(underscoreWord.winner){
            console.log(' ');
             console.log("\x1b[32m%s\x1b[0m","You won "+ game.currentWord + " is the word!")
             console.log(' ');
             return;
          }
          // check for duplicate guess and propmtUser
          else{
            console.log(' ');
            console.log('\x1b[36m%s\x1b[0m','Guesses Left: ' + game.guessesLeft);
            console.log(' ');
            console.log('\x1b[36m%s\x1b[0m','Letters already guessed: ' + badGuess); console.log(' ');

            promptUser();
          }
        }
       // promps User and decrement guesses
        else{
          console.log(' ');
          console.log('\x1b[31m%s\x1b[0m', 'That letter is not in the word');console.log(' ');
          game.guessesLeft--;
          underscoreWord.setDisplay();
          console.log(' ');
          console.log('\x1b[36m%s\x1b[0m','Guesses Left: ' + game.guessesLeft);
          console.log(' ');
          console.log('\x1b[36m%s\x1b[0m','Letters already guessed: ' + badGuess);
          console.log(' ');
          promptUser();
        }
     }
    });
  }
  // game over loss 
  else{
    console.log(' ');
     console.log('\x1b[31m%s\x1b[0m', 'You lost! The correct word was: '+ game.currentWord );
     console.log(' ');
  }
}




