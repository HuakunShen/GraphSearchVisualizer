import * as data_structure from "../lib/data_structure.js"
import * as constant from "./constants.js"

export default class Search {
    search_algo;
    graph;
    constructor(graph, mode) {
        console.log("search created " + mode);
        this.graph = graph;
        switch(mode) {
            case "BFS":
                this.search_algo = new BFS();
                break;
            case "DFS":

                break;
            default:

        }
    }

    step() {

    }
}

class BFS {
    constructor() {
        let queue = new data_structure.Queue();
    }
}

class DFS {
    constructor() {

    }
}

export class Cell {
    constructor(div, row, col) {
        this.row = row;
        this.col = col;
        this.color = constant.UNDISCOVERED_COLOR;
        this.wall = false;
        this.div = div;
    }

    update(color) {
        this.color = color;
        this.div.style.backgroundColor = this.color;
    }

}