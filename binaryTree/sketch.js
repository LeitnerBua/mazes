let grid;

let binaryTree;

let gridX = 0;
let gridY = 0;

function setup() {
    createCanvas(600, 600);
    grid = new Grid(20, 20);

    binaryTree = new BinaryTree();

    frameRate(30);

    binaryTree.on(grid);
    

}

function draw() {
    background(0);
    for(let x = 0; x < grid.columns; x++) {
        for(let y = 0; y < grid.rows; y++) {
            grid.grid[x][y].update();
        }
    }  

    if(gridX < grid.columns && gridY < grid.rows) {
        grid.generateMaze(gridX, gridY);

        if(gridX >= grid.columns-1) {

            gridX = 0;
            if(gridY > grid.rows -1){
                noLoop();
            }

            else {
                gridY++;
            }
        } else {
            gridX++;
        }
    }
}