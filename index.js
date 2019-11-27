var Word = require("./word.js");
var inquirer = require("inquirer")

var wordArray = ["cat", "dog", "beaver", "duck", "sloth", "ladybug", "stork", "dingo", "tapir", "moose", "skink", "goose", "marmoset", "dolphin", ];
var randomWord = "";
var displayWerd = "";
var finalWerd;
var leftToGuess;
var lives = 6

function newGame() {
    randomWord = "";
    var r = parseInt(Math.floor(Math.random() * (wordArray.length)))
    randomWord = wordArray[r]
    finalWerd = new Word(randomWord)
    leftToGuess = finalWerd.letterArr.length
}

function gameOver() {
    {
        console.log("Game over.")
        inquirer.prompt([{
            type: "confirm",
            name: "playAgain",
            message: "Would you like to play again?"
        }]).then(function (response) {
            if (response.playAgain) {
                newGame()
                print()
                askToGuess();
            } else {
                console.log("Ok, see you around!")
            }
        })
    }
}

function displayWord() {
    displayWerd = finalWerd.createWerdString()
    console.log(displayWerd);
    finalWerd.compare = displayWerd
}


function askToGuess() {
    inquirer.prompt([{
        name: "ask",
        message: "Guess a letter"
    }]).then(function (response) {
        var input = response.ask
        if (lives > 0) {
            if (input.length === 1) {
                finalWerd.guessCheck(input)
                displayWerd = finalWerd.createWerdString()

                if (finalWerd.compare === displayWerd) {
                    console.log("Nope, there is no", input, "in the word")
                    lives--
                    console.log("You have", lives, "guesse(s) remaining.")
                    if (lives === 0) {
                        gameOver()
                    } else {
                        print()
                        askToGuess()
                    }
                   
                } else {
                    console.log("Good choce!")
                    leftToGuess--
                    print();
                    if (leftToGuess === 0) {

                        console.log("Great Job! Here's the next word:");
                        newGame()
                        print();
                        askToGuess();
                    } else {
                        askToGuess()
                    }
                }

            } else if (input.length === 0) {
                consoel.log("Please choose a letter.");
                askToGuess()
            } else {
                console.log("Pick one letter a a time please.")
                askToGuess()
            }


        } else {
            gameOver()
        }
    })
}

function print() {
    console.log("\n")
    console.log("******************************************")
    displayWord()
    console.log("\n*****************************************")
    console.log("\n")
}
newGame()
print()
askToGuess();
