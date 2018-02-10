//required packages 
var inquirer = require('inquirer');
var prompt = require('prompt');
var fs = require("fs");
var Words = require("./words.js");
var Letters = require("./letters.js");
//variables 
var wordList = ["red","blue","green","yellow","orange","purple","teal","pink"];
var currentWord = ""; // for each letter here create a corresponding blank in the uncerscore array
var wordLetters= []; //holds the  letters from the word picked
var numBlanks =0; //number of letters in word
var underscoreWord = []; //where blanks will be to be replaced with correct guesses 

Words();
Letters();


//1. The completed game should be able to receive user input using the `inquirer` or `prompt` npm packages.
//constructor function with loop 

//function file for get word 

//constructor functions:

//Each constructor function should be in it's own file and be exported and required wherever needed.

// 5. Look into [function prototypes](https://www.thecodeship.com/web-development/methods-within-constructor-vs-prototype-in-javascript/) and use them for a few of your constructor's methods.

//  * **Word**: Used to create an object representing the current word the user is attempting to guess. This should contain word specific logic and data.



// * **Letter**: Used for each letter in the current word. Each letter object should either display an underlying character, or a blank placeholder (such as an underscore), depending on whether or not the user has guessed the letter. This should contain letter specific logic and data.


// You must keep track of the user's remaining guesses and prompt the user if they would like to end the game if none remain.


