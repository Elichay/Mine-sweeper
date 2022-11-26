'use strict'

function sevenOnInit(){
 var elBtn = document.querySelector('.seven')
 elBtn.classList.remove('selected-seven')

    gGame.isSeven = false

}


function onSevenClick(elBtn) {
//    if(!gGame.isSeven) onInitGame()
    if (gGame.clicks) return
    
    // onInitGame()
    
    // console.log('hi')
    if(!gGame.isSeven) elBtn.classList.add('selected-seven')
    if(gGame.isSeven) elBtn.classList.remove('selected-seven')
    // console.log('gGame.isSeven', gGame.isSeven)
    plantSevenMines(getSevenMines())
    // gGame.clicks++
    // startGame()
    console.log('gBoard', gBoard)
    
    // gGame.isSeven = !gGame.isSeven


}


function getSevenMines() {
    // onInitGame()
    gGame.isSeven = true
    var cellIdx = 1
    var minesLocations = []

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCellString = cellIdx.toString()
            if (currCellString.includes('7') || cellIdx % 7 === 0) {
                minesLocations.push({ i: i, j: j })
            }
            cellIdx++
        }
    }
    gGame.mines = minesLocations.length
    return minesLocations
}


function plantSevenMines(minesLocations) {
    var elCounter = document.querySelector('.flag-count')
    var len = minesLocations.length
    
    console.log('minesLocations', minesLocations)

    for(var k = 0 ; k < len ; k++){
        var mineI = minesLocations[k].i

        var mineJ = minesLocations[k].j

        for (var x = 0; x < gBoard.length; x++) {
            for (var y = 0; y < gBoard[x].length; y++) {
            var currCell = gBoard[x][y]
            var cellIdxI = currCell.location.i
            var cellIdxJ = currCell.location.j
            if (mineI === cellIdxI & mineJ === cellIdxJ) {
            currCell.isMine = true               
            }
        }
    }
    
}

}