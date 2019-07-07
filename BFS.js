let queue = new Queue();
function successorCells(cell) {
    let successors = getLegalPos(cell.row, cell.col);
    return successors;
}

function startBFSsearch() {
    // find the source element
    source = getCellByColor(SOURCE_COLOR);
    if (source === null) {
        alert("Source Node Is Not Selected!");
        return false;
    }
    // find the target element
    target = getCellByColor(TARGET_COLOR);
    if (target === null) {
        alert("Source Node Is Not Selected!");
        return false;
    }




    search_active = false;
    return true;
}