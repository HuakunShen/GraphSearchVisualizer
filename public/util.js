function cellExists(row, col) {
    return !(row < 0 || col < 0 || col >= width || row >= height);
}

function generateCoordinatesAround(row, col) {
    let coordinates = [];
    coordinates.push([row - 1, col]);
    coordinates.push([row + 1, col]);
    coordinates.push([row, col - 1]);
    coordinates.push([row, col + 1]);
    return coordinates;
}

function getLegalCells(row, col) {
    let legal_cells = [];
    let coordinates = generateCoordinatesAround(row, col);
    // console.log(coordinates);
    coordinates.forEach(function (coordinate) {
        if (cellExists(coordinate[0], coordinate[1])) {
            let curr_cell = graph[coordinate[0]][coordinate[1]];
            if (curr_cell.type !== EXPLORED_CELL && curr_cell.type !== DISCOVERED_CELL && curr_cell.type !== SOURCE_CELL) {
            // if (!(curr_cell.type in [EXPLORED_CELL, DISCOVERED_CELL, SOURCE_CELL, TARGET_CELL])) {
                legal_cells.push(graph[coordinate[0]][coordinate[1]]);
            }
        }
    });
    return legal_cells;

}

function getElementPosition(element) {
    return [element.getAttribute("data-row"), element.getAttribute("data-col")];
}

function updateCellColor(element) {
    graph[element.getAttribute("data-row")][element.getAttribute("data-col")].color = element.style.backgroundColor;
}

function updateCellAttrubutes(element) {
    let cell = graph[element.getAttribute("data-row")][element.getAttribute("data-col")];
    cell.color = element.style.backgroundColor;
    cell.type = color_to_type_dict[cell.color];
    if (cell.type === SOURCE_CELL) {
        source = cell;
    } else if (cell.type === TARGET_CELL) {
        target = cell;
    }
}

function syncAllCellsProperties() {
    Array.from(board.children).forEach(function (row) {
        Array.from(row.children).forEach(function (cell_div) {
            updateCellAttrubutes(cell_div);
        })
    })
}

function syncAllCellDivsColor() {
    graph.forEach(function (row) {
        row.forEach(function (cell) {
            getCellFromBoard(cell.row, cell.col).backgroundColor = cell.color;
        });
    })
}

function clearBoard() {
    Array.from(board.children).forEach(function (row) {
        Array.from(row.children).forEach(function (cell) {
            cell.style.backgroundColor = "white";
            updateCellColor(cell);
            cell.innerHTML = "";
        })
    })
}

function replaceColorOnBoard(original_color, destination_color) {
    Array.from(board.children).forEach(function (row) {
        Array.from(row.children).forEach(function (cell) {
            if (cell.style.backgroundColor === original_color) {
                cell.style.backgroundColor = destination_color;
                updateCellColor(cell);
            }
        })
    })
}

function getCellFromBoard(row, col) {
    return board.children[row].children[col];
}

function getCellByColor(color) {
    graph.forEach(function (row) {
        row.forEach(function (cell) {
            if (cell.color === color) {
                return cell;
            }
        })
    });
    return null;
}

function sourceTargetIsSet() {
    if (source === undefined || source === null) {
        alert("Source node not set!");
        return false;
    } else if (target === undefined || target === null) {
        alert("Target node not set!");
        return false;
    } else {
        return true;
    }
}


function timer(func, num, stop) {
    num /= 2;
    if (num < 1) {
        num = 1;
    }
    let prev = 0;
    let curr = new Date().getMilliseconds();
    let count = 0;
    let display_count = 0;
    while (1) {
        prev = curr;
        curr = new Date().getMilliseconds();
        if (curr % 2 === 0) {
            if (prev != curr) {
                // func(count);
                // console.log(count);
                count++;
            }
        }
        if (count === num) {
            func();
            // console.log(display_count);
            display_count++;
            count = 0;
        }
        if (display_count > 1000) {
            display_count = 0;
        }
        if (display_count === stop) {
            return;
        }

    }
}