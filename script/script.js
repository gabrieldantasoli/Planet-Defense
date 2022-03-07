//start animation
var anmtPlayer , anmtPlayerDown , anmtPlanet ;
var startControl = false ;

document.querySelector('#start').addEventListener('click',function() {
    document.querySelector('#menu').style.display = 'none' ;
    document.querySelector('body').classList.add('active') ;
    document.querySelector('#mainHeader').style.display = 'none' ;
    document.querySelector('#defensePlanet').style.display = 'block' ;
    anmtPlanet = 50;
    anmtPlayerDown = 50 ;
    anmtPlayer = 0 ;
    animationPlanet() ;
    animationPlayer() ;
    start() ;
}) ;

function animationPlanet() {
    if (anmtPlanet <= 150) {
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
        if (anmtPlanet == 150) {
            animationPlayerDown() ;
        }
    }
}

function animationPlayerDown() {
    if (anmtPlayerDown <= 80) {
        document.querySelector('#player').style.top = `${anmtPlayerDown}%` ;
        anmtPlayerDown += 1 ;
        setTimeout(animationPlayerDown,100) ;
    }
    if (anmtPlayerDown > 80) {
        startControl = true ;
    } ;
} ;
//ends animation

//game start´s
//resquesting animationFrame
var frame ;

//player controls
var dirPlayerx , dirPlayery , posPlayerx , posPlayery , velPLayer;

//game controls 
var playing ;


function game() {
    if(startControl){
        document.querySelector('#player').style.transition = 'none' ;
        //controling player start´s
        window.addEventListener('keydown',function(e) {
            let key = e.keyCode;
            switch (key){
                case 37:
                    dirPlayerx = -1 ;
                    break ;
                case 38:
                    dirPlayery = -1 ;
                    break ;
                case 39:
                    dirPlayerx = 1 ;
                    break ;
                case 40:
                    dirPlayery = 1 ;
                    break ;
            }
        }) ;
        window.addEventListener('keyup',function() {
            dirPlayerx = 0 ;
            dirPlayery = 0 ;
        }) ;
        //controling player end´s
        startControl = false ;
        playing = true
    }
    if (playing) {
        controlPLayer() ;
    } ;
    frame = requestAnimationFrame(game) ;
} ;

function start() {
    posPlayerx = 50 ;
    posPlayery = 80 ;
    velPLayer = 0.6 ;
    dirPlayerx = 0 ; 
    dirPlayery = 0 ;


    game() ;
} ;

function controlPLayer() {
    posPlayerx += velPLayer * dirPlayerx ;
    posPlayery += velPLayer * dirPlayery ;
    document.querySelector('#player').style.left = `${posPlayerx}%` ;
    document.querySelector('#player').style.top = `${posPlayery}%` ;
} ;