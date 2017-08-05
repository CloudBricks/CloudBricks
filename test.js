var board = {}

for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 7; col++) {
        board[row][col] = 0;
    }
    board[row][6] = 8;
}


const p1 = "P1",
    p2 = "P2",
    nowin = "NOWIN"
stillplay = 'asiodjsaod';


var RED = 1, //king
    WHITE = 2; //knight

function victory(board) {

    for (var x = 1; x <= 7; x++) {
        var currentColor = board[x][1];
        var count = 1;
        for (var y = 2; y <= 6; y++) {
            var color = board[x][y];
            if (color == currentColor) {
                count++;
            } else {
                count = 1;
                currentColor = color;
            }
            if (count == 4 && currentColor != 0) {
                return currentColor;
            }
        }
    }

    for (var y = 1; y <= 6; y++) {
        var currentColor = board[x][1];
        var count = 1;
        for (var x = 2; x <= 7; x++) {
            var color = board[x][y];
            if (color == currentColor) {
                count++;
            } else {
                count = 1;
                currentColor = color;
            }
            if (count == 4 && currentColor != 0) {
                return currentColor;
            }
        }
    }
    var result = upRight(1, 4, board);
    if (result == RED || result == BLUE) {
        return result;
    }
    var result = upRight(1, 5, board);
    if (result == RED || result == BLUE) {
        return result;
    }


}

function upRight(xp, yp, board) {
    var currentColor = board[xp][yp];
    var count = 1;
    for (var x = xp + 1; x <= 7; x++) {
        for (var y = yp + 1; y <= 6; y++) {
            var color = board[x][y];
            if (color == currentColor) {
                count++;
            } else {
                count = 1;
                currentColor = color;
            }
            if (count == 4 && currentColor != 0) {
                return currentColor;
            }
        }
    }


}

var state = victory(board);
if (state === p1) {
    //player 1 wins
} else if (state == p2) {
    //player 2 wins
} else if (state === nowin) {
    //stalemate
} else {
    //continue play
}