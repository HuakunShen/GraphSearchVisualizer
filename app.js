const cell_dimension = 20;
let graph = [];
let board = document.getElementById("board");
let width = 20;
let height = 20;
let mouse_is_down = false;
initialize();

function initialize() {
    initializeBoard();
    board.onmousedown = function (event) {
        mouse_is_down = true;
        return false;
    };
    board.onmouseup = function (event) {
        mouse_is_down = false;
    };
}

function initializeBoard() {
    for (let row = 0; row < height; row++) {
        let row_div = document.createElement("div");
        row_div.style.display = "flex";
        let row_graph = [];
        for (let col = 0; col < width; col++) {
            let cell_div = document.createElement("div");
            cell_div.style.width = cell_dimension + "px";
            cell_div.style.height = cell_dimension + "px";
            cell_div.setAttribute("data-row", row);
            cell_div.setAttribute("data-col", col);
            cell_div.classList.add("cell");
            setCellEventListener(cell_div);

            row_div.appendChild(cell_div);

            let cell = Cell(row, col);
            row_graph.push(cell);
        }
        board.appendChild(row_div);
        graph.push(row_graph);
    }
}

function setCellEventListener(cell_div) {
    cell_div.onclick = cellClicked;
    cell_div.onmouseover = cellHovered;
}

function cellClicked(event) {
    setCellColor(event);
}

function cellHovered(event) {
    if (mouse_is_down) {
        setCellColor(event);
    }

}

function setCellColor(event) {
    const radioValue = $("input[name='mode']:checked").val();
    if (radioValue) {
        if (radioValue === "wall") {
            event.target.style.backgroundColor = "blue";
        } else if (radioValue === "clear") {
            event.target.style.backgroundColor = "white";
        }
    }
}

function clearBoard() {
    Array.from(board.children).forEach(function (row) {
        Array.from(row.children).forEach(function (cell) {
            cell.style.backgroundColor = "white";
        })
    })

}

function applySetting() {
    width = parseInt($("#width_input").val());
    height = parseInt($("#height_input").val());
    if (width < 1 || height < 1 || isNaN(width) || isNaN(height)) {
        alert("Dimension Input Must Be Positive Integer And Cannot Be Empty! \nPlease Enter Again.");
        $("#width_input")[0].value = "";
        $("#height_input")[0].value = "";
    } else {
        Array.from(board.children).forEach(function (div) {
            div.remove();
        });
        initialize();
    }
}