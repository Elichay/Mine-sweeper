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
    isOn: true,
    // isOn: false,
    shownCount: 0,
    markedCount: 0,
    correctMarked: 0,
    clicks: 0
}


function onInitGame() {

    gBoard = createBoard(gLevel)
    renderBoard(gBoard)
    console.log('gBoard', gBoard)
    // getMinesArray(gBoard, 4)

}


function startGame(pos, elCell) {
    // gGame.isOn = true
    plantMines(gBoard, pos)
    setMinesNegsCount()
    // gBoard[pos.i][pos.j].isShown = true
    // if(gBoard[pos.i][pos.j].negMinesCount > 0) elCell.innerText = gBoard[pos.i][pos.j].negMinesCount
    // renderBoard(gBoard)
    console.log('gBoard', gBoard)
    //start timer  <<<---------
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
        var rand = getRandomIntInc(0, availableCells.length-1)
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
    if (!gGame.isOn) return
    var cellLocation = getCellLocation(elCell)
    
    
    //extract data i and j to pos and send in startGame

    // if (!gGame.isOn) startGame(cellLocation, elCell) //game will start on first click
    // var isCovered = elCell.classList.contains('covered')
    // if (!isCovered) return //if cell not covered. dont click it
    var currCell = gBoard[cellLocation.i][cellLocation.j]
    if (currCell.isShown) return //if cell not covered. dont click it
    if (currCell.isFlagged) return //after game start is cell is flag return
    gGame.shownCount++
    gGame.clicks++
    currCell.isShown = true
    
    if(gGame.clicks === 1) startGame(cellLocation)
   

    
    if(currCell.isMine) return console.log('end Game')
    // if(currCell.isMine) return endGame()
    elCell.classList.remove('covered')
    console.log('currCell.negMinesCount', currCell.negMinesCount)
    
    if(currCell.negMinesCount){
        elCell.innerText = currCell.negMinesCount
        elCell.style.color = '"red"' //add color select switch
    } 


    checkGameOver(elCell)
    


    // renderBoard(gBoard)
}

function renderCell(location, value) {
    // Select the elCell and set the value
    // console.log('hello')
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
    // console.log('elCell', elCell)
}



function checkGameOver(elCell) {
    var cellLocation = getCellLocation(elCell)
    var currCell = gBoard[cellLocation.i][cellLocation.j]

    // if (currCell.isMine) gameOver()
    console.log('shownCount + markedCount', gGame.shownCount + gGame.markedCount)
    if(gGame.shownCount + gGame.markedCount === gLevel.size*gLevel.size) return console.log('you won')
   

    //check if all mines are marked and all other shown
    //if yes. game over


}


function gameOver() {
    console.log('u lost')

}

//mouse right click flag a suspicus box.
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
        elCell.innerHTML = EMPTY
        if(currCell.isMine) gGame.correctMarked--
    } else {
        currCell.isFlagged = true
        gGame.markedCount++
        elCell.innerHTML = FLAG_IMG
        if(currCell.isMine) gGame.correctMarked++   
    }

    checkGameOver(elCell)


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
            // var cellClass
            // if(!cell.isShown) cellClass = 'covered'
            // var negs = ''
            // if(cell.isShown && !cell.isMine){
            //     negs = (!cell.negMinesCount)? '' : cell.negMinesCount
            // }
            var cellClass = (cell.isShown) ? '' : 'covered'
            // console.log('cell.isMine',cell.isMine )
            // if(cell.isMine) cellClass += ' mine'
            var cellID = `cell-${i}-${j}`
            var cellData = 'data-i="' + i + '" data-j="' + j + '"'
            strHTML += `<td id="${cellID}" class="cell ${cellClass}" ${cellData}
            onclick="onCellClicked(this,${i},${j})" oncontextmenu="onCellRightClicked(this,event,${i},${j})">
            </td>`
            // ${negs}</td>`
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
