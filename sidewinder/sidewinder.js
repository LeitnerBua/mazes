class Sidewinder {

	constructor(gridObj) {
		this.gridObj = gridObj;
	}

	on() {
		for(let y = 0; y < this.gridObj.rows; y++) {
			let run = [];
			for(let x = 0; x < this.gridObj.columns; x++) {
				let cell = this.gridObj.grid[x][y];
				run.push(cell);

				let at_eastern_boundary = x === this.gridObj.rows -1;
				let at_north_boundary = y === 0;

				let should_close_out = at_eastern_boundary || (!at_north_boundary && floor(random(2)) === 0);

				if(should_close_out) {
					let member = run[floor(random(run.length))];
					if(member.north != undefined) {
						member.link(this.gridObj.grid[member.north.x][member.north.y]);
					}

					run = [];
				} else {
					if(cell.east != undefined) {
						cell.link(this.gridObj.grid[cell.east.x][cell.east.y]);
					}
				}
			}
		}
	}

	show(x, y) {
		let cell = this.gridObj.grid[x][y];
		//cell.drawRect = true;

		let cellNorth;
		let cellEast;

		if(cell.north != undefined) {
			cellNorth = this.gridObj.grid[cell.north.x][cell.north.y];
		}

		if(cell.east != undefined) {
			cellEast = this.gridObj.grid[cell.east.x][cell.east.y];
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