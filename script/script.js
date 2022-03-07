//start animation
var anmtPlayer , anmtPlayerDown , anmtPlanet ;

document.querySelector('#start').addEventListener('click',function() {
    document.querySelector('#menu').style.display = 'none' ;
    document.querySelector('body').classList.add('active') ;
    document.querySelector('#defensePlanet').style.display = 'block' ;
    anmtPlanet = 50;
    anmtPlayerDown = 50 ;
    anmtPlayer = 0 ;
    animationPlanet() ;
    animationPlayer() ;
}) ;

function animationPlanet() {
    if (anmtPlanet <= 130) {
        document.querySelector('#planet').style.top = `${anmtPlanet}%` ;
        anmtPlanet += 1;
        setTimeout(animationPlanet,50) ;
    }
} ;

function animationPlayer() {
    if (anmtPlayer <= 1) {
        document.querySelector('#player').style.transform = `scale(${anmtPlayer})` ;
        anmtPlayer += 0.02 ;
        setTimeout(animationPlayer,50) ;
    } ;
    if (anmtPlayer.toFixed(1) == 1 ) {
        setTimeout(animationPlayer,50) ;
        if (anmtPlanet == 130) {
            animationPlayerDown() ;
        }
    }
}

function animationPlayerDown() {
    if (anmtPlayerDown <= 80) {
        document.querySelector('#player').style.top = `${anmtPlayerDown}%` ;
        anmtPlayerDown += 1 ;
        setTimeout(animationPlayerDown,100) ;
    } ;
} ;