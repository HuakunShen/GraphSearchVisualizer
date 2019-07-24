import * as constant from "./constants.js"

export default class Graph {
    constructor() {
        this.board = [];
        this.source = null;
        this.target = null;
    }

    update(cell, color) {
        switch (color) {
            case constant.SOURCE_COLOR:
                if (this.source) {
                    this.source.update(constant.CLEAR_COLOR);
                }
                this.source = cell;
                this.source.update(constant.SOURCE_COLOR);
                break;
            case constant.TARGET_COLOR:
                if (this.target) {
                    this.target.update(constant.CLEAR_COLOR);
                }
                this.target = cell;
                this.target.update(constant.TARGET_COLOR);
                break;
            default:
                cell.update(color)
        }
    }

    clearBoard() {
        this.source = null;
        this.target = null;
        this.board.forEach(function (row) {
            row.forEach(function (cell) {
                cell.clear();
            });
        });
    }

    clearMinorCells() {
        const source = this.source;
        const target = this.target;
        this.board.forEach(function (row) {
            row.forEach(function (cell) {
                if (cell !== source && cell !== target && cell.color !== constant.WALL_COLOR) {
                    cell.clear();
                }
                cell.div.innerText = "";
            });
        });
        source.div.innerText = "";
        target.div.innerText = "";
    }

    initializeA_StarCellCost(value=Infinity) {
        this.board.forEach((row) => {
            row.forEach((cell) => {
                cell.g_val = value;
                cell.cost = value;
                cell.parent = null;

            });
        });
    }
}