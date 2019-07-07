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

function getLegalPos(row, col) {
    let legal_pos = [];
    let coordinates = generateCoordinatesAround(row, col);
    // console.log(coordinates);
    coordinates.forEach(function(coordinate) {
        if (cellExists(coordinate[0], coordinate[1])) {
            console.log(coordinate);
            if (getCellFromBoard(coordinate[0], coordinate[1]).style.backgroundColor === UNDISCOVERED) {
                legal_pos.push(coordinate);
            }
        }
    });
    return legal_pos;

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
    switch(element.style.backgroundColor) {
        case WALL_COLOR:
            cell.type = WALL_CELL;
            break;
        case CLEAR_COLOR:
            cell.type = 
        case UNDISCOVERED:
            cell.type = DISCOVERED_CELL;
            break;
        case SOURCE_COLOR:
            cell.type = SOURCE_CELL;
            break;
        case TARGET_COLOR:
            cell.type = TARGET_CELL;
            break;
        default:
        // code block
    }

    if (element.style.backgroundColor === UNDISCOVERED) {
        cell.type = DISCOVERED_CELL;
    }
}

function syncAllCellColor() {
    Array.from(board.children).forEach(function (row) {
        Array.from(row.children).forEach(function (cell) {
            updateCellColor(cell);
        })
    })
}

function clearBoard() {
    Array.from(board.children).forEach(function (row) {
        Array.from(row.children).forEach(function (cell) {
            cell.style.backgroundColor = "white";
            updateCellColor(cell);
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
    graph.forEach(function(row) {
        row.forEach(function(cell) {
            if (cell.color === color) {
                return cell;
            }
        })
    });
    return null;
}