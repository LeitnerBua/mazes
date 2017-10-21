let grid;

let sidewinder;

let gridX;
let gridY;

let run = [];

let fr = 60;

let p;

let rows = 20;
let cols = 20;

let startMaze = false;

let runBtn;
let resetBtn;

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent("maze");

    initMap();

    p = createP("");

    runBtn = document.getElementById("run");
    resetBtn = document.getElementById("reset");

    checkBtns();
}

function draw() {
    background(0);

    if(startMaze) {
        let s = runMaze();
    }

    p.html(fr);
    for(let x = 0; x < grid.columns; x++) {
        for(let y = 0; y < grid.rows; y++) {
            grid.grid[x][y].update();
        }
    }
}

function initMap() {
    gridX = 0;
    gridY = 0;
    grid = new Grid(20, 20);

    sidewinder = new Sidewinder(grid);
    sidewinder.on();
}

function checkBtns() {
    runBtn.addEventListener('click', function(event) {
        if(startMaze) {
            runBtn.innerHTML = "run"
            }
            else {
                runBtn.innerHTML = "pause";
            }
        startMaze = !startMaze;
    });

    resetBtn.addEventListener('click', function(event) {
        initMap();
    });
}

function runMaze() {
    if(gridX < grid.columns && gridY < grid.rows) {

        sidewinder.show(gridX, gridY);

        if(gridX >= grid.columns-1) {

            gridX = 0;
            gridY++;
        } else {
            gridX++;
        }
    }
}
