'use strict'




var gLevels = [
    {
    level: 'BEGGINER',
    size: 4,
    mines: 2
    // lives: 3
},
{
    level: 'MEDIUM',
    size: 8,
    mines: 14
    // lives: 3
}, 
{
    level: 'EXPERT',
    size: 12,
    mines: 32
    // lives: 3
}
]




var gLevel = gLevels[0]



function OnChangeLevel(elLevelClicked){
var elLevel = document.querySelector('.level .chosen-level')
// console.log('elLevelClicked', elLevelClicked)
// var currDiffID = 0
// var currDiffID = elLevel.querySelector('.chosen-level')
// console.log('currDiffID', currDiffID)
// console.log('elLevel', elLevel)
// console.log('elLevelClicked.dataset.level', elLevelClicked.dataset.level)
// console.log('elLevel.dataset.level', elLevel.dataset.level)
var levelChosenDataset = elLevelClicked.dataset.level
if(levelChosenDataset === elLevel.dataset.level) return

elLevel.classList.remove('chosen-level')
elLevelClicked.classList.add('chosen-level')

gLevel = gLevels[levelChosenDataset]

onInitGame()
}