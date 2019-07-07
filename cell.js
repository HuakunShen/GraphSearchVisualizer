const CLEAR_CELL = "clear_cell";
const WALL_CELL = "wall_cell";
const SOURCE_CELL = "source_cell";
const TARGET_CELL = "target_cell";
const DISCOVERED_CELL = "discovered_cell";
const EXPLORED_CELL = "explore_cell";

class Cell {
    constructor(row, col)
    {
        this.row = row;
        this.col = col;
        this.color = CLEAR_COLOR;
        this.type = CLEAR_CELL;
    }

    correspondingCellOnBoard() {
        return board.children[this.row].children[this.col];
    }

}