import * as constant from "./constants.js";
import Search, {Cell} from "./search.js";
import Graph from "./graph.js";
import * as helper from './helper_functions.js';

let search, graph, mouse_is_down, requestId;
let game_active = false;
let game_animation = false;
let fps = 50;
let interval = 1000 / fps;
let last = 0;
let width = 20, height = 20;
setup();
initialize();


function setup() {
    game_active = false;
    game_animation = false;
    graph = new Graph();
    // $('#data')[0].style.display = "none";
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

    // for testing, set source and target beforehand
    // graph.update(graph.board[0][0], constant.SOURCE_COLOR);
    // graph.update(graph.board[10][10], constant.TARGET_COLOR);
}


function draw(timeStamp) {
    requestId = requestAnimationFrame(draw);
    if (timeStamp > last) {
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
                cancelAnimationFrame(requestId);
                if (!graph.target.found) {
                    alert("Target Cannot Be Reached");
                }
                helper.appendStat(search);
            }
            if (!game_animation) {
                game_active = false;
            }
        }
        last = timeStamp + interval;
    }
}



function setupCellDiv(cell_div) {
    cell_div.onclick = function (event) {
        updateCell(event);
    };

    cell_div.onmouseover = function (event) {
        if (mouse_is_down) {
            updateCell(event);
        }
    };
    cell_div.addEventListener('contextmenu', function (event) {
        event.preventDefault();
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
    graph.update(cell, color_to_set);
}

function setupBoardSize() {
    let tmp_width = $('#width_input')[0].value;
    let tmp_height = $('#height_input')[0].value;
    if (tmp_width > 150 || tmp_height > 150) {
        alert("Input Dimension is Too Large! At Most 150.");
        return;
    }
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

function initialize() {
    $('#apply_setting')[0].onclick = function () {
        setupBoardSize();
    };
    $('#board')[0].onmousedown = function (event) {
        mouse_is_down = true;
        return false;
    };
    document.onmouseup = function (event) {
        mouse_is_down = false;
        return false;
    };
//
// board.ontouchmove = function (event) {
//     console.log("touch move");
//     console.log(event.target);
//     mouse_is_down = true;
//     updateCell(event);
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
        // clearInterval(interval);
        cancelAnimationFrame(requestId);
        // $('#data')[0].style.display = "none";

    };

    $('#start_search')[0].onclick = function (event) {
        if (graph.source == null || graph.target == null) {
            alert("Source or Target is Not Set");
        } else {
            graph.clearMinorCells();
            graph.target.found = false;
            console.log(graph.source);
            console.log(graph.target);
            search = new Search(graph, $("input[name='search_algo']:checked").val());
            event.target.style.display = 'none';
            $('#step')[0].style.display = 'inline-block';
            $('#animation')[0].style.display = 'inline-block';
            graph.source.distance = 0;
            graph.source.div.innerText = graph.source.distance;
            requestId = requestAnimationFrame(draw);

        }
        // $('#data')[0].style.display = "none";


    };

    $('#random_btn')[0].onclick = function () {
        let randomness = prompt("Enter Randomness of Wall (0-100)", "30");
        randomness = parseInt(randomness);
        if (!randomness) {
            alert("Invalid Input, please input a number between 0 and 100");
            return;
        }
        graph.board.forEach((row) => {
            row.forEach((cell) => {
                if (cell !== graph.source && cell !== graph.target) {
                    cell.clear();
                    if (Math.random() < randomness / 100.0) {
                        cell.update(constant.WALL_COLOR);
                    }
                }
            })
        })
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