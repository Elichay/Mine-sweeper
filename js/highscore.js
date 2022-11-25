'use strict'


function setHighScore(lastScore, size) {

    var level = getLevel(size)
    console.log('score', lastScore)
    console.log('size', size)

    var previousHighScore = localStorage.getItem(`${level}HighScore`)
    if (lastScore < previousHighScore || !previousHighScore) {
        localStorage.setItem(`${level}HighScore`, lastScore)
    }
    renderHighScore(size)

}


function renderHighScore(size) {
    // console.log('gLevel.level', gLevel.level)
    var level = getLevel(size)
    var elHighscore = document.querySelector('.highscore')
    var highScore = localStorage.getItem(`${level}HighScore`)
    // console.log('highScore', highScore)
    if (gLevel.level === level) {

        if (highScore) {
            var htmlStr = level + ' High Score' + ': ' + highScore
            elHighscore.innerText = htmlStr
        } else if (!highScore) {
            elHighscore.innerText = ' '
        }
    } else {
        elHighscore.innerText = ' '
    }



}



function getLevel(size) {

    var level = ''
    switch (size) {
        case 4:
            level = 'BEGGINER'
            break
        case 8:
            level = 'MEDIUM'
            break
        case 12:
            level = 'EXPERT'
            break
    }
    return level
}