'use strict'



function onHintClick() {
    if (!gGame.clicks) return
    if (!gGame.isOn || gGame.isHint) return
    gGame.hints--
    renderHints()
    gGame.isHint = true
    //change cursor
    var elBoard = document.querySelector('table')
    elBoard.style.cursor = "help"

}

function hintPressed(elCell) {
    gHintCell = elCell
    console.log('hi')
    var cellLocation = getCellLocation(elCell)
    var currCell = gBoard[cellLocation.i][cellLocation.j]
    var cellI = currCell.location.i
    var cellJ = currCell.location.j

    //negs
    //if covered (is shown false- do nothing
    //if flagged - do nothing +
    //if is mine - show mine
    //if negs mine count - show

    //checks who needs to be shown
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            //    if (i === cellI && j === cellJ) continue //leave
            if (j < 0 || j >= gBoard[i].length) continue
            if (gBoard[i][j].isShown) continue
            if (gBoard[i][j].isFlagged) continue
            gBoard[i][j].isHintShow = true
            var cellID = getSelector(gBoard[i][j].location)
            var elCell = document.querySelector(cellID)
            elCell.classList.remove('covered')
            if (gBoard[i][j].isMine) {
                elCell.innerHTML = MINE_IMG
            } else {
                if (gBoard[i][j].negMinesCount) negsMinesCounterRender(gBoard[i][j])
            }
        }
    }

    gGame.isHint = false
    var elBoard = document.querySelector('table')
    elBoard.style.cursor = "pointer"
    setTimeout(hideHint, 1000)

}


function hideHint() {

    elCell = gHintCell
    var cellLocation = getCellLocation(elCell)
    var currCell = gBoard[cellLocation.i][cellLocation.j]
    var cellI = currCell.location.i
    var cellJ = currCell.location.j

    console.log('hidenHint', gHintCell)

    //hide relevant cells

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            //    if (i === cellI && j === cellJ) continue //leave
            if (j < 0 || j >= gBoard[i].length) continue
            if (!gBoard[i][j].isHintShow) continue
            // console.log('gBoard[i][j]', gBoard[i][j])
                var cellID = getSelector(gBoard[i][j].location)
                var elCell = document.querySelector(cellID)
                //there shouldn't be any flagged cells. but
                //encountered what seems to be a bug
                //that hides the flag when hin removed.
                //so added the flag options:
                if (gBoard[i][j].isMine && gBoard[i][j].isFlagged) {
                    elCell.classList.add('covered')
                    elCell.innerHTML = FLAG_IMG
                } else if (gBoard[i][j].isMine) {
                    elCell.classList.add('covered')
                    elCell.innerHTML = EMPTY
                } else if (gBoard[i][j].isFlagged) {
                    elCell.innerHTML = FLAG_IMG
                } else {
                    elCell.classList.add('covered')
                    elCell.innerText = ''
                }
       }
    }
}



function renderHints() {
    // if(!gGame.isOn)return
    switch (gGame.hints) {
        case 0:
            document.querySelector('.hint1 img').style.visibility = "hidden"
            document.querySelector('.hint2 img').style.visibility = "hidden"
            document.querySelector('.hint3 img').style.visibility = "hidden"
            break
        case 1:
            document.querySelector('.hint1 img').style.visibility = "visible"
            document.querySelector('.hint2 img').style.visibility = "hidden"
            document.querySelector('.hint3 img').style.visibility = "hidden"
            break
        case 2:
            document.querySelector('.hint1 img').style.visibility = "visible"
            document.querySelector('.hint2 img').style.visibility = "visible"
            document.querySelector('.hint3 img').style.visibility = "hidden"
            break
        case 3:
            document.querySelector('.hint1 img').style.visibility = "visible"
            document.querySelector('.hint2 img').style.visibility = "visible"
            document.querySelector('.hint3 img').style.visibility = "visible"
            break

    }
}

