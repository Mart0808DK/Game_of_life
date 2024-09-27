import * as view from "./view.js";
import * as model from "./model.js";

export const GRID_HEIGHT = 40;
export const GRID_WIDTH = 40;

window.addEventListener("load", init);


export let gameInterval;

function init() {
    console.log("Controller kører");
    document.querySelector("#empty_grid").addEventListener("click", emptyGrid);
    document.querySelector("#add_random_cells").addEventListener("click", model.addRandomCells);

    view.createBoard();
    createCells();
    gameInterval = setInterval(updateGrid, 2000);
}

function updateGrid() {
    const isDead = model.checkIfGridIsDead();
    if (isDead == false) {
        view.iterateGenerationCount();
        model.scanGrid();
        view.renderGrid(model.grid);
    } else {
        clearInterval(gameInterval);
        console.log("Game is dead");
    }
}

function emptyGrid() {
    model.grid.fill(0);
    view.renderGrid(model.grid);
    clearInterval(gameInterval);
    console.log("Game is Dead");
}

function decideIfCellDiesOrLives(row, col) {
    let value = grid.get(row, col);
    let neighbours = model.countNeightbours(row, col);
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
            model.grid.set(row, col, isAlive);
        }
    }

    view.renderGrid(model.grid); // Initial render of the grid
}

export { decideIfCellDiesOrLives, updateGrid };
