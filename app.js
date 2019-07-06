const cell_dimension = 20;
let graph = [];
let board = document.getElementById("board");
let width = 20;
let height = 20;
let mouse_is_down = false;
let button_clicked = 0;
initialize();

function initialize() {
    initializeBoard();
    document.onmousedown = board.onmousedown = function (event) {
        mouse_is_down = true;
        button_clicked = event.button;
        if (button_clicked === 2) {
            $("#clear")[0].checked = true;
        } else if (button_clicked === 0) {
            $("#wall")[0].checked = true;
        }
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
    cell_div.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        cellClicked(event);
        $("input[name='mode']").value = "clear";

        return false;
    }, false);
    // cell_div.onmousedown = function (event) {
    //     if (event.button === 0) {
    //
    //     }
    // }
}


function cellClicked(event) {
    // console.log(button_clicked);
    setCellColor(event);
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
    // const radioValue = $("input[name='mode']:checked").val();
    // if (radioValue) {
    //     if (radioValue === "wall") {
    //         event.target.style.backgroundColor = "#70a1ff";
    //     } else if (radioValue === "clear") {
    //         event.target.style.backgroundColor = "white";
    //     }
    // }
    if (button_clicked === 0) {
        event.target.style.backgroundColor = "#70a1ff";
    } else if (button_clicked === 2) {
        event.target.style.backgroundColor = "white";
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