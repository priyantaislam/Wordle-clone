document.addEventListener("DOMContentLoaded", () =>{

        createSquares();

        const guessedWords = [[]];
        let availableSpace = 1;

        let word = "swear";

        const keys = document.querySelectorAll(".keyboard-row button")

        
        //******FUNCTIONS******//
        function handleSubmitWord() {
                const currentWordArr = getCurrentWordArr();
                if(currentWordArr.length != 5) {
                        window.alert("Word must be 5 letters!");

                }

                const currentWord = currentWordArr.join('');

                if(currentWord === word) {
                        window.alert("Congratulations!");
                }

                if(guessedWords.length === 6 && currentWordArr.length == 5) {
                        window.alert(`Sorry, you have no more guesses! The word is ${word}.`);
                }

                
                guessedWords.push([]);
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
                        square.setAttribute("id", i + 1);
                        gameBoard.appendChild(square);

                }
        }

        //click event function for the keyboard
        for (let i = 0; i < keys.length; i++) {
                keys[i].onclick = ({target}) => {
                        const key = target.getAttribute("data-key");
                        //console.log(key);
                        
                        if(key === 'enter') {
                                handleSubmitWord();
                                return;
                        }

                        updateGuessedWord(key);
                }
                
        }

})