function cellExists(row, col) {
    if (row < 0  || col < 0 || col >= width || row >= height) {
        return false;
    }
    return true;
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
