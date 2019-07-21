import * as constant from "./constants.js"

export default class Graph {
    source;
    target;
    board;

    constructor() {
        this.board = [];
        this.source = null;
        this.target = null;
    }

    updateUnique(cell, color) {
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
                    source.update(constant.CLEAR_COLOR);
                }
                this.target = cell;
                this.target.update(constant.TARGET_COLOR);
                break;
            default:
        }
    }

    clearBoard() {
        this.source = null;
        this.target = null;
        this.board.forEach(function (row) {
            row.forEach(function (cell) {
                cell.update(constant.CLEAR_COLOR);
            });
        });
    }


}