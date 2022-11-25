'use strict'

var gMinesConuter = 0


function onMineSelect(elCell) {
    if (!gGame.isManual) return
    // if(!gMinesConuter) startGame()
    // if(!gMinesConuter) return

    var cellLocation = getCellLocation(elCell)
    var currCell = gBoard[cellLocation.i][cellLocation.j]
    currCell.isMine = true

    //add mine
    elCell.innerHTML = MINE_IMG

    gMinesConuter--

    var elCounter = document.querySelector('.flag-count')
    var minesAmount = gMinesConuter
    if (minesAmount < 10) elCounter.innerText = (' ' + minesAmount)
    else elCounter.innerText = minesAmount

    console.log('gMinesConuter', gMinesConuter)
    if (!gMinesConuter) {
        console.log('out of you mine')
        var elBoard = document.querySelector('table')
        var elBtn = document.querySelector('.manual')
        elBoard.style.cursor = "pointer"

        elBtn.style.opacity = '40%'
        elBtn.style.color = '#072d03'
        elBtn.style.borderColor = '#008000'

        for (var i = 0; i < gBoard.length; i++) {
            for (var j = 0; j < gBoard[i].length; j++) {
                // currCell = gBoard[i][j]
                var cellID = getSelector(gBoard[i][j].location)
                var elMineCell = document.querySelector(cellID)
                elMineCell.classList.add('covered')
                elMineCell.innerHTML = EMPTY
            }
        }
        gGame.gIsSet = true
        gGame.isManual = false
    }
}



function onManual(elBtn) {
    if (gGame.clicks) return
    // if(gGame.isOn) return
    gMinesConuter = gGame.mines

    var elBoard = document.querySelector('table')
    if (gGame.isManual) {
        elBtn.style.opacity = '40%'
        elBtn.style.color = '#072d03'
        elBtn.style.borderColor = '#008000'
        // elBtn.classList.remove('clicked')
        elBoard.style.cursor = "pointer"

        for (var i = 0; i < gBoard.length; i++) {
            for (var j = 0; j < gBoard[i].length; j++) {
                // currCell = gBoard[i][j]
                var cellID = getSelector(gBoard[i][j].location)
                var elCell = document.querySelector(cellID)
                elCell.classList.add('covered')
            }
        }
        onInitGame()
        gGame.isManual = false
    } else {
        elBtn.style.opacity = '1'
        elBtn.style.color = '#0ae60a'
        elBtn.style.textShadow = '0px 0px 5px #22ff00'
        elBtn.style.borderColor = 'gray'
        // elBtn.classList.add('clicked')

        elBoard.style.cursor = "copy"

        for (var i = 0; i < gBoard.length; i++) {
            for (var j = 0; j < gBoard[i].length; j++) {
                // currCell = gBoard[i][j]
                var cellID = getSelector(gBoard[i][j].location)
                var elCell = document.querySelector(cellID)
                elCell.classList.remove('covered')
            }
        }
        gGame.isManual = true
    }
    console.log('gGame.isManual', gGame.isManual)
}

