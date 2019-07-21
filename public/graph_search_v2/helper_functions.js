import * as constant from "./constants.js";
import {Cell} from "./search.js";
export function button_click() {
    // game_active = true;
    console.log("clicked");
}
export function setup_ui() {
    $("button")[0].onclick = button_click;
}

export function createBoard(width, height) {
    let board = $('#board')[0];
    let graph = [];
    for (let row = 0; row < height; row++) {
        let row_div = document.createElement("div");
        let row_graph = [];
        row_div.style.display = "flex";
        for (let col = 0; col < width; col++) {
            let cell_div = document.createElement("div");
            cell_div.style.width = constant.cell_dimension + "px";
            cell_div.style.height = constant.cell_dimension + "px";
            cell_div.setAttribute("data-row", row.toString());
            cell_div.setAttribute("data-col", col.toString());
            cell_div.style.backgroundColor = constant.UNDISCOVERED_COLOR;
            cell_div.classList.add("cell");
            row_div.appendChild(cell_div);
            row_graph.push(new Cell(cell_div, row, col));
        }
        board.appendChild(row_div);
        graph.push(row_graph);
    }
    return graph;
}
