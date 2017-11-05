class Cell {
    constructor(x, y, cols, rows) {
        this.x = x;
        this.y = y;
        this.cols = cols;
        this.rows = rows;

        this.width = floor(width / this.cols);
        this.height = floor(height / this.rows);

        this.pos = createVector(this.x * this.width, this.y * this.height);

        this.walls = [true, true, true, true];

        this.links = [];

        this.drawRect = false;

    }

    link(cell, bidi=true) {
        this.links.push(cell);

        if(bidi)
            cell.link(this, false);

    }

    linked(cell) {
        if(this.links.indexOf(cell) != -1)
            return true;
        return false;
    }

    update() {
        stroke(255);
        strokeWeight(4);

        if(this.walls[0])
            line(this.pos.x, this.pos.y, this.pos.x + this.width, this.pos.y);
        if(this.walls[1])
            line(this.pos.x + this.width, this.pos.y, this.pos.x + this.width, this.pos.y + this.height);
        if(this.walls[2])
            line(this.pos.x, this.pos.y + this.height, this.pos.x + this.width, this.pos.y + this.height);
        if(this.walls[3])
            line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + this.height);

        if(this.drawRect) {
            push();
            noStroke();
            fill("#0e1490");
            rect(this.pos.x+1, this.pos.y+1, this.width-1, this.height-1);
            pop();
        }
    }

    addNeighbors() {
        let north = this.index(this.x, this.y -1);
        let east = this.index(this.x + 1, this.y);
        let south = this.index(this.x, this.y + 1);
        let west = this.index(this.x - 1, this.y);

        if(north)
            this.north = north;
        if(east)
            this.east = east;
        if(south)
            this.south = south;
        if(west)
            this.west = west;

    }

    index(x, y) {
        if(x < 0 || x > this.cols - 1 || y < 0 || y > this.rows - 1) {
            return false;
        }
        return createVector(x, y);
    }

    distances() {
      let distances = new Distances(this);

      let frontier = [this];

      while(frontier.length > 0) {
        let new_frontier = [];

        for(let x = 0; x < frontier.length; x++) {
          let cell = frontier[x];
          for(let l = 0; l < cell.links.length; l++) {
            let linked = distances.getDistance(cell.links[l]);

            if(linked !== -1)
              continue;

            distances.cells[linked] = distances.cells[cell] + 1;
            new_frontier.push(linked);
          }

          frontier = new_frontier;
        }

        return distances;
      }
    }


}
