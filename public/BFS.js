let queue = new Queue();
let distance = 0;
function successorCells(cell) {
    let successors = getLegalPos(cell.row, cell.col);
    return successors;
}

function startBFSsearch() {
    queue.enqueue(source);
    distance = 0;
    BFS_search();


    // search ends
    search_active = false;
    return true;
}

function BFS_search() {
    let interval = window.setInterval(function() {
        console.log("test");
    }, 1000);

}