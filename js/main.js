document.addEventListener("DOMContentLoaded", () =>{

        createSquares();

        const guessedWords = [[]];
        const availableSpace = 1;

        const keys = document.querySelectorAll(".keyboard-row button")

        //click event function for the keyboard
        for (let i = 0; i < keys.length; i++) {
                keys[i].onclick = ({target}) => {
                        const key = target.getAttribute("data-key");
                        //console.log(key);
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

})