import * as constant from "./constants.js";
import Search, {Cell} from "./search.js";
import Graph from "./graph.js";

let search, graph;
let mouse_is_down;
let game_active = false;
let game_animation = false;
let interval;
let frame_rate = 45;

let width = 20, height = 20;
setup();

// setup slide bar
const slider = document.getElementById("simulator_speed");
const output = document.getElementById("speed_display");
output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
    frame_rate = this.value;
    // console.log("frame rage: " + frame_rate);
    if (animation) {
        clearInterval(interval);
        setRepeat();
    }

};


$('#apply_setting')[0].onclick = function () {
    setupBoardSize();
};
board.onmousedown = function (event) {
    mouse_is_down = true;
    return false;
};
document.onmouseup = function (event) {
    mouse_is_down = false;
    return false;
};

// board.ontouchmove = function (event) {
//     mouse_is_down = true;
//     return false;
// };

$('#clear_board')[0].onclick = function () {
    graph.clearBoard();
    search = null;
    game_active = game_animation = false;
    $('#step')[0].style.display = 'none';
    $('#animation')[0].style.display = 'none';
    $('#animation')[0].innerText = 'Animation';
    $('#start_search')[0].style.display = 'inline-block';
    clearInterval(interval);
};

$('#start_search')[0].onclick = function (event) {
    if (graph.source == null || graph.target == null) {
        alert("Source or Target is Not Set");
    } else {
        graph.clearMinorCells();
        search = new Search(graph, $("input[name='search_algo']:checked").val());
        event.target.style.display = 'none';
        $('#step')[0].style.display = 'inline-block';
        $('#animation')[0].style.display = 'inline-block';
        graph.source.distance = 0;
        graph.source.div.innerText = graph.source.distance;
        clearInterval(interval);
        setRepeat();
    }
};

$('#step')[0].onclick = function (event) {
    game_active = true;
};

$('#animation')[0].onclick = function (event) {
    if (game_animation) {
        event.target.innerText = "Resume";
        game_animation = false;
    } else {
        event.target.innerText = "Pause";
        game_animation = true;
        game_active = true;
    }
};

function setup() {
    game_active = false;
    game_animation = false;
    graph = new Graph();
    // graph = helper.createBoard(width, height);
    let board = $('#board')[0];
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
            setupCellDiv(cell_div);
            row_div.appendChild(cell_div);
            row_graph.push(new Cell(cell_div, row, col));
        }
        board.appendChild(row_div);
        graph.board.push(row_graph);
    }

    // search = new Search(graph, "BFS");

}


function draw() {
    console.log("interval active");
    if (game_active) {
        let ret = search.step();
        if (ret) {
            // search done
            game_active = false;
            game_animation = false;
            $('#step')[0].style.display = 'none';
            $('#animation')[0].style.display = 'none';
            $('#animation')[0].innerText = 'Animation';
            $('#start_search')[0].style.display = 'inline-block';
            clearInterval(interval);
        }
        if (!game_animation) {
            game_active = false;
        }
    }

}

function setupCellDiv(cell_div) {
    cell_div.onclick = function (event) {
        console.log("mouse is clicked");
        // game_active = true;
        updateCell(event);
    };

    cell_div.onmouseover = function (event) {
        if (mouse_is_down) {
            console.log("mouse is down");
            updateCell(event);
        }
    };
    cell_div.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        // cellClicked(event);
        // $("input[name='mode']").value = "clear";

        return false;
    }, false);
}

function updateCell(event) {
    const target = event.target;
    const row = target.getAttribute('data-row');
    const col = target.getAttribute('data-col');
    const cell = graph.board[row][col];
    const select_mode_val = $("input[name='select_mode']:checked").val();
    let color_to_set;
    switch (select_mode_val) {
        case "wall":
            color_to_set = constant.WALL_COLOR;
            break;
        case "clear":
            color_to_set = constant.CLEAR_COLOR;
            break;
        case "source":
            color_to_set = constant.SOURCE_COLOR;
            break;
        case "target":
            color_to_set = constant.TARGET_COLOR;
            break;
        default:
    }
    // console.log(select_mode_val);

    graph.update(cell, color_to_set);

}

function setupBoardSize() {
    let tmp_width = $('#width_input')[0].value;
    let tmp_height = $('#height_input')[0].value;
    if (tmp_width === "" || tmp_height === "") {
        alert("Width and Height Not Input");
    } else {
        width = tmp_width;
        height = tmp_height;
        graph.board.forEach((row) => {
            row.forEach((cell) => {
                cell.div.remove();
            });
        });
        setup();
    }
}

function setRepeat() {
    interval = setInterval(function () {
        draw();
    }, 1000.0 / frame_rate);
}