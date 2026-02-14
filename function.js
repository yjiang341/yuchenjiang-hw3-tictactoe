/*
  ============================================
  Gaming Logic
  ============================================
*/
const board = document.querySelector(".gameboard");
const messageText = document.querySelector("#messageText");
const cells = document.querySelectorAll("td");

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let currentPlayer = 'X'; // default starting player
let turnPlayer = 0;
let gameStarted = false;
let gameOver = false;

board.addEventListener('click', (e) => {
    if (gameOver) return;
    if (e.target.tagName !== "TD") return;
    if (!gameStarted) gameStarted = true;
    if (e.target.innerHTML === "") {
        e.target.innerHTML = currentPlayer;
        checkWinner();
        if (!gameOver) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            messageText.textContent = currentPlayer + "'s turn";
        }
        turnPlayer++;
    }
});

function checkWinner() {
    const values = Array.from(cells).map(cell => cell.textContent);

    for (let combo of winningCombos) {
        const [a,b,c] = combo;

        if (values[a] &&
            values[a] === values[b] &&
            values[a] === values[c]) {

            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");

            messageText.textContent = values[a] + " Wins!";
            gameOver = true;
            return;
        }
    }
    if (values.every(val => val !== "")) {
        messageText.textContent = "It's a Draw :O";
        gameOver = true;
    }
}

/*
  ============================================
  Bottom Functions
  ============================================
*/

const switchSideBtn = document.querySelector("#switchSideBtn");

switchSideBtn.addEventListener("click", () => {
    if (gameStarted) {
        showMessage("You cannot switch sides after the game has started!");
        return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    showMessage("You are now: " + currentPlayer);
});

const restartBtn = document.querySelector("#restartBtn");

restartBtn.addEventListener("click", () => {
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win");
    });

    currentPlayer = "X";
    turnPlayer = 0;
    gameStarted = false;
    gameOver = false;
    showMessage("Game Restarted!");
    messageText.innerHTML =
        "Welcome! Please choose your preferred side by using the 'switch' button (OvO)<br>" +
        "Note: 'X' goes first by default (OwO)";
});

const ruleBtn = document.querySelector("#ruleBtn");

ruleBtn.addEventListener("click", () => {
    showMessage("<h3>Tic‑Tac‑Toe Rules</h3>" +
        "<p>1. The game is played on a 3x3 grid.</p>" +
        "<p>2. Players take turns placing X and O.</p>" +
        "<p>3. Three in a row wins.</p>" +
        "<p>4. If all cells are filled without a winner, it's a draw.</p>");
});

/*
  ============================================
  Message Decoration Function
  ============================================
*/
function showMessage(msg) {
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0,0,0,0.6)";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.zIndex = "1000";

    const content = document.createElement("div");
    content.style.background = "#ecd8ad";
    content.style.padding = "20px 30px";
    content.style.borderRadius = "10px";
    content.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
    content.style.textAlign = "center";
    content.style.fontFamily = "Trebuchet MS, Arial, sans-serif";
    content.style.fontSize = "16px";
    content.style.color = "rgba(0,0,0,0.9)";
    content.style.fontWeight = "bold";
    content.style.textShadow = "0 2px 5px rgba(193, 197, 197, 0.4)";
    content.innerHTML = `
        <p>${msg}</p>
        <button class="close-btn" id="closeMsgBtn">Close</button>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    document.getElementById("closeMsgBtn").addEventListener("click", () => {
        document.body.removeChild(modal);
    });
}