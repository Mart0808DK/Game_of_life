import { Grid } from "./grid.js";
//import { displayBoard} from "./view.js";

window.addEventListener("load", init);

const GRID_HEIGHT = 30;
const GRID_WIDTH = 30;

let grid = new Grid(GRID_HEIGHT, GRID_WIDTH);

function init() {
    console.log("Model kører");

    createBoard();
    createCells();
    setInterval(updateGrid, 2000)
}

function createCells() {
    const board = document.querySelector("#board");

    for (let row = 0; row < GRID_HEIGHT; row++) {
        for (let col = 0; col < GRID_WIDTH; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            // adds the row and column data to the cell element
            cell.dataset.row = row;
            cell.dataset.col = col;
            // adds cell to the board
            board.appendChild(cell);

            const isAlive = Math.random() > 0.7 ? 1 : 0;
            grid.set(row, col, isAlive);
        }
    }

    renderGrid(grid); // Initial render of the grid
}



function updateGrid() {
    scanGrid();
    renderGrid(grid);
    setInterval(updateGrid, 2000);
}

function createBoard() {
    const board = document.querySelector("#board");
    board.style.setProperty("--GRID_WIDTH", GRID_WIDTH);
    board.style.setProperty("--GRID_HEIGHT", GRID_HEIGHT);
}

function countNeightbours(row, col) {
    let count = 0;
    for (let y = -1; y <= 1; y++) {
        // Rettet fra x til y
        for (let x = -1; x <= 1; x++) {
            // Avoid counting myself
            if (!(x === 0 && y === 0)) {
                count += grid.get(row + y, col + x);
            }
        }
    }
    return count;
}

function scanGrid() {
    let nextGeneration = new Grid(GRID_HEIGHT, GRID_WIDTH);

    for (let row = 0; row < grid.rows; row++) {
        for (let col = 0; col < grid.cols; col++) {
            const newValue = decideIfCellDiesOrLives(row, col);
            nextGeneration.set(row, col, newValue);
        }
    }

    // Opdater det nuværende grid til den nye generation
    grid = nextGeneration;
}

function decideIfCellDiesOrLives(row, col) {
    let value = grid.get(row, col);
    let neighbours = countNeightbours(row, col);
    let newValue;

    if (neighbours < 2 || neighbours > 3) {
        newValue = 0; 
    } else if (neighbours == 2) {
        newValue = value; 
    } else if (neighbours == 3) {
        newValue = 1; // En ny celle bliver født, eller cellen lever videre
    }

    return newValue;
}

function renderGrid(grid) {
    const board = document.querySelector("#board");
    for (let row = 0; row < GRID_HEIGHT; row++) {
        for (let col = 0; col < GRID_WIDTH; col++) {
            const cell = board.querySelector(`[data-row='${row}'][data-col='${col}']`);
            if (grid.get(row, col) === 1) {
                cell.style.backgroundColor = "black";
            } else {
                cell.style.backgroundColor = "white";
            }
        }
    }
}

export { init, createCells, createBoard, countNeightbours, scanGrid, decideIfCellDiesOrLives, Grid };
