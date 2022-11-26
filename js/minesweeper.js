'use strict'

const FLAG_IMG = '<img class="wrngflg" src="img/flagIcon.png">'
const WRONG_FLAG_IMG = '<img class="Wrngflg" src="img/wrongflagIcon2.png">'
const MINE_IMG = '<img class="restrtImg" src="img/minesweeperIcon.png">'
const EMPTY = ''
const RESTART_IMG = '<img class="restrtImg" src="img/steve-head.png">'
const RESTART_WIN_IMG = '<img class="restrtImg" src="img/steaveSunglasses.png">'
const RESTART_LOST_IMG = '<img class="restrtImg" src="img/skelaton.png">'

var gBoard
var gHintCell


var gGame = {
    isOn: false,
    isVictory: false,
    isHint: false,
    shownCount: 0,
    markedCount: 0,
    correctMarked: 0,
    secsPassed: 0,
    clicks: 0,
    lives: 0,
    mines: 0,
    hints: 0,
    safeClicks: 0,
    isManual: false,
    gIsSet: false,
    isSeven: false
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
    gPreviusBoards = []
    gGame.hints = gLevel.hints
    gGame.mines = gLevel.mines
    gMinesConuter = gGame.mines
    minesCounter()
    gBoard = createBoard(gLevel)
    renderBoard(gBoard)
    gGame.lives = gLevel.lives
    gGame.safeClicks = gLevel.safeClicks
    renderLives(gGame.lives)
    renderHighScore(gLevel.size)
    renderSafeClick()
    renderHints()
    console.log('gBoard', gBoard)
    getCurrentBoards(gBoard)
    sevenOnInit()
    // gGame.isSeven = false
    gGame.isManual = false
    gGame.gIsSet = false
}

function startGame(pos, elCell) {
    if (!gGame.gIsSet && !gGame.isSeven) plantMines(gBoard, pos)
    setMinesNegsCount()
    console.log('gBoard', gBoard)
    startTimer()
}


function onCellClicked(elCell) {
    if (gGame.isManual) return
    console.log('gGame.lives', gGame.lives)
    if (!gGame.isOn) return
    if (gGame.isHint) {
        hintPressed(elCell)
        return
    }
    var cellLocation = getCellLocation(elCell)
    var currCell = gBoard[cellLocation.i][cellLocation.j]
    if (currCell.isShown) return //if cell not covered. dont click it
    if (currCell.isFlagged) return //after game start is cell is flag return
    gGame.shownCount++
    gGame.clicks++
    currCell.isShown = true
    if (gGame.clicks === 1) startGame(cellLocation)

    ///adding life.
    // if (currCell.isMine)gameOver(elCell)

    if (currCell.isMine) {
        gGame.lives--
        gGame.mines--
        // console.log('mine!')
        console.log('gGame.lives', gGame.lives)
        // elCell.classList.remove('covered')
        elCell.innerHTML = MINE_IMG
        renderLives(gGame.lives)

        if (gGame.lives < 0) {
            gameOver(elCell)
        }
    }


    ////
    elCell.classList.remove('covered')

    if (currCell.negMinesCount) negsMinesCounterRender(currCell)
    else expandShown(cellLocation.i, cellLocation.j)

    checkGameOver(elCell)
    minesCounter()
    getCurrentBoards(gBoard)
}



function negsMinesCounterRender(currCell) {
    var cellID = getSelector(currCell.location)
    var elCell = document.querySelector(cellID)
    /// fix bug when bomb not shown:
    if (currCell.isMine) return
    ///
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
    var minesAmount = gGame.mines - gGame.markedCount
    // console.log('minesAmount', minesAmount)
    if (minesAmount < 10) elCounter.innerText = (' ' + minesAmount)
    else elCounter.innerText = minesAmount

}

//check victory:
function checkGameOver(elCell) {
    var cellLocation = getCellLocation(elCell)
    var currCell = gBoard[cellLocation.i][cellLocation.j]
    // console.log('elCell-vic', currCell)
    console.log('shownCount + correctMarked', gGame.shownCount + gGame.correctMarked)
    if (gGame.shownCount + gGame.correctMarked === gLevel.size * gLevel.size) {
        if (currCell.isMine && gGame.mines < 1) {
            gGame.isVictory = false
            gameOver()
        } else {
            gGame.isVictory = true
            gameOver()
        }
    }
    //checks if all mines are marked and all other shown
}



function gameOver(elCell) {
    stopTimer()
    var elRestartIMG = document.querySelector('.restart')
    console.log('gGame.secsPassed', gGame.secsPassed)
    console.log('game over')

    if (gGame.isVictory) {
        elRestartIMG.innerHTML = RESTART_WIN_IMG
        gGame.isOn = false
        setHighScore(gGame.secsPassed, gLevel.size)
        console.log('u won')
        return
    }

    console.log('u lost')

    elRestartIMG.innerHTML = RESTART_LOST_IMG
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]
            var elCurrCell = document.querySelector(`#cell-${i}-${j}`);
            //show the mines after loss:
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

//mouse right click flags a suspicus box.
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

}


function expandShown(cellI, cellJ) {

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

                currCell.isShown = true
                gGame.shownCount++
                // console.log('elCell', elCell)
                // console.log('i,j', i,j)
                elCell.classList.remove('covered')

                if (currCell.negMinesCount) negsMinesCounterRender(currCell)
                else expandShown(i, j)

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

            var cellClass = (cell.isShown) ? '' : 'covered'

            var cellID = `cell-${i}-${j}`
            var cellData = 'data-i="' + i + '" data-j="' + j + '"'
            strHTML += `<td id="${cellID}" class="cell ${cellClass}" ${cellData}
            onclick="onCellClicked(this,${i},${j}); onMineSelect(this,${i},${j})" oncontextmenu="onCellRightClicked(this,event,${i},${j})">
            </td>`
        }
        strHTML += '</tr>\n'
    }
    elBoard.innerHTML = strHTML

}


function renderLives() {

    switch (gGame.lives) {
        case 0:
            document.querySelector('.life1 img').style.visibility = "hidden"
            document.querySelector('.life2 img').style.visibility = "hidden"
            document.querySelector('.life3 img').style.visibility = "hidden"
            break
        case 1:
            document.querySelector('.life1 img').style.visibility = "visible"
            document.querySelector('.life2 img').style.visibility = "hidden"
            document.querySelector('.life3 img').style.visibility = "hidden"
            break
        case 2:
            document.querySelector('.life1 img').style.visibility = "visible"
            document.querySelector('.life2 img').style.visibility = "visible"
            document.querySelector('.life3 img').style.visibility = "hidden"
            break
        case 3:
            document.querySelector('.life1 img').style.visibility = "visible"
            document.querySelector('.life2 img').style.visibility = "visible"
            document.querySelector('.life3 img').style.visibility = "visible"
            break

    }
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


