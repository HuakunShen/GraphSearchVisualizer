let queue;
let distance;
let time_intercal;
let target_found;
let curr_cell;
let cell_exploring;
let updateBFS_done;

function getSuccessorCells(cell) {
    let successors = getLegalCells(cell.row, cell.col);
    return successors;
}

function startBFSsearch() {
    // queue.enqueue(source);
    // distance = 0;
    BFS_search();
    if (target.isFound === undefined) {
        setTimeout(()=>{alert("Target Can Not Be Reached!");}, 100);

    }

    // search ends
    // window.clearInterval(time_intercal);
    search_active = false;
    return true;
}

function BFS_search() {
    target_found = false;
    graph.forEach(function (row) {
        row.forEach(function (cell) {
            cell.d = Infinity;
        });
    });
    // source.color = DISCOVERED_COLOR;
    // source.type = DISCOVERED_CELL;
    source.d = 0;
    getCellFromBoard(source.row, source.col).innerText = source.d;
    // syncAllCellDivsColor();
    // distance = 0;
    queue = new Queue();
    queue.enqueue(source);

    while (!queue.isEmpty() && !target_found) {
        cell_exploring = queue.dequeue();
        let successor_cells = getSuccessorCells(cell_exploring);
        // console.log("successor cells:" + successor_cells);

        successor_cells.forEach(function (cell) {
            curr_cell = cell;
            updateBFS();
        });
        if (cell_exploring.type !== SOURCE_CELL) {
            cell_exploring.type = EXPLORED_CELL;
            cell_exploring.color = EXPLORED_COLOR;
            getCellFromBoard(cell_exploring.row, cell_exploring.col).style.backgroundColor = EXPLORED_COLOR;
        }
    }
}

function updateBFS() {
    if ((curr_cell.type === UNDISCOVERED_CELL || curr_cell.type === TARGET_CELL)) {

        if (curr_cell.type === TARGET_CELL) {
            target_found = true;
            console.log("found");
            target.isFound = true;
        } else {
            curr_cell.type = DISCOVERED_CELL;
            curr_cell.color = DISCOVERED_COLOR;
            getCellFromBoard(curr_cell.row, curr_cell.col).style.backgroundColor = DISCOVERED_COLOR;
        }
        getCellFromBoard(curr_cell.row, curr_cell.col).style.color = "white";
        curr_cell.d = cell_exploring.d + 1;
        getCellFromBoard(curr_cell.row, curr_cell.col).innerText = curr_cell.d;
        queue.enqueue(curr_cell);
    }
    updateBFS_done = true;
}