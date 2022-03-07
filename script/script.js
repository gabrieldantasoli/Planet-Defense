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
            if (key == 37) {
                dirPlayerx = -1 ;
            }else if (key == 40) {
                dirPlayery = 1 ;
            }else if (key == 39) {
                dirPlayerx = 1 ;
            }else if (key == 38) {
                dirPlayery = -1 ;
            }
            if (key == 13) {
                shot() ;
            } ;
        }) ;
        window.addEventListener('keyup',function(e) {
            let key = e.keyCode ;
            if (key == 37 || key == 39) {
                dirPlayerx = 0 ;
            } ;
            if (key == 38 || key == 40) {
                dirPlayery = 0 ;
            } ;
        }) ;
        //controling player end´s
        startControl = false ;
        playing = true
    }
    if (playing) {
        controlPLayer() ;
        controlShots() ;
    } ;
    frame = requestAnimationFrame(game) ;
} ;

function start() {
    posPlayerx = 45 ;
    posPlayery = 80 ;
    velPLayer = 0.6 ;
    dirPlayerx = 0 ; 
    dirPlayery = 0 ;


    game() ;
} ;

function shot() {
    let div = document.createElement('div') ;
    let att1 = document.createAttribute('class') ;
    att1.value = 'shot' ;
    div.setAttributeNode(att1) ;
    document.querySelector('#shots').appendChild(div) ;
    let lastDiv = document.querySelector('#shots').lastChild ;
    lastDiv.style.top = `${posPlayery + 1}%` ;
    lastDiv.style.left = `${posPlayerx + (document.querySelector('#player').offsetWidth/window.innerWidth*100)/2}%` ;
} ;

function controlPLayer() {
    posPlayerx += velPLayer * dirPlayerx ;
    posPlayery += velPLayer * dirPlayery ;
    if (posPlayerx >= 100 - document.querySelector('#player').offsetWidth/window.innerWidth*100) {
        posPlayerx = 100 - document.querySelector('#player').offsetWidth/window.innerWidth*100 ;
    } ;
    if (posPlayerx <= 0) {
        posPlayerx = 0 ;
    } ;
    if (posPlayery >= Math.ceil(100 - document.querySelector('#player').offsetHeight/window.innerHeight*100)) {
        posPlayery = Math.ceil(100 - document.querySelector('#player').offsetHeight/window.innerHeight*100) ;
    } ;
    if (posPlayery <= 0) {
        posPlayery = 0 ;
    } ;
    document.querySelector('#player').style.left = `${posPlayerx}%` ;
    document.querySelector('#player').style.top = `${posPlayery}%` ;
} ;

function controlShots(){
    let shots = document.querySelectorAll('#shots .shot') ;
    shots.forEach(item => {
        item.style.top = parseInt(item.style.top.replace('%','')) -1 + '%' ;
        if (parseInt(item.style.top.replace('%','')) < -2) {
            item.remove() ;
        }
    }) ;
}