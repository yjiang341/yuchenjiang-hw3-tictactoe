/*
  ============================================
  Gaming Logic
  ============================================
*/
const board = document.querySelector(".gameboard");
const body = document.querySelector("body");

let tempArr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
]

let turnPlayer = 0;

board.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log(e.target.id);
    console.dir(e.target.innerHTML);

    if (e.target.innerHTML === "") {
        if (turnPlayer%2 === 0) {
            e.target.innerHTML = "X";
        }
        else {
            e.target.innerHTML = "O";
        }
        turnPlayer++;
    }
});

/*
  ============================================
  Bottom Functions
  ============================================
*/
body.addEventListener('click', (e) => {
    e.target.backgroundColor = "white";
})

const restartBtn = document.querySelector("#restartBtn");

restartBtn.addEventListener("click", () => {
    const cells = document.querySelectorAll("td");

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win");
    });

    // Reset any game state variables here
});