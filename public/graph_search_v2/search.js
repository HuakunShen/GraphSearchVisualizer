import * as data_structure from "../lib/data_structure.js";
import * as constant from "./constants.js";
import * as helper from "./helper_functions.js";

export default class Search {
    search_algo;
    graph;

    constructor(graph, mode) {
        console.log("search created " + mode);
        this.graph = graph;
        switch (mode) {
            case "BFS":
                this.search_algo = new BFS(this.graph);
                console.log("BFS Created");
                break;
            case "DFS":

                break;
            default:

        }
    }

    step() {
        return this.search_algo.step();
    }
}

class BFS {
    constructor(graph) {
        this.graph = graph;
        this.queue = new data_structure.Queue();
        this.current_cell = graph.source;
        this.queue.enqueue(this.current_cell);
        this.path_complete = false;
    }

    step() {
        if (!this.queue.isEmpty()) {
            const distance_to_stop = this.current_cell.distance + 1;
            while (!this.queue.isEmpty()) {
                this.current_cell = this.queue.dequeue();
                if (this.current_cell.distance === distance_to_stop) {
                    this.queue.enqueue(this.current_cell);
                    break;
                }
                if (this.current_cell === this.graph.target) {
                    this.queue.clear();
                } else {
                    const legal_cells = helper.getLegalCellsAround(this.graph, this.current_cell);
                    // console.log(legal_cells);
                    legal_cells.forEach((new_cell) => {
                        if (new_cell.color === constant.UNDISCOVERED_COLOR) {
                            new_cell.update(constant.DISCOVERED_COLOR);
                        }
                        this.queue.enqueue(new_cell);
                        new_cell.parent = this.current_cell;
                        new_cell.distance = this.current_cell.distance + 1;
                        new_cell.div.innerText = new_cell.distance;
                    });
                    if (this.current_cell !== this.graph.source) {
                        this.current_cell.update(constant.EXPLORED_COLOR);
                    }
                }
            }
        } else {
            // backtrace the path
            if (this.current_cell.parent != null) {
                this.current_cell = this.current_cell.parent;
            }
            if (this.current_cell !== this.graph.source) {
                this.current_cell.update(constant.PATH_COLOR);
            } else {
                this.path_complete = true;
                return true;
            }
        }
        return false;
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
        if (this.color === constant.UNDISCOVERED_COLOR) {
            this.div.innerText = "";
        }
    }

    clear() {
        this.color = constant.UNDISCOVERED_COLOR;
        this.div.style.backgroundColor = this.color;
        this.div.innerText = "";
    }

}