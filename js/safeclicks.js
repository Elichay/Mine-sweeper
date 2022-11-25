'use strict'


//go over matrics to create array of noshow, noflagged safe cells
//get one random and show it
function onSafeClick(elBtn) {
    if (!gGame.isOn) return
    if (!gGame.clicks) return
    if (gGame.safeClicks <= 0) return
    gGame.safeClicks--
    renderSafeClick()
    // console.log(gGame.safeClicks)
    var safeCells = findSafeCells()
    var safeCellLocation = getRandomSafeCell(safeCells)

    console.log('safeCellLocation', safeCellLocation)
    var cellID = getSelector(safeCellLocation)
    var elCell = document.querySelector(cellID)
    var currCell = gBoard[safeCellLocation.i][safeCellLocation.j]
    currCell.isHintShow = true //add new variable for safeclick?
    elCell.classList.add('show-hint')
    // negsMinesCounterRender(gBoard[safeCellLocation.i][safeCellLocation.j])

    setTimeout(hideSafeClickeCell, 1500)


}

function hideSafeClickeCell() {
    //look for ishintshow true
    //and remove class showhint
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if(gBoard[i][j].isHintShow){
                var cellID = getSelector(gBoard[i][j].location)
                var elCell = document.querySelector(cellID)
                elCell.classList.remove('show-hint')
            }
        }
    }
}



function findSafeCells() {

    var safeCells = []

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]
            if (currCell.isFlagged) continue
            if (currCell.isMine) continue
            if (currCell.isShown) continue
            safeCells.push(currCell.location)
        }
    }
    return safeCells
}


function getRandomSafeCell(safeCells) {
    if (!safeCells.length) return
    return safeCells[getRandomIntInc(0, safeCells.length - 1)]
}



function renderSafeClick() {
    var elBtn = document.querySelector('.clicks')

    elBtn.innerText = gGame.safeClicks

}


