'use strict'

// //recive a string such as: 'cell-2-7' and returns {i:2, j:7}
// function getCellCoord(strCellId) {
//     var parts = strCellId.split('-')
//     var coord = { i: +parts[1], j: +parts[2] }
//     return coord
// }

function createBoard(BoardSize) {
    const mat = []
    for (var i = 0; i < BoardSize.size; i++) {
        mat[i] = []
        for (var j = 0; j < BoardSize.size; j++) {
            mat[i][j] = {
                location: { i: i, j: j },
                isShown: false,
                isFlagged: false,
                isMine: false,
                isHintShow: false,
                negMinesCount: null
            }
        }
    }
    return mat
}

//recive an object suck as: {i:2, j:7} and returns '.cell-2-7'
function getSelector(coord) {
    return '#cell-' + coord.i + '-' + coord.j //note selector prefix(-)
}


//get array of random cells for mine planting
//and put mines in them
function plantMines(board, pos) {
    var minesArray = getMinesArray(board, gLevel, pos)
    for (var i = 0; i < minesArray.length; i++) {
        var boardPos = board[minesArray[i].i][minesArray[i].j]
        boardPos.isMine = true
    }
}

function getMinesArray(board, level, pos) {
    var minesArray = []
    var availableCells = getHiddenCells(board, pos)
    for (var i = level.mines; i > 0; i--) {
        var rand = getRandomIntInc(0, availableCells.length - 1)
        var CellMine = availableCells.splice(rand, 1)
        minesArray.push(CellMine[0])
    }
    return minesArray
}

//optional mines array - all but first click.
function getHiddenCells(board, pos) {
    var availableCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var currCellLocation = board[i][j].location
            if (pos.i === currCellLocation.i && pos.j === currCellLocation.j) continue
            availableCells.push(currCellLocation)
        }
    }
    return availableCells
}


// function renderCell(location, value) {
//     // Select the elCell and set the value
//     // console.log('hello')
//     const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
//     elCell.innerHTML = value
//     // console.log('elCell', elCell)
// }

function getCellLocation(elCell){
    var i = +elCell.id.split('-')[1]
    var j = +elCell.id.split('-')[2]
    return { i, j }

}



function getRandomIntInc(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
}




