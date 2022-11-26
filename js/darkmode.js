'use strict'

var isDark = false
const BACKGROUND = 'img/minecraftBackground.jpg'
const DARK_BACKGROUND = 'img/minecraftDarkBackground.jpg'


function onDark(elBtn) {
    isDark = !isDark


    if (isDark) {
        document.querySelector('body').style.backgroundImage = 'url(' + DARK_BACKGROUND + ')'
        
        
        elBtn.style.opacity = '40%'
        elBtn.style.color = '#072d03'
        elBtn.style.borderColor = '#008000'
        elBtn.innerText = 'Light Mode'
    
    } else {
        document.querySelector('body').style.backgroundImage = 'url(' + BACKGROUND + ')'


        elBtn.style.opacity = '50%'
        elBtn.style.color = '#0ae60a'
        elBtn.style.borderColor = 'gray'

        elBtn.innerText = 'Dark Mode'
    }


}
