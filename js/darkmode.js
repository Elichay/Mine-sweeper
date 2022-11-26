'use strict'

var isDark = false
// const BACKGROUND = 'img/minecraftBackground.jpg'
// const DARK_BACKGROUND = 'img/minecraftDarkBackground.jpg'
const DARKCSS = 'css/main.css'
const BRIGHTCSS = 'css/mainDark.css'
const HINT_IMG = 'img/hint.png'
const DARK_HINT_IMG = 'img/DarkHint.png'
const UNDO_IMG = 'img/undo.png'
const DARK_UNDO_IMG = 'img/darkUndo.png'
const HEALTH_IMG = 'img/health.png'
const DARK_HEALTH_IMG = 'img/DarkHealth.png'



function onDark(elBtn) {
    isDark = !isDark

var elCssFile = document.querySelector('.css')
var elHintImgs = document.querySelectorAll('.hintIMG')
var elLifeImgs = document.querySelectorAll('.lifeIMG')
var elUndoImg = document.querySelector('.undoImg')
// console.log('elHintImg', elHintImgs)


    if (isDark) {//switch to bright
        // document.querySelector('body').style.backgroundImage = 'url(' + DARK_BACKGROUND + ')'
        
        elBtn.style.opacity = '40%'
        elBtn.style.color = '#072d03'
        elBtn.style.borderColor = '#008000'
        elBtn.innerText = 'Light Mode'
        
        elCssFile.setAttribute('href', BRIGHTCSS)
        for(var i = 0 ; i < elHintImgs.length ; i++){
            elHintImgs[i].setAttribute('src', DARK_HINT_IMG)
            elLifeImgs[i].setAttribute('src', DARK_HEALTH_IMG)
        }
        elUndoImg.setAttribute('src', DARK_UNDO_IMG)
        
        
        
    } else {//switch to dark
        // document.querySelector('body').style.backgroundImage = 'url(' + BACKGROUND + ')'
        elCssFile.setAttribute('href', DARKCSS)
        for(var i = 0 ; i < elHintImgs.length ; i++){
            elHintImgs[i].setAttribute('src', HINT_IMG)
            elLifeImgs[i].setAttribute('src', HEALTH_IMG)
        }
        elUndoImg.setAttribute('src', UNDO_IMG)
        
        elBtn.style.opacity = '50%'
        elBtn.style.color = '#0ae60a'
        elBtn.style.borderColor = 'gray'

        elBtn.innerText = 'Dark Mode'
    }


}
