// Load the inquirer pacakge
var inquirer = require("inquirer");
var fs = require("fs");
// var Word = require("./word.js");
// var Letter = require("./letter.js");
// var Game = require("./game.js");
// var Word = require('./word.js');

var wordArray =["red","blue","green","yellow","orange","purple","teal","pink"];
var badGuess = [];
var matchingLetters = [];      
var underscoreWord;
//*******functions that may belong in another file  */
//function to check i the letter is in the word 
function checkForLetter(letter, word){
  // Check if the letter is in the word
  if(word.indexOf(letter) != -1){
     return true;
      } else{
    return false;
  }
}
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
    // console.log(this.currentWord);
        //Display start game 
    console.log("Its time to play neuro anatomy Hangman, guess a letter");
    // make the underscore word object.
    underscoreWord = new lettersDisplay(this.currentWord);
    //send underscoreWord object to setDispaly functon 
    underscoreWord.setDisplay();
    console.log("You have " + game.guessesLeft+" guesses left");
    // prompt for a letter
    promptUser();
  }
};
//Display the letters or _ using constructor function
var lettersDisplay = function(word, matchingLetters){
  this.playWord = word;
  this.goodLetters = matchingLetters;
  this.displayText = '';
  this.winner = false;
  // Function takes the setDispaly object 
  this.setDisplay = function(){
    var shown = '';
    //checkingletters 
    if(this.goodLetters == undefined){
     for(var i = 0; i < this.playWord.length; i++){
              shown += ' _ ';
      }
    }
     else{
      //for loop through the word , then each possible correct letter
      for(var i = 0; i < this.playWord.length; i++){
        //   determine if letter found  
        var letterWasFound = false;
        for(var j = 0; j < this.goodLetters.length; j++){
          // compare the two arrays for match 
          if(this.playWord[i] == this.goodLetters[j]){
            shown += this.goodLetters[j];
            letterWasFound = true;
          }
        }
        // If nothing was found
        if(!letterWasFound){
          shown += ' _ ';
        }
      }
    }
    // Remove first/last space and console log
    this.displayText = shown.trim();
    //put the display text into the console
    console.log(this.displayText);
    // Check to see if the game was won (user display equals the word; ie no '_' marks)
    if(this.displayText == this.playWord){
      this.winner = true;
    }
  }
};//end of letters to display constructor ls




///start of game prompt 
inquirer.prompt([
  {
    type: "list",
    name: "wanaPlay",
    message: "Would you like to play hangman?",
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
         break;
  }
});

///prompt to get letters input 

//prompt user function 
function promptUser(){
  // Always make a gap between inputs
  // console.log(' ');
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
      // check input against alphabet array
      // if(alphabet.indexOf(letterGuessed) == -1){
      //   // if not letter
      //   console.log( + letterGuessed + "  is not a letter, please try again.");
      //   console.log('Guesses Left: ' + game.guessesLeft);
      //   console.log('Letters already guessed: ' + badGuess);
      //   promptUser();
      // }
      // else 
      if(badGuess.indexOf(letterGuessed) != -1){
        // if a repeat letter
        console.log("You already guessed "+ letterGuessed + " . Try again!");
        console.log('Guesses Left: ' + game.guessesLeft);
        console.log("Wrong guesses " + badGuess);
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
          console.log("Correct!!!");
          underscoreWord = new lettersDisplay(game.currentWord, matchingLetters);
          underscoreWord.setDisplay();
          // Test if the user has won
          if(underscoreWord.winner){
            console.log("You won "+ game.currentWord + " is the word!");
             return;
          }
          // check for duplicate guess and propmtUser
          else{
            console.log('Guesses Left: ' + game.guessesLeft);
            console.log('Letters already guessed: ' + badGuess);
            promptUser();
          }
        }
       // promps User and decrement guesses
        else{
          console.log("That letter is not in the word ");
          game.guessesLeft--;
          underscoreWord.setDisplay();
          console.log('Guesses Left: ' + game.guessesLeft);
          console.log('Letters already guessed: ' + badGuess);
          promptUser();
        }
     }
    });
  }
  // game over loss 
  else{
    console.log("You lost! The correct word was: " + game.currentWord);
  }
}




