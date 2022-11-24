'use strict'

const FLAG_IMG = '<img class="wrngflg" src="img/flagIcon.png">'
const WRONG_FLAG_IMG = '<img class="Wrngflg" src="img/wrongflagIcon1.png">'
const MINE_IMG = '<img class="mineImg" src="img/minesweeperIcon.png">'
const EMPTY = ''
const RESTART_IMG = '🙂'
const RESTART_WIN_IMG = '😎'
const RESTART_LOST_IMG = '🤦‍♂️'

var gBoard


var gGame = {
    isOn: false,
    isVictory: false,
    shownCount: 0,
    markedCount: 0,
    correctMarked: 0,
    secsPassed: 0,
    clicks: 0
}


function onInitGame() {
    var elRestartIMG = document.querySelector('.restart')
    elRestartIMG.innerHTML = RESTART_IMG
    gGame.shownCount = 0
    gGame.markedCount = 0
    gGame.correctMarked = 0
    gGame.clicks = 0
    gGame.isOn = true
    gGame.isVictory = false
    resetTimer()
    minesCounter()
    gBoard = createBoard(gLevel)
    renderBoard(gBoard)
    console.log('gBoard', gBoard)

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
    startTimer()
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
        var rand = getRandomIntInc(0, availableCells.length - 1)
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
    // console.log('clicked')
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

    if (gGame.clicks === 1) startGame(cellLocation)

    if (currCell.isMine) return gameOver(elCell)
    // if(currCell.isMine) return endGame()
    elCell.classList.remove('covered')
    // console.log('currCell.negMinesCount', currCell.negMinesCount)

    if (currCell.negMinesCount) negsMinesCounterRender(currCell)
    else expandShown(cellLocation.i, cellLocation.j)

    checkGameOver(elCell)
    minesCounter()
}

function negsMinesCounterRender(currCell) {
    console.log('currCell', currCell)

    var cellID = getSelector(currCell.location)
    var elCell = document.querySelector(cellID)

    console.log('elCell', elCell)
    elCell.innerText = currCell.negMinesCount

    var innerColor = ''

    switch (currCell.negMinesCount) {
        case 1:
            innerColor = 'blue'
            break
        case 2:
            innerColor = 'green'
            break
        case 3:
            innerColor = 'red'
            break
        case 4:
            innerColor = 'navy'
            break
        case 5:
            innerColor = 'brown'
            break
        case 6:
            innerColor = 'aqua'
            break
        case 7:
            innerColor = 'black'
            break
        case 8:
            innerColor = 'gray'
            break
    }
    elCell.style.color = innerColor

}

//show amonut of mines minus amount of flagged cells
function minesCounter() {
    var elCounter = document.querySelector('.flag-count')
    var minesAmount = gLevel.mines - gGame.markedCount
    console.log('minesAmount', minesAmount)

    if (minesAmount < 10) elCounter.innerText = (' ' + minesAmount)
    else elCounter.innerText = minesAmount


}

//check victory:
function checkGameOver() {
    console.log('shownCount + correctMarked', gGame.shownCount + gGame.correctMarked)
    if (gGame.shownCount + gGame.correctMarked === gLevel.size * gLevel.size) {
        gGame.isVictory = true
        gameOver()
    }
    //checks if all mines are marked and all other shown
}

// function victory(){
//     stopTimer()
//     var elRestartIMG = document.querySelector('.restart')
//     elRestartIMG.innerHTML = RESTART_WIN_IMG


//     console.log('gGame.secsPassed', gGame.secsPassed)
//     console.log('u won')
// }

function gameOver(elCell) { //loosing
    stopTimer()
    var elRestartIMG = document.querySelector('.restart')
    console.log('gGame.secsPassed', gGame.secsPassed)
    console.log('game over')


    if (gGame.isVictory) {
        elRestartIMG.innerHTML = RESTART_WIN_IMG
        console.log('u won')
        return
    }


    console.log('u lost')

    elRestartIMG.innerHTML = RESTART_LOST_IMG
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]
            var elCurrCell = document.querySelector(`#cell-${i}-${j}`);

            if (currCell.isMine && !currCell.isFlagged) {
                currCell.isCovered = false
                elCurrCell.classList.remove('covered')
                elCurrCell.innerHTML = MINE_IMG



            } else {
                if (currCell.isFlagged && !currCell.isMine)
                    elCurrCell.innerHTML = WRONG_FLAG_IMG
            }

        }
    }
    elCell.style.backgroundColor = 'red'
    gGame.isOn = false
}

//mouse right click flag a suspicus box.
function onCellRightClicked(elCell, ev) {
    ev.preventDefault()
    // console.log('event', ev)
    // console.log('Right clicked')
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
        if (currCell.isMine) gGame.correctMarked--
    } else {
        currCell.isFlagged = true
        gGame.markedCount++
        elCell.innerHTML = FLAG_IMG
        if (currCell.isMine) gGame.correctMarked++
    }
    minesCounter()
    checkGameOver(elCell)
    // console.log('gGame', gGame)
    // console.log('currCell', currCell)

}



function expandShown(cellI, cellJ) {
    // var coord = { i: i, j: j }
    // var cellI = i
    // var cellJ = j
    //find negs gBoardrics
    // console.log('inside')
    // console.log('cellI, cellJ', cellI, cellJ)
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= gBoard[i].length) continue

            var currCell = gBoard[i][j]

            //show cell
            // if(!currCell.isFlagged && !currCell.isShown){
            if (!currCell.isFlagged && !currCell.isShown && !currCell.isMine) {
                // if(currCell.negMinesCount)continue
                var elCell = document.querySelector(`#cell-${i}-${j}`)
                //remove covered
                //color text
                //add remove coverd and color text to function
                //and take also from clickedCell
                currCell.isShown = true
                gGame.shownCount++
                // console.log('elCell', elCell)
                // console.log('i,j', i,j)

                elCell.classList.remove('covered')

                if (currCell.negMinesCount) negsMinesCounterRender(currCell)
                else expandShown(i, j)
                // elCell.innerText = currCell.negMinesCount
                // elCell.style.color = 'blue'
                // if (!currCell.negMinesCount) expandShown(i, j)
            }
        }
    }
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
    var CellNegsMinesCount = 0

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue
            if (mat[i][j].isMine) CellNegsMinesCount++
        }
    }
    return CellNegsMinesCount
}


