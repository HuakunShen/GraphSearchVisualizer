const cell_dimension = 20;
let graph = [];
let board = document.getElementById("board");
let width = 20;
let height = 20;
let mouse_is_down = false;
let button_clicked = 0;
let search_active = false;
let source;
let target;
const WALL_COLOR = "rgb(0, 168, 255)";
const CLEAR_COLOR = "white";
const UNDISCOVERED_COLOR = "white";
const DISCOVERED_COLOR = "rgb(113, 128, 147)";
const EXPLORED_COLOR = "black";
const SOURCE_COLOR = "red";
const TARGET_COLOR = "rgb(68, 189, 50)";
let color_to_type_dict = [];
let type_to_color_dict = [];

initialize();

function initialize() {
    initializeBoard();
    board.onmousedown = function (event) {
        mouse_is_down = true;
        button_clicked = event.button;
        return false;
    };
    document.onmouseup = board.onmouseup = function (event) {
        mouse_is_down = false;
    };

    type_to_color_dict[WALL_CELL] = WALL_COLOR;
    type_to_color_dict[CLEAR_CELL] = CLEAR_COLOR;
    type_to_color_dict[UNDISCOVERED_CELL] = UNDISCOVERED_COLOR;
    type_to_color_dict[DISCOVERED_CELL] = DISCOVERED_COLOR;
    type_to_color_dict[EXPLORED_CELL] = EXPLORED_COLOR;
    type_to_color_dict[SOURCE_CELL] = SOURCE_COLOR;
    type_to_color_dict[TARGET_CELL] = TARGET_COLOR;

    for (let key in type_to_color_dict) {
        color_to_type_dict[type_to_color_dict[key]] = key;
    }


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
            cell_div.style.backgroundColor = CLEAR_COLOR;
            cell_div.classList.add("cell");
            setCellEventListener(cell_div);

            row_div.appendChild(cell_div);

            let cell = new Cell(row, col);
            row_graph.push(cell);
            cell.color = CLEAR_COLOR;
        }
        board.appendChild(row_div);
        graph.push(row_graph);
    }
}

function setCellEventListener(cell_div) {
    cell_div.onclick = cellClicked;
    cell_div.onmouseover = cellHovered;
    cell_div.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        cellClicked(event);
        $("input[name='mode']").value = "clear";

        return false;
    }, false);
}


function cellClicked(event) {
    setCellColor(event);
    const radioValue = $("input[name='mode']:checked").val();

    if (radioValue === "target") {
        replaceColorOnBoard(TARGET_COLOR, CLEAR_COLOR);
        event.target.style.backgroundColor = TARGET_COLOR;
    } else if (radioValue === "source") {
        replaceColorOnBoard(SOURCE_COLOR, CLEAR_COLOR);
        event.target.style.backgroundColor = SOURCE_COLOR;
    }
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
            event.target.style.backgroundColor = WALL_COLOR;
            const div_pos = getElementPosition(event.target);
            graph[div_pos[0]][div_pos[1]].color = WALL_COLOR;
        } else if (radioValue === "clear") {
            event.target.style.backgroundColor = CLEAR_COLOR;
        }
    }
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

function startSearchClicked() {
    const radioValue = $("input[name='search_mode']:checked").val();
    syncAllCellsProperties();
    search_active = true;
    switch(radioValue) {
        case "BFS":
            if (!sourceTargetIsSet()) {
                break;
            }
            startBFSsearch();
            break;
        default:
            console.log("no search selected");
    }
}