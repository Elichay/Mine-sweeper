'use strict'

const FLAG_IMG = '🚩'
const MINE_IMG = '<img class="mineImg" src="img/minesweeperIcon.png">'
const EMPTY = ''

var gBoard

var gLevel = {
    size: 4,
    mines: 2
    // lives: 3
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0
}


function onInitGame() {

    gBoard = createBoard(gLevel)
    renderBoard(gBoard)
    console.log('gBoard', gBoard)
    // getMinesArray(gBoard, 4)

}


function startGame(pos) {
    gGame.isOn = true
    plantMines(gBoard, pos)
    setMinesNegsCount()
    gBoard[pos.i][pos.j].isShown = true
    renderBoard(gBoard)
    // console.log('gBoard', gBoard)
    //start timer
}

//get array of random cells for mine planting
//and put mines in them
function plantMines(board, pos) {
    var minesArray = getMinesArray(board, gLevel, pos)

    for (var i = 0; i < minesArray.length; i++) {
        // console.log('minesArray[i].i', minesArray[i].i)
        // console.log('minesArray[i].j', minesArray[i].j)
        // console.log('minesArray', minesArray)
        var boardPos = board[minesArray[i].i][minesArray[i].j]
        boardPos.isMine = true

        // console.log('boardPos',boardPos)
        // console.log('boardPos',boardPos.location)
        // var temp = board[0][0].location
        // console.log('temp.i', temp.i)
    }



}

//returns an array of random cells (that can except mines)
//in the length of amont of mines in level
function getMinesArray(board, level, pos) {
    // var minesAmnt = level.mines
    var minesArray = []
    var availableCells = getHiddenCells(board, pos)
    for (var i = level.mines; i > 0; i--) {
        var rand = getRandomIntInc(0, availableCells.length)
        var CellMine = availableCells.splice(rand, 1)
        minesArray.push(CellMine[0])
    }
    // console.log('minesArray', minesArray)
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



function onCellClicked(elCell) {
    console.log('clicked')
    //extract data i and j to pos and send in startGame
    var cellLocation = getCellLocation(elCell)
    if (!gGame.isOn) startGame(cellLocation) //game will start on first click
    // var isCovered = elCell.classList.contains('covered')
    // if (!isCovered) return //if cell not covered. dont click it
    var currCell = gBoard[cellLocation.i][cellLocation.j]
    if (currCell.isShown) return //if cell not covered. dont click it
    if (currCell.isFlagged) return //after game start is cell is flag return

    currCell.isShown = true
    console.log('currCell', currCell)
    checkGameOver(elCell)
    renderBoard(gBoard)
}


function checkGameOver(elCell){
    var cellLocation = getCellLocation(elCell)
    var currCell = gBoard[cellLocation.i][cellLocation.j]

    if(currCell.isMine) gameOver()

    //check if all mines are marked and all other shown
    //if yes. game over





}


function gameOver(){
    console.log('u lost')
    
}


function onCellRightClicked(elCell, ev) {
    ev.preventDefault()
    // console.log('event', ev)
    console.log('Right clicked')
    if (!gGame.isOn) return
    var cellLocation = getCellLocation(elCell)
    var isCovered = elCell.classList.contains('covered')
    if (!isCovered) return //if cell not covered. dont mark

    var currCell = gBoard[cellLocation.i][cellLocation.j]
    // currCell.isFlagged = (currCell.isFlagged) ? false : true
    if (currCell.isFlagged) {
        currCell.isFlagged = false
        gGame.markedCount--
    } else {
        currCell.isFlagged = true
        gGame.markedCount++
    }

    console.log('gGame', gGame)
    // console.log('currCell', currCell)

}



function renderBoard(board) {
    var elBoard = document.querySelector('.board')
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[i].length; j++) {
            var cell = board[i][j]
            // var cellClass = (cell.isShown)? 'cell shown' : 'cell covered'
            // var cellClass
            // if(!cell.isShown) cellClass = 'covered'
            var cellClass = (cell.isShown) ? '' : 'covered'
            // console.log('cell.isMine',cell.isMine )
            // if(cell.isMine) cellClass += ' mine'
            var cellID = `cell-${i}-${j}`
            var cellData = 'data-i="' + i + '" data-j="' + j + '"'
            strHTML += `<td id="${cellID}" class="cell ${cellClass}" ${cellData}
            onclick="onCellClicked(this,${i},${j})" oncontextmenu="onCellRightClicked(this,event,${i},${j})">
            </td>`
            //check about right or left click event
        }
        strHTML += '</tr>\n'
    }
    elBoard.innerHTML = strHTML

}


function createBoard(BoardSize) {
    const mat = []
    for (var i = 0; i < BoardSize.size; i++) {
        mat[i] = []
        for (var j = 0; j < BoardSize.size; j++) {
            mat[i][j] = {
                // location: `cell-${i}-${j}`,
                location: { i: i, j: j },
                isShown: false,
                isFlagged: false,
                isMine: false,
                negMinesCount: null
            }
        }
    }
    return mat
}

//arrange mines negs count

function setMinesNegsCount() {
    // var counter = 0
    // console.log('gBoard.length', gBoard.length)
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var mineNegs = getMinesNegsCount(i, j, gBoard)
            // counter++
            // console.log('mineNegs', counter, mineNegs, 'i:', i, 'j:', j)
            gBoard[i][j].negMinesCount = mineNegs
        }
    }

}


function getMinesNegsCount(cellI, cellJ, mat) {
    var CellNegsMinesCount = 0;

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j].isMine) CellNegsMinesCount++;
        }
    }
    return CellNegsMinesCount;
}
