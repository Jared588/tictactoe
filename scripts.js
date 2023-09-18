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

    // Reset Game board
    const resetGame = () => {
        gameArray.fill("");
        GameDisplay.updateDisplay();
        currentPlayer = player1;
    }

    // Game board Update logic
    const GameFlow = (() => {
        const updateLogic = (player, move) => {
            var sym = player === 1 ? "x" : "o";
 
            let i = move;
            if (gameArray[i] === "") {
                gameArray[i] = sym;
                switchPlayer();
            }
            
            if (
                (gameArray[0] === sym && gameArray[1] === sym && gameArray[2] === sym) ||
                (gameArray[3] === sym && gameArray[4] === sym && gameArray[5] === sym) ||
                (gameArray[6] === sym && gameArray[7] === sym && gameArray[8] === sym) ||
                (gameArray[0] === sym && gameArray[3] === sym && gameArray[6] === sym) ||
                (gameArray[1] === sym && gameArray[4] === sym && gameArray[7] === sym) ||
                (gameArray[2] === sym && gameArray[5] === sym && gameArray[8] === sym) ||
                (gameArray[0] === sym && gameArray[4] === sym && gameArray[8] === sym) ||
                (gameArray[2] === sym && gameArray[4] === sym && gameArray[6] === sym)
            ) {
                if (sym === "x") {
                    setTimeout(() => {
                        alert("Player 1 wins!");
                        resetGame();
                    }, 100); // Delay the alert so the update displays beforehand
                } else {
                    setTimeout(() => {
                        alert("Player 2 wins!");
                        resetGame();
                    }, 100); 
                }
            } else if (gameArray.every(cell => cell !== "")) {
                setTimeout(() => {
                    alert("Draw!");
                    resetGame();
                }, 100); 
            }
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