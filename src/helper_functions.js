import * as constant from "./constants.js";

export function appendStat(search) {
    function greyOutPreviousStat() {
        let paragraphs = $("#data-content p");
        for (let i = paragraphs.length - 1; i > -1 && i > paragraphs.length - 10; i--) {
            paragraphs[i].style.color = "grey";
        }
    }

    greyOutPreviousStat();
    const data_display = $("#data-content")[0];
    data_display.appendChild(createElement('p', search.mode));
    data_display.appendChild(createElement('p', "Total Searched: " + search.data.total_searched));
    data_display.appendChild(createElement('p', "Total Discovered: " + search.data.total_discovered));
    data_display.appendChild(createElement('p', "Path Length: " + search.data.path_length));
    data_display.appendChild(createElement('br'));
    scrollToBottom("data-content");
}


export function getLegalCellsAround(graph, current_cell) {
    const tmp = [-1, 1];
    const board = graph.board;
    const curr_row = current_cell.row;
    const curr_col = current_cell.col;
    let legal_cells = [];
    const legal_color = [constant.UNDISCOVERED_COLOR, constant.TARGET_COLOR];
    // row
    tmp.forEach((offset) => {
        const new_row = curr_row + offset;
        if (new_row >= 0 && new_row < board.length) {
            const new_cell = board[new_row][curr_col];
            if (legal_color.includes(new_cell.color)) {
                legal_cells.push(new_cell);
            }
        }
    });
    // col
    tmp.forEach((offset) => {
        const new_col = curr_col + offset;
        if (new_col >= 0 && new_col < board[0].length) {
            const new_cell = board[curr_row][new_col];
            if (legal_color.includes(new_cell.color)) {
                legal_cells.push(new_cell);
            }
        }
    });
    return legal_cells;
}

export function getCellsAround(graph, current_cell) {
    const tmp = [-1, 1];
    const board = graph.board;
    const curr_row = current_cell.row;
    const curr_col = current_cell.col;
    let cells = [];
    // const legal_color = [constant.UNDISCOVERED_COLOR, constant.TARGET_COLOR];
    // row
    tmp.forEach((offset) => {
        const new_row = curr_row + offset;
        if (new_row >= 0 && new_row < board.length) {
            cells.push(board[new_row][curr_col]);
        }
    });
    // col
    tmp.forEach((offset) => {
        const new_col = curr_col + offset;
        if (new_col >= 0 && new_col < board[0].length) {
            cells.push(board[curr_row][new_col]);
        }
    });
    return cells;
}

export function moveByDir(graph, current_cell) {
    const board = graph.board;
    const curr_row = current_cell.row;
    const curr_col = current_cell.col;
    const legal_color = [constant.UNDISCOVERED_COLOR, constant.TARGET_COLOR];

    // console.log(current_cell.moves[current_cell.curMove]);
    switch (current_cell.curMove) {
        case 0:
            current_cell.curMove++;
            if (curr_row + 1 < board.length) {
                var new_cell = board[curr_row + 1][curr_col];

                if (legal_color.includes(new_cell.color)) {
                    return new_cell;
                }
            }
            return undefined;
        case 1:
            current_cell.curMove++;
            if (curr_col + 1 < board[0].length) {
                var new_cell = board[curr_row][curr_col + 1];
                if (legal_color.includes(new_cell.color)) {
                    return new_cell;
                }
            }

            return undefined;

        case 2:
            current_cell.curMove++;
            if (curr_row - 1 > -1) {
                var new_cell = board[curr_row - 1][curr_col];
                if (legal_color.includes(new_cell.color)) {
                    return new_cell;
                }
            }

            return undefined;
        case 3:
            current_cell.curMove++;
            if (curr_col - 1 > -1) {
                var new_cell = board[curr_row][curr_col - 1];
                if (legal_color.includes(new_cell.color)) {
                    return new_cell;
                }
            }

            return undefined;
        default:
            cell.update(color)
    }

}

export function createElement(tag, msg = null) {
    let p = document.createElement(tag);
    if (msg) {
        let textnode = document.createTextNode(msg);
        p.appendChild(textnode);
    }
    return p;
}

export function scrollToBottom(element_id) {
    let objDiv = document.getElementById(element_id);
    objDiv.scrollTop = objDiv.scrollHeight;
}

export function manhattanDistance(cell1, cell2) {
    return Math.abs(cell2.row - cell1.row) + Math.abs(cell2.col - cell1.col);
}

// export function appendParagraph(message) {
//     const data_display = $("#data-container .data-content")[0];
//     // data_display.style.display = "inline-block";
//     let p = document.createElement('p');
//     let textnode = document.createTextNode(message);
//     p.appendChild(textnode);
//     data_display.appendChild(p);
// }

function isSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < arr[i + 1]) {
            return false;
        }
    }
    return true
}