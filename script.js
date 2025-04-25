let puzzle = [];
let solution = [];
let timer;
let seconds = 0;

function generateSudoku(difficulty) {
  // Simple hardcoded complete grid for demonstration
  const base = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
  ];

  // Copy solution and make puzzle
  solution = base.map(row => row.slice());
  puzzle = base.map(row => row.slice());

  let removeCount = { easy: 30, medium: 45, hard: 55 }[difficulty] || 45;

  while (removeCount > 0) {
    const i = Math.floor(Math.random() * 9);
    const j = Math.floor(Math.random() * 9);
    if (puzzle[i][j] !== 0) {
      puzzle[i][j] = 0;
      removeCount--;
    }
  }
}

function createGrid() {
  const grid = document.getElementById("sudoku-grid");
  grid.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 1;
      input.className = "cell";

      if (puzzle[i][j] !== 0) {
        input.value = puzzle[i][j];
        input.disabled = true;
        input.classList.add("readonly");
      } else {
        input.addEventListener("input", () => {
          const val = parseInt(input.value);
          if (val === solution[i][j]) {
            input.classList.add("correct");
          } else {
            input.classList.remove("correct");
          }
        });
      }

      grid.appendChild(input);
    }
  }
}

function newGame() {
  const difficulty = document.getElementById("difficulty").value;
  generateSudoku(difficulty);
  createGrid();
  startTimer();
  document.getElementById("hint").innerText = "";
}

function showSolution() {
  const cells = document.querySelectorAll("#sudoku-grid input.cell");
  for (let i = 0; i < 81; i++) {
    const row = Math.floor(i / 9);
    const col = i % 9;
    cells[i].value = solution[row][col];
    cells[i].disabled = true;
    cells[i].classList.add("readonly");
  }
  stopTimer();
}

function getHint() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (puzzle[i][j] === 0) {
        document.getElementById("hint").innerText =
          `Hint: Cell (${i + 1}, ${j + 1}) = ${solution[i][j]}`;
        return;
      }
    }
  }
  document.getElementById("hint").innerText = "No empty cells left!";
}

function startTimer() {
  stopTimer();
  seconds = 0;
  timer = setInterval(() => {
    seconds++;
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    document.getElementById("timer").innerText = `Time: ${min}:${sec}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

window.onload = newGame;
