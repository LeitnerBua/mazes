class BinaryTree {
	on(gridObj) {
		let cell = gridObj.eachCell();

		let currentCell = cell.next();

        //choose a random neighbor and link them together
		while(!currentCell.done) {

            let neighbors = [];

			if(currentCell.value.north != undefined)
				neighbors.push(gridObj.grid[currentCell.value.north.x][currentCell.value.north.y]);
			if(currentCell.value.east != undefined)
				neighbors.push(gridObj.grid[currentCell.value.east.x][currentCell.value.east.y]);

			let index = floor(random(neighbors.length));
			let neighbor = neighbors[index];

			if(neighbor != undefined)
				neighbor.link(currentCell.value);

			currentCell = cell.next();
		}
	}
}