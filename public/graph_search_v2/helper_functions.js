import * as constant from "./constants.js";
export function setup_ui() {
// setup slide bar
    const slider = document.getElementById("simulator_speed");
    const output = document.getElementById("speed_display");
    output.innerHTML = slider.value;

    slider.oninput = function () {
        output.innerHTML = this.value;
        fps = this.value;
        if (this.value !== "" && this.value !== 0) {
            interval = 1000 / fps;
        }

    };
}

export function getLegalCellsAround(graph, current_cell) {
    const tmp = [-1, 1];
    const board = graph.board;
    const curr_row = current_cell.row;
    const curr_col = current_cell.col;
    let legal_cells = [];
    const legal_color = [constant.UNDISCOVERED_COLOR, constant.TARGET_COLOR];
    // row
    tmp.forEach((offset) => {
        const new_row = curr_row + offset;
        if (new_row >= 0 && new_row < board.length) {
            const new_cell = board[new_row][curr_col];
            if (legal_color.includes(new_cell.color)) {
                legal_cells.push(new_cell);
            }
        }
    });
    // col
    tmp.forEach((offset) => {
        const new_col = curr_col + offset;
        if (new_col >= 0 && new_col < board[0].length) {
            const new_cell = board[curr_row][new_col];
            if (legal_color.includes(new_cell.color)) {
                legal_cells.push(new_cell);
            }
        }
    });
    return legal_cells;
}