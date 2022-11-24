'use strict'

//recive a string such as: 'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    var parts = strCellId.split('-')
    var coord = { i: +parts[1], j: +parts[2] }
    return coord
}


//recive an object suck as: {i:2, j:7} and returns '.cell-2-7'
function getSelector(coord) {
    return '#cell-' + coord.i + '-' + coord.j //note selector prefix(-)
}


function renderCell(location, value) {
    // Select the elCell and set the value
    // console.log('hello')
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
    // console.log('elCell', elCell)
}

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




