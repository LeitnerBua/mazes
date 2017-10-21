class Distances {
  constructor(start) {
    this.start = start;
    this.cells = [start];
  }

  isInCells(cell) {
    if(this.cells.indexOf(cell) != -1) {
      return true;
    }
    return false;
  }


  setDistance(cell, distance) {
    this.cells[cell] = distance;
  }  
}
