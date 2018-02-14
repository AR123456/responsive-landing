////required packages 
var inquirer = require('inquirer');
//function to check i the letter is in the word 
function checkForLetter(letter, word){
    // Check if the letter is in the word
    if(word.indexOf(letter) != -1){
       return true;
        } else{
      return false;
    }
  }

module.exports = checkForLetter;