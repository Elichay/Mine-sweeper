'use strict'




var gLevels = [
    {
        level: 'BEGGINER',
        size: 4,
        mines: 2,
        lives: 1,
        hints: 2
    },
    {
        level: 'MEDIUM',
        size: 8,
        mines: 14,
        lives: 2,
        hints: 3
    },
    {
        level: 'EXPERT',
        size: 12,
        mines: 32,
        lives: 3,
        hints: 3
    }
]




var gLevel = gLevels[0]



function OnChangeLevel(elLevelClicked) {
    var elLevel = document.querySelector('.level .chosen-level')
    var levelChosenDataset = elLevelClicked.dataset.level
    var PrevLevelDataset = elLevel.dataset.level
    if (levelChosenDataset === PrevLevelDataset) return

    elLevel.classList.remove('chosen-level')
    elLevelClicked.classList.add('chosen-level')

    gLevel = gLevels[levelChosenDataset]
    
    setLevel()
    
    //  var level = getLevel(gLevel.size)
    // var highScore = localStorage.getItem(`${level}HighScore`)
    // if(!highScore){
        //     var elHighscore = document.querySelector('.highscore')
        //     elHighscore.innerText = ' '
        // }
        // else{
            //     var htmlStr = level + ' High Score' + ': ' + highScore
            //     elHighscore.innerText = htmlStr
            // }
            
            renderHighScore(gLevel.size)
    onInitGame()
}


function showHighscore(){


}



function setLevel() {
    var size = gLevel.size
    switch (size) {
        case 4: var elBar = document.querySelector('.cells-frame')
            elBar.style.maxWidth = '200px'
            break;
        case 8: var elBar = document.querySelector('.cells-frame')
            elBar.style.maxWidth = '300px'
            break;
        case 12: var elBar = document.querySelector('.cells-frame')
            elBar.style.maxWidth = '400px'
            break;
    }

}
