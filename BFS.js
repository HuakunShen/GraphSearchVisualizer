let queue = [];

function successorCells(cell) {
    let successors = getLegalPos(cell.row, cell.col);
    return successors;
}

function startBFSsearch() {

}