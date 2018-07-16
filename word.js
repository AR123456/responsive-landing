var inquirer = require("inquirer");
var lettersDisplay = function(word, matchingLetters) {
  this.playWord = word;
  this.goodLetters = matchingLetters;
  this.displayText = "";
  this.winner = false;
  this.setDisplay = function() {
    var shown = "";

    if (this.goodLetters == undefined) {
      for (var i = 0; i < this.playWord.length; i++) {
        shown += " _ ";
      }
    } else {
      for (var i = 0; i < this.playWord.length; i++) {
        var letterWasFound = false;
        for (var j = 0; j < this.goodLetters.length; j++) {
          if (this.playWord[i] == this.goodLetters[j]) {
            shown += this.goodLetters[j];
            letterWasFound = true;
          }
        }
        if (!letterWasFound) {
          shown += " _ ";
        }
      }
    }
    this.displayText = shown.trim();
    console.log(" ");
    console.log(this.displayText);
    console.log(" ");
    if (this.displayText == this.playWord) {
      this.winner = true;
    }
  };
};
module.exports = lettersDisplay;
