const cell_dimension = 20;

let board = document.getElementById("board");
let width = 10;
let height = 10;
initialize();

function initialize() {
    initializeBoard();
}

function initializeBoard() {
    for (let row = 0; row < height; row++) {
        let row_div = document.createElement("div");
        row_div.style.display = "flex";
        for (let col = 0; col < width; col++) {
            let cell = document.createElement("div");
            cell.style.width = cell_dimension + "px";
            cell.style.height = cell_dimension + "px";
            cell.style.background = "red";
            cell.style.border = "0.5px solid black";
            cell.setAttribute("data-row", row);
            cell.setAttribute("data-col", col);
            row_div.appendChild(cell);
        }
        board.appendChild(row_div);
    }
}

function applySetting() {
    width = parseInt($("#width_input").val());
    height = parseInt($("#height_input").val());
    initialize();
}