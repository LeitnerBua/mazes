class Grid {
    constructor(columns, rows) {
        this.columns = columns;
        this.rows = rows;

        this.grid = this.createGrid();
        this.configure_cells();
    }

    createGrid() {

        let grid = new Array(this.columns);

        for(let i = 0; i < this.columns; i++) {
            grid[i] = new Array(this.rows);
        }

        for(let x = 0; x < this.columns; x++) {
            for(let y = 0; y < this.rows; y++) {
                grid[x][y] = new Cell(x, y, this.columns, this.rows);
            }
        }

        return grid;
    }


    configure_cells() {
        for(let x = 0; x < this.columns; x++) {
            for(let y = 0; y < this.rows; y++) {
                this.grid[x][y].addNeighbors();
            }
        }
    }

    random_cell() {
        let x = random(this.columns - 1);
        let y = random(this.row - 1);

        return this.grid[x][y];
    }


    size() {
        return this.columns * this.rows;
    }

    * eachCell() {
        for(let x = 0; x < this.columns; x++) {
            for(let y = 0; y < this.rows; y++) {
                yield this.grid[x][y];
            }
        }
    }

    generateMaze(x, y) {
        let cell = this.grid[x][y];
        cell.drawRect = true;

        let cellNorth;
        let cellEast;

        if(cell.north != undefined) {
            cellNorth = this.grid[cell.north.x][cell.north.y];
        }
        if(cell.east != undefined) {
            cellEast = this.grid[cell.east.x][cell.east.y];
        }

        if(cell.linked(cellNorth)) {
            cell.walls[0] = false;
            cellNorth.walls[2] = false;
        } 
        if(cell.linked(cellEast)) {
            cell.walls[1] = false;
            cellEast.walls[3] = false;
        }


    }



}