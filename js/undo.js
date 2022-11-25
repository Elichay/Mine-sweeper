'use strict'

//save gBoard for every move (when click++)
////saveBoard(gBoard)
//also save lives count status
//each gboard, should be saved in array as a copy!
//when undo is presses
//take out from array, last copy of board
//and render it
//also render lives again.
var GmovesCounter = 0
var gPreviusBoards = []

function OnUndo() {
    if (!gGame.clicks) return
    if (!gGame.isOn) return
    if (!gPreviusBoards.length) return
    //if(gPreviusBoard) return
    // getPreviusBoards(gBoard) // copy current board and saves to


    console.log('undo pressed')
    console.log('gPreviusBoards', gPreviusBoards)
    console.log('gPreviusBoards.length', gPreviusBoards.length)

    // var currBoardStats = (gPreviusBoards.length > 1) ? gPreviusBoards.splice(gPreviusBoards.length - 1, 1)[0] : gPreviusBoards.pop()
    // var currBoardStats = gPreviusBoards.pop() //need to splice current-1
    // if (gPreviusBoards.length > 1) {
    var currBoardStats = gPreviusBoards.splice(gPreviusBoards.length - 1, 1)[0] //need to splice current-1
    if (!gPreviusBoards.length) getCurrentBoards(gBoard)

    // } else {
    //     var currBoardStats = gPreviusBoards.pop()
    // }
    gGame.lives = currBoardStats.lives
    var currBoard = currBoardStats.board //<-- this is the game board
    // gBoard = currBoardStats.board  // want to compare first
    // console.log('currBoard', currBoard)
    renderPreviusBoard(currBoard)  //set flags, mines, and numbers. for all  isshown

    renderLives(gGame.lives)
    minesCounter()


    //also counts if isflagged and is mined add corrected maekd
}



function renderPreviusBoard(board) {
    //set flags, mines, and numbers. for all  isshown
    //also counts if isflagged and is mined add corrected maekd

    // console.log('gBoard', gBoard)

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var prevCell = board[i][j]
            var currCell = gBoard[i][j]

            // console.log('prevCell.isShown', prevCell.isShown)
            // console.log('currCell.isShown', currCell.isShown)

            // console.log('prevCell', prevCell)
            // console.log('currCell', currCell)
            if (!currCell.isShown && !currCell.isFlagged && !prevCell.isFlagged) continue
            if (currCell.isShown && prevCell.isShown) continue
            if (currCell.isFlagged && prevCell.isFlagged) continue
            var elCell = document.querySelector(`#cell-${i}-${j}`)
            if (currCell.isFlagged && !!prevCell.isFlagged) {
                currCell.isFlagged = false
                gGame.markedCount--
                elCell.innerHTML = EMPTY
                if (currCell.isMine) gGame.correctMarked--
                continue
            } else if (!!currCell.isFlagged && prevCell.isFlagged) {
                currCell.isFlagged = true
                gGame.markedCount++
                elCell.innerHTML = FLAG_IMG
                if (currCell.isMine) gGame.correctMarked++
                continue
            }
            //what is left is: current show and prev !show                    
            currCell.isShown = false
            if (currCell.isMine) {
                gGame.mines++
                elCell.classList.add('covered')
                elCell.innerHTML = EMPTY
            } else {
                elCell.classList.add('covered')
                elCell.innerText = ''
            }
        }
    }
}


function getCurrentBoards(board) {
    //take gBoard  and add live stat
    //put back in object and push to gPreviusBoards[]
    // [{gBoard,livecount},{gBoard,livecount},..]
    // console.log('board', board)
    var mat = createBoard(gLevel)
    GmovesCounter++

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            mat[i][j].location.i = board[i][j].location.i
            mat[i][j].location.j = board[i][j].location.j
            mat[i][j].isShown = board[i][j].isShown
            mat[i][j].isFlagged = board[i][j].isFlagged
            mat[i][j].isMine = board[i][j].isMine
            mat[i][j].isHintShow = board[i][j].isHintShow
            mat[i][j].negMinesCount = board[i][j].negMinesCount
            // mat[i] = board[i].slice()
        }    //take gboards rows and copy to mat
    }
    var tempBoard = {
        board: mat,
        lives: gGame.lives
    }
    gPreviusBoards.push(tempBoard)
    // console.log('gPreviusBoards[0].board', gPreviusBoards[0].board)
}
