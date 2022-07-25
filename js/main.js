document.addEventListener("DOMContentLoaded", () =>{

    createSquares();

    //array consisting of the words guessed
    const guessedWords = [[]];
    let availableSpace = 1;
    //the correct word, for testing
    let word = "swear";
    //number of words guessed
    let guessedWordCount = 0;
    let seen = [];
    
    
    
    //******FUNCTIONS******//
    function getLetterCount(letter) {
        let letterCount = 0;
        for (index = 0, len = word.length; index < len; index++) {
            if (letter === word.charAt(index)) {
                letterCount++;
            }
        }
        return letterCount;
    }

    function countOccurence(letter) {
        let seenCount = 0;
        for (index = 0, len = seen.length; index < len; index++) {
            if (letter === seen[index]) {
                seenCount++;
            }
        }
        return seenCount;
    }

    function getTileColor(letter, index) {

        const correctLetter = word.includes(letter);

        if(!correctLetter) {
            return "rgb(58, 58, 60)";
        } else {
            if(countOccurence(letter) == getLetterCount(letter)){
                return "rgb(58, 58, 60)";
            } else {
                seen.push(letter);
            }
        }

        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = letter === letterInThatPosition;

        if(isCorrectPosition) {
            return "rgb(83, 141,78)";
        }

        return "rgb(181, 159, 59)"
    }


    //handles the word submitted
    //error if word has less than 5 letters
    //alerts if player guessed the right word
    function handleSubmitWord() {
            
        //get the current word array containing letters
        const currentWordArr = getCurrentWordArr();

        //check if it meets length requirement
        if(currentWordArr.length !== 5) {
                window.alert("Word must be 5 letters!");
        } else {
                
            //combine it into a string
            const currentWord = currentWordArr.join('');
            const firstLetterId = guessedWordCount * 5  + 1;
            const interval = 300;
            
            currentWordArr.forEach((letter,index) => {
                setTimeout(() => {
                    const tileColor = getTileColor(letter, index);

                    const letterId = firstLetterId + index;
                    
                    //get the html element containing the letter
                    const letterEl = document.getElementById(letterId);
                    //add animation
                    letterEl.classList.add("animate__flipInX");
                    letterEl.style = `background-color: ${tileColor};border-color:${tileColor}`;
                }, interval * index);
            });

            guessedWordCount += 1;
            console.log(guessedWordCount);

            //conditions of winning, more than 6 guesses and continuing after a wrong guess
            if(currentWord === word) {
                setTimeout(() => {  window.alert("Congratulations!"); }, interval * 6);
            } else if(guessedWords.length === 6 && currentWordArr.length === 5) {
                setTimeout(() => 
                    {  window.alert(`Sorry, you have no more guesses! The word is ${word}.`); }, interval * 6);
                
            } else {
                guessedWords.push([]);
                
            }
        }       
    }


    //gets current array containing letters of the word
    function getCurrentWordArr () {
        const numOfGuess = guessedWords.length;
        return guessedWords[numOfGuess - 1];
    }

    //updates the word according to input
    function updateGuessedWord(letter) {
        const currentWordArr = getCurrentWordArr();

        if(currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace));
            availableSpace = availableSpace + 1;
    
            availableSpaceEl.textContent = letter;
        }      

    }


    //drawing the game area grid
    function createSquares() {
        const gameBoard = document.getElementById("board");

        for (let i = 0; i < 30; i++){
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", i + 1);
            gameBoard.appendChild(square);

        }
    }

    function handleDeleteLetter() {
        const currentWordArr = getCurrentWordArr();
        //if(currentWordArr.length != 0)
        
        if(currentWordArr.length > 0) {
            const removedLetter = currentWordArr.pop();

            guessedWords[guessedWords.length - 1] = currentWordArr;
        
            const lastLetterEl = document.getElementById(String(availableSpace - 1));
        
            lastLetterEl.textContent = "";
            lastLetterEl.style = `background-color: black;border-color:rgb(58, 58, 60)`
            availableSpace = availableSpace - 1;
            }
        
    }

    //adding onclick function to every on the keyboard
    const keys = document.querySelectorAll(".keyboard-row button")

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({target}) => {
            const letter = target.getAttribute("data-key");
                      
            if(letter === 'enter') {
                handleSubmitWord();
                return;
            }
            if (letter === "del") {
                handleDeleteLetter();
                return;
            }
            updateGuessedWord(letter);
        }           
    }          
})