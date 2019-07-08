let queue;
let distance;
let time_intercal;
let target_found;
let playback_interval;
let updateBFS_done;
let record_queue;

function getSuccessorCells(cell) {
    let successors = getLegalCells(cell.row, cell.col);
    return successors;
}

function startBFSsearch() {
    record_queue = new Queue();
    target_found = false;
    search_active = true;
    replaceColorOnBoard(EXPLORED_COLOR, UNDISCOVERED_COLOR);
    replaceColorOnBoard(DISCOVERED_COLOR, UNDISCOVERED_COLOR);
    cleanBoard();
    target.isFound = false;
    BFS_search();
    if (target.isFound === undefined || target.isFound === false) {
        setTimeout(() => {
            alert("Target Can Not Be Reached!");
        }, 100);

    }
    // search ends


    // playback
    playback_interval = setInterval(()=>{
        let record = record_queue.dequeue();
        if (record) {
            if (record.backgroundColor) {
                record.cell_div.style.backgroundColor = record.backgroundColor;
            }
            if (record.text) {
                record.cell_div.innerText = record.text;
            }
            if (record.textColor) {
                record.cell_div.style.color = record.textColor;
            }
        }

        if (record_queue.isEmpty() || search_active) {
            console.log("terminate");
            clearInterval(playback_interval);
            record_queue.clear();
            console.log(record_queue.isEmpty());
        }
    // }, 1 / $('#simulator_speed').val() * 100);
    }, $('#simulator_speed').val() < 50 ? 1 / $('#simulator_speed').val() * 2000 : 1 / $('#simulator_speed').val());

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

    while (!queue.isEmpty() && !target_found && search_active) {
        // console.log("entered");
        let cell_exploring = queue.dequeue();
        let successor_cells = getSuccessorCells(cell_exploring);
        // console.log("successor cells:" + successor_cells);
        let curr_cell;
        successor_cells.forEach(function (cell) {
            curr_cell = cell;
            if ((curr_cell.type === UNDISCOVERED_CELL || curr_cell.type === TARGET_CELL)) {
                if (curr_cell.type === TARGET_CELL) {
                    target_found = true;
                    console.log("found");
                    target.isFound = true;
                } else {
                    curr_cell.type = DISCOVERED_CELL;
                    curr_cell.color = DISCOVERED_COLOR;
                    // getCellFromBoard(curr_cell.row, curr_cell.col).style.backgroundColor = DISCOVERED_COLOR;
                }
                // getCellFromBoard(curr_cell.row, curr_cell.col).style.color = "white";
                curr_cell.d = cell_exploring.d + 1;
                // getCellFromBoard(curr_cell.row, curr_cell.col).innerText = curr_cell.d;
                queue.enqueue(curr_cell);
                let record = new Record(getCellFromBoard(curr_cell.row, curr_cell.col), curr_cell.type === TARGET_CELL ? TARGET_COLOR : DISCOVERED_COLOR, curr_cell.d.toString(), "white");
                record_queue.enqueue(record);
            }
            updateBFS_done = true;
        });
        if (cell_exploring.type !== SOURCE_CELL) {
            cell_exploring.type = EXPLORED_CELL;
            cell_exploring.color = EXPLORED_COLOR;
            // getCellFromBoard(cell_exploring.row, cell_exploring.col).style.backgroundColor = EXPLORED_COLOR;
            let record = new Record(getCellFromBoard(cell_exploring.row, cell_exploring.col), EXPLORED_COLOR, null, null);
            record_queue.enqueue(record);
        }
    }
}
