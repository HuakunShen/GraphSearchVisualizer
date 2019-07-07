const cell_dimension = 20;
let graph = [];
let board = document.getElementById("board");
let width = 20;
let height = 20;
let mouse_is_down = false;
let button_clicked = 0;
let search_active = false;
const WALL_COLOR = "rgb(0, 168, 255)";
const CLEAR_COLOR = "white";
const UNDISCOVERED = "white";
const DISCOVERED = "rgb(113, 128, 147)";
const EXPLORED = "black";
const SOURCE_COLOR = "red";
const TARGET_COLOR = "rgb(68, 189, 50)";


initialize();

function initialize() {
    initializeBoard();
    // document.onmousedown = board.onmousedown = function (event) {
    board.onmousedown = function (event) {
    mouse_is_down = true;
    button_clicked = event.button;
        // if (button_clicked === 2) {
        //     $("#clear")[0].checked = true;
        // } else if (button_clicked === 0) {
        //     $("#wall")[0].checked = true;
        // }
    return false;
    };
    document.onmouseup = board.onmouseup = function (event) {
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
    // alert(radioValue);
    // if (radioValue === "source") {
    //     replaceColorOnBoard(SOURCE_COLOR, CLEAR_COLOR);
    //     event.target.style.backgroundColor = SOURCE_COLOR;
    //     // alert("");
    // } else if (radioValue === "target") {
    //     replaceColorOnBoard(TARGET_COLOR, CLEAR_COLOR);        
    //     event.target.style.backgroundColor = TARGET_COLOR;
    // }

    if (radioValue === "target") {
        replaceColorOnBoard(TARGET_COLOR, CLEAR_COLOR);        
        event.target.style.backgroundColor = TARGET_COLOR;
    } else if (radioValue === "source") {
        replaceColorOnBoard(SOURCE_COLOR, CLEAR_COLOR);
        event.target.style.backgroundColor = SOURCE_COLOR;
    }
    updateCellColor(event.target);
}

function cellHovered(event) {
    if (mouse_is_down) {
        setCellColor(event);
        // if (button_clicked === 0) {
        //     event.target.style.backgroundColor = "#70a1ff";
        // } else if (button_clicked === 2) {
        //     event.target.style.backgroundColor = "white";
        // }
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
        updateCellColor(event.target);

    }
    // if (button_clicked === 0) {
    //     event.target.style.backgroundColor = "#70a1ff";
    // } else if (button_clicked === 2) {
    //     event.target.style.backgroundColor = "white";
    // }
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
    // alert(radioValue);
    search_active = true;
}