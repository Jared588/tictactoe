// Player factory
const Player = (name, playerNum) => {
    const getName = () => name;
    const getNum = () => playerNum;

    return { getName, getNum };
}

// Initialize players
const player1 = Player("player1", 1);
const player2 = Player("player2", 2);

// Initialize scores
var player1Score = 0;
var player2Score = 0;

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
        })
    });

    // Switch Player function
    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    // Reset Game board
    const clearBoard = () => {          
        gameArray.fill("");
        currentPlayer = player1;
        GameDisplay.updateDisplay(); // Update the display to clear the board visually
    }

    const resetGame = () => {
        setTimeout(() => {
            const confirmReset = confirm("Would you like to play again?");
            if(confirmReset) {
                clearBoard();
                player1Score = 0;
                player2Score = 0;
                let playerStats = document.querySelectorAll('.player-stats');
                playerStats.forEach(playerStat => {
                    while (playerStat.children.length > 1) {
                        playerStat.removeChild(playerStat.children[1]);
                    }
                });
            }
        }, 100); 
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
            
            // Win conditions/logic
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
                        player1Score += 1;
                        GameDisplay.updateScores(player1, player1Score);
                        clearBoard();
                    }, 100); // Delay the alert so the update displays beforehand
                } else {
                    setTimeout(() => {
                        alert("Player 2 wins!");
                        player2Score += 1;
                        GameDisplay.updateScores(player2, player2Score);
                        clearBoard();
                    }, 100); 
                }
            } else if (gameArray.every(cell => cell !== "")) {
                setTimeout(() => {
                    alert("Draw!");
                    clearBoard();
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

        const updateScores  = (player, score) => {
            let playerStats;

            if (player === player1) {
                playerStats = document.querySelector('#playerOneStats');
            } else {
                playerStats = document.querySelector('#playerTwoStats');
            }

            if (score >= 1 && score <= 4) {
                while (playerStats.children.length > 1) {
                    playerStats.removeChild(playerStats.children[1]);
                }

                const imgElement = document.createElement('img');
                imgElement.src = `icons/tally${score}.png`; // Set the source attribute to the image file
                imgElement.classList.add('tally'); // Add a CSS class to style the image
                playerStats.appendChild(imgElement); // Append the image element to the playerStats element
            }

            if (score === 5) {
                while (playerStats.children.length > 1) {
                    playerStats.removeChild(playerStats.children[1]);
                }
                const imgElement = document.createElement('img');
                imgElement.src = `icons/tally${score}.png`; // Set the source attribute to the image file
                imgElement.classList.add('tally'); // Add a CSS class to style the image
                playerStats.appendChild(imgElement); // Append the image element to the playerStats element
                resetGame();
            }
        }

        return { updateDisplay, updateScores };
    })();
});