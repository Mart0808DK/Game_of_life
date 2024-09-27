import { Grid } from "./grid.js";
import * as controller from "./controller.js"

const GRID_HEIGHT = 40;
const GRID_WIDTH = 40;

export let grid = new Grid(GRID_HEIGHT, GRID_WIDTH);



function init() {
    console.log("Model kører");
    // document.querySelector("#empty_grid").addEventListener("click", emptyGrid);
    // document.querySelector("#add_random_cells").addEventListener("click", addRandomCells);

    // createBoard();
    // createCells();
    // gameInterval = setInterval(updateGrid, 2000);
}




function addRandomCells() {
    for (let row = 0; row < grid.rows; row++) {
        for (let col = 0; col < grid.cols; col++) {
            const value = grid.get(row, col);

            if (value === 0) {
                const randomCells = Math.random();
                console.log(randomCells);

                if (randomCells < 0.5) {
                    grid.set(row, col, 1);
                }
            }
        }
    } 
    controller.updateGrid();
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

function checkIfGridIsDead() {
    let amountOfDeadCells = 0;

    for (let row = 0; row < grid.rows; row++) {
        for (let col = 0; col < grid.cols; col++) {
            const value = grid.get(row, col);
            if (value === 0) {
                amountOfDeadCells++;
            }
        }
    }

    if (amountOfDeadCells == 0) {
        return true;
    } else {
        return false;
    }
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

export { init, countNeightbours, scanGrid, decideIfCellDiesOrLives, addRandomCells, checkIfGridIsDead };
