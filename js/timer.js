'use strict'


var gTimerInterval
var gMilliseconds =0
var gSeconds =0


function startTimer() {
    if (gTimerInterval) clearInterval(gTimerInterval)
    gTimerInterval = setInterval(displayTimer, 10)
}


function resetTimer() {
    clearInterval(gTimerInterval)
    gGame.secsPassed = 0
    gSeconds = 0
    gMilliseconds = 0
    displayTimer()
}

function stopTimer() {
    clearInterval(gTimerInterval)
}


function displayTimer() {
    var elTimer = document.querySelector('.timerdigits')

    gMilliseconds += 10 
    if (gMilliseconds == 1000) {
        gMilliseconds = 0
        gSeconds++
    }

    if(gSeconds < 10){
        var s = "00" + gSeconds
    }else if(gSeconds < 100){
        var s = "0" + gSeconds 
    }else{
        var s = gSeconds
    }

    gGame.secsPassed = gSeconds
     elTimer.innerHTML = `${s}`

}



