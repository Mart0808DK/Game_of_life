export class Grid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = Array.from({ length: rows }, () => Array(cols).fill(null));
    }

    get(row, col) {
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
            return undefined; // Returner 0 for out-of-bounds celler
        }
        let value = this.grid[row][col];
        return value;
    }

    set(row, col, value) {
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
            return undefined; // Returner 0 for out-of-bounds celler
        }
        this.grid[row][col] = value;
    }

    indexFor(row, col) {
        return row * this.cols + col;
    }

    rowColFor(index) {
        const row = Math.floor(index / this.cols);
        const col = index % this.rows;
        return this.grid[row][col];
    }

    neighboursWithCheck(row, col) {
        if (row === 0) {
            if (col == 0) {
                // this is NORTH WEST
                this.east(row, col);
                this.south(row, col);
                this.south_east(row, col);
            } else if (col === this.cols) {
                // this is NORTH EAST
                this.west(row, col);
                this.south(row, col);
            } else {
                // this is top North
                this.east(row, col);
                this.south_east(row, col);
                this.west(row, col);
                this.south_west(row, col);
                this.south(row, col);
            }
        } else if (row === this.rows) {
            if (col === 0) {
                // this is sout west
                this.north();
                this.south_east(row, col);
                this.east();
            } else if (col === this.cols) {
                // this is south east
                this.north();
                this.west();
                this.north_west(row, col);
            } else {
                // this is bot South
                this.north();
                this.north_east(row, col);
                this.east();
                this.north_west(row, col);
                this.west();
            }
        }
    }

    neighbours(row, col) {
        if (row > this.rows.length && col > this.cols.length) {
            return undefined;
        }

        let neighbours = [];

        let north = this.north(row, col);
        let north_west = this.north_west(row, col);
        let north_east = this.north_east(row, col);
        let south_west = this.south_west(row, col);
        let south_east = this.south_east(row, col);
        let south = this.south(row, col);
        let west = this.west(row, col);
        let east = this.east(row, col);

        neighbours.push(north, south, east, west, north_west, north_east, south_east, south_west);

        return neighbours;
    }

    neighboursValue(row, col) {
        if (row > this.rows.length && col > this.cols.length) {
            return undefined;
        }

        let neighbours = [];

        let north = this.north(row, col);
        let north_west = this.north_west(row, col);
        let north_east = this.north_east(row, col);
        let south_west = this.south_west(row, col);
        let south_east = this.south_east(row, col);
        let south = this.south(row, col);
        let west = this.west(row, col);
        let east = this.east(row, col);

        neighbours.push(north, south, east, west, north_west, north_east, south_east, south_west);

        let interator = neighbours.values();
        for (const value of interator) {
            console.log(value);
        }
    }

    nextInRow(row, col) {
        if (row > this.rows.length && col > this.cols.length) {
            return undefined;
        }
        let value = this.grid[row][col - 1];
        return value;
    }

    north(row, col) {
        if (row - 1 < 0) {
            return undefined;
        }
        let value = this.grid[row - 1][col];
        return value;
    }

    north_west(row, col) {
        if (row > this.rows.length && col > this.cols.length) {
            return undefined;
        }
        let value = this.grid[row - 1][col - 1];
        return value;
    }

    north_east(row, col) {
        if (row > this.rows.length && col > this.cols.length) {
            return undefined;
        }
        let value = this.grid[row - 1][col + 1];
        return value;
    }

    south(row, col) {
        if (row > this.rows.length && col > this.cols.length) {
            return undefined;
        }
        let value = this.grid[row + 1][col];
        return value;
    }

    south_west(row, col) {
        if (row > this.rows.length && col > this.cols.length) {
            return undefined;
        }
        let value = this.grid[row + 1][col - 1];
        return value;
    }

    south_east(row, col) {
        if (row > this.rows.length && col > this.cols.length) {
            return undefined;
        }
        let value = this.grid[row + 1][col + 1];
        return value;
    }

    west(row, col) {
        if (row > this.rows.length && col > this.cols.length) {
            return undefined;
        }
        let value = this.grid[row][col - 1];
        return value;
    }

    east(row, col) {
        if (row > this.rows.length && col > this.cols.length) {
            return undefined;
        }
        let value = this.grid[row][col + 1];
        return value;
    }

    row() {
        return this.rows;
    }

    col() {
        return this.cols;
    }

    size() {
        return this.rows * this.cols;
    }

    fill(value) {
        for (let row = 0; row < this.rows.length; row++) {
            for (let col = 0; col < this.cols.length; col++) {
                this.grid[row][col] = value;
            }
        }
    }

    dump() {
        console.table(this.grid);
    }
}
