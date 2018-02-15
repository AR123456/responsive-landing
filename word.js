//required packages 
var inquirer = require('inquirer');
//Display the letters or _ using constructor function this is the for the word file 
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
        //loop through the selected word and put underscores in console
       for(var i = 0; i < this.playWord.length; i++){
                shown += ' _ ';
            // console.log("The underscores: " +shown);
            }
      }
       else{
        //for loop through the word , then each possible correct letter
        for(var i = 0; i < this.playWord.length; i++){
          //   determine if letter found  
          // console.log("First loop : " + this.playWord)
          var letterWasFound = false;
              for(var j = 0; j < this.goodLetters.length; j++){
               // compare the two arrays for match 
              //  console.log("Second loop : "+ this.goodLetters);
               
              if(this.playWord[i] == this.goodLetters[j]){
              shown += this.goodLetters[j];
              letterWasFound = true;
              }
          }
          // If nothing was found
          if(!letterWasFound){
            shown += ' _ ';
            // console.log("Show _ if letter not found :   " + shown);
            
          }
        }
      }
      // Remove first/last space and console log
        this.displayText = shown.trim();
      //put the display text into the console
      console.log(' ');
      console.log(this.displayText);
      console.log(' ');
      // Check to see if the game was won 
      if(this.displayText == this.playWord){
        this.winner = true;
      }
    }
  };//end of letters to display constructor ls
      
  module.exports = lettersDisplay