document.addEventListener("DOMContentLoaded", () =>{

        createSquares();

        const guessedWords = [[]];
        let availableSpace = 1;

        let word = "swear";
        let guessedWordCount = 0;
        

        const keys = document.querySelectorAll(".keyboard-row button")

        
        //******FUNCTIONS******//
        function handleSubmitWord() {
                const currentWordArr = getCurrentWordArr();
                if(currentWordArr.length !== 5) {
                        window.alert("Word must be 5 letters!");

                } else {
                        const currentWord = currentWordArr.join('');
                        const firstLetterId = guessedWordCount * 5  + 1;
                        const interval = 200;
                        currentWordArr.forEach((letter,index) => {
                                setTimeout(() => {
                                        const tileColor = "rgb(58,58,60";

                                        const letterId = firstLetterId + index;
                                        const letterEl = document.getElementById(letterId);
                                        letterEl.classList.add("animate_flipInX");
                                        letterEl.style = `background-color: ${tileColor};border-color:${tileColor}`;
                                }, interval);
                        });

                        guessedWordCount += 1;

                        if(currentWord === word) {
                                window.alert("Congratulations!");
                 
                        } else if(guessedWords.length === 6 && currentWordArr.length === 5) {
                                window.alert(`Sorry, you have no more guesses! The word is ${word}.`);
                        } else {
                                guessedWords.push([]);
                        }


                }
                
        }


        function getCurrentWordArr () {
                const numOfGuess = guessedWords.length;
                return guessedWords[numOfGuess - 1];
        }

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

        //click event function for the keyboard
        for (let i = 0; i < keys.length; i++) {
                keys[i].onclick = ({target}) => {
                        const letter = target.getAttribute("data-key");
                        //console.log(key);
                        
                        if(letter === 'enter') {
                                handleSubmitWord();
                                return;
                        }

                        updateGuessedWord(letter);
                }
                
        }

})