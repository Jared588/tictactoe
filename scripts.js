// Player factory
const Player = (name, playerNum) => {
    const getName = () => name;
    const getNum = () => playerNum;

    return { getName, getNum };
}

// Initialize players
const player1 = Player("player1", 1);
const player2 = Player("player2", 2);

// Initialize game state
const gameArray = new Array(9).fill(""); // Represents the game board

// Set player one as the first player
let currentPlayer = player1;

document.addEventListener("DOMContentLoaded", function () {   
    const buttons = document.querySelectorAll(".tile")
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            var move = btn.id // Log the move
            if (currentPlayer === player1) {
                GameFlow.updateLogic(player1.getNum(), move); 
            } else {
                GameFlow.updateLogic(player2.getNum(), move);
            }

            GameDisplay.updateDisplay();
            
            console.log(move);
        })
    });

    // Switch Player function
    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    // Game board Update logic
    const GameFlow = (() => {
        const updateLogic = (player, move) => {
            var sym = player === 1 ? "x" : "o";
 
            let i = move;
            if (gameArray[i] === "") {
                gameArray[i] = sym;
                switchPlayer();
            } else return;
        }
        return {updateLogic}
    })();

    // Game board Display Logic
    const GameDisplay = (() => {
        const updateDisplay = () => {
            for (let i = 0; i < 9; i++) {
                buttons[i].innerHTML = gameArray[i]
            }
        }
        return {updateDisplay}
    })();
});