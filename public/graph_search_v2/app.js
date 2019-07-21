import * as helper from "./helper_functions.js";
// import * as data_structure from "/lib/data_structure.js"
import * as constant from "./constants.js"
import Search from "./search.js"
import {Cell} from "./search.js";
import Graph from "./graph.js";
let search, graph;
let mouse_is_down;
let game_active = false;

let width = 20, height = 20;
setup();
setInterval(function () {
    draw();
}, 33);


function setup() {
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

    search = new Search(graph, "BFS");
    board.onmousedown = function(event) {
        mouse_is_down = true;
        return false;
    };
    board.onmouseup = function(event) {
        mouse_is_down = false;
    };

    $('#clear_board')[0].onclick = function() {
        graph.clearBoard();
    }

}

function draw() {
    if (game_active) {
        console.log("hi");
        game_active = false;
    }

}

function setupCellDiv(cell_div) {
    cell_div.onclick = function(event) {
        console.log("mouse is clicked");
        game_active = true;
        updateCell(event);
    };

    cell_div.onmouseover = function(event) {
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
            graph.updateUnique(cell, constant.SOURCE_COLOR);
            break;
        case "target":
            color_to_set = constant.TARGET_COLOR;
            graph.updateUnique(cell, constant.SOURCE_COLOR);
            break;
        default:
    }
    // console.log(select_mode_val);

    cell.update(color_to_set);

}