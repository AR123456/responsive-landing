var inquirer = require("inquirer");
var fs = require("fs");
var checkForLetter = require("./letter.js");
var lettersDisplay = require("./word.js");
var wordArray = require("./array.js");
var checkForLetter = require("./letter.js");
var badGuess = [];
var matchingLetters = [];
var underscoreWord;
var game = {
  wordArray: wordArray,
  guessesLeft: 9,
  currentWord: null,
  startGame: function() {
    this.guessesLeft = 9;
    var i = Math.floor(Math.random() * this.wordArray.length);
    this.currentWord = this.wordArray[i];
    console.log("  ");
    console.log(
      "\x1b[34m%s\x1b[0m",
      "****Hint the word is:    " + this.currentWord
    );
    console.log("________________________________________");
    console.log("  ");
    console.log(
      "\x1b[33m%s\x1b[0m",
      "Its time to play neuro anatomy Hangman, guess a letter"
    );
    underscoreWord = new lettersDisplay(this.currentWord);
    underscoreWord.setDisplay();
    console.log(
      "\x1b[36m%s\x1b[0m",
      "You have " + game.guessesLeft + " guesses left"
    );
    promptUser();
  }
};
inquirer
  .prompt([
    {
      type: "list",
      name: "wanaPlay",
      message: "Would you like to play a game?",
      choices: ["yes", "no"]
    }
  ])
  .then(function(answers) {
    var action = answers.wanaPlay;
    switch (action) {
      case "yes":
        game.startGame();
        break;
      case "no":
        console.log("\x1b[36m%s\x1b[0m", "The only way to win is not to play");
        break;
    }
  });
function promptUser() {
  console.log(" ");
  if (game.guessesLeft > 0) {
    inquirer
      .prompt([
        {
          type: "value",
          name: "letter",
          message: "Guess a Letter: "
        }
      ])
      .then(function(userInput) {
        var letterGuessed = userInput.letter.toLowerCase();
        if (badGuess.indexOf(letterGuessed) != -1) {
          console.log(" ");
          console.log(
            "\x1b[31m%s\x1b[0m",
            "You already guessed " + letterGuessed + " Try again!"
          );
          console.log(" ");
          console.log("\x1b[36m%s\x1b[0m", "Guesses Left: " + game.guessesLeft);
          console.log(" ");
          console.log("\x1b[36m%s\x1b[0m", "Wrong guesses " + badGuess);
          console.log(" ");
          promptUser();
        } else {
          badGuess.push(letterGuessed);
          var letterInWord = checkForLetter(letterGuessed, game.currentWord);
          if (letterInWord) {
            matchingLetters.push(letterGuessed);
            console.log(" ");
            console.log("\x1b[32m%s\x1b[0m", "Correct!!!");
            console.log(" ");
            underscoreWord = new lettersDisplay(
              game.currentWord,
              matchingLetters
            );
            underscoreWord.setDisplay();
            if (underscoreWord.winner) {
              console.log(" ");
              console.log(
                "\x1b[32m%s\x1b[0m",
                "You won " + game.currentWord + " is the word!"
              );
              console.log(" ");
            } else {
              console.log(" ");
              console.log(
                "\x1b[36m%s\x1b[0m",
                "Guesses Left: " + game.guessesLeft
              );
              console.log(" ");
              console.log(
                "\x1b[36m%s\x1b[0m",
                "Letters already guessed: " + badGuess
              );
              console.log(" ");
              promptUser();
            }
          } else {
            console.log(" ");
            console.log("\x1b[31m%s\x1b[0m", "That letter is not in the word");
            console.log(" ");
            game.guessesLeft--;
            underscoreWord.setDisplay();
            console.log(" ");
            console.log(
              "\x1b[36m%s\x1b[0m",
              "Guesses Left: " + game.guessesLeft
            );
            console.log(" ");
            console.log(
              "\x1b[36m%s\x1b[0m",
              "Letters already guessed: " + badGuess
            );
            console.log(" ");
            promptUser();
          }
        }
      });
  } else {
    console.log(" ");
    console.log(
      "\x1b[31m%s\x1b[0m",
      "You lost! The correct word was: " + game.currentWord
    );
    console.log(" ");
  }
}
