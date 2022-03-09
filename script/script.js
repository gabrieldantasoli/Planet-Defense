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
var canCreateBomb , bombTime , velbomb ;


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
        canCreateBomb += 1 ;
        if (canCreateBomb == 50) {
            createBombs() ;
            canCreateBomb = 0 ;
        } ;
        controlBombs() ;
        checkshotsandBombs() ;
    } ;
    frame = requestAnimationFrame(game) ;
} ;

function start() {
    posPlayerx = 45 ;
    posPlayery = 80 ;
    velPLayer = 0.6 ;
    dirPlayerx = 0 ; 
    dirPlayery = 0 ;
    canCreateBomb = 0 ;
    bombTime = 50 ;
    velbomb = 0.1 ;


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

function createBombs() {
    let bomb = document.createElement('div') ;
    let img = document.createElement('img') ;
    let att1 = document.createAttribute('class') ;
    let att2 = document.createAttribute('src') ;
    att2.value = '../images/missel.gif' ;
    att1.value = 'bomb' ;
    img.setAttributeNode(att2) ;
    bomb.setAttributeNode(att1) ;
    bomb.style.top = '-10%' ;
    bomb.style.left = `${Math.random()*91}%` ;
    bomb.append(img) ;
    document.querySelector('#bombs').appendChild(bomb) ;
} ;

function controlBombs() {
    let bombs = document.querySelectorAll('#bombs .bomb') ;
    bombs.forEach(item => {
        item.style.top = `${parseFloat(item.style.top.replace('%',''))+velbomb}%` ;
        if (parseFloat(item.style.top.replace('%','')) > 101) {
            item.remove() ;
        } ;
    }) ;
} ;

function checkshotsandBombs() {
    let bombs = document.querySelectorAll('#bombs .bomb') ;
    let shots = document.querySelectorAll('#shots .shot') ;
    bombs.forEach(BOMB => {
        shots.forEach(SHOT => {
            if (parseFloat(BOMB.style.top.replace('%',''))+10 >= parseFloat(SHOT.style.top.replace('%',''))+4 && ((parseFloat(SHOT.style.left.replace('%','')) >= parseFloat(BOMB.style.left.replace('%',''))) && (parseFloat(SHOT.style.left.replace('%',''))+2 <= parseFloat(BOMB.style.left.replace('%',''))+10))) {
                BOMB.remove() ;
                SHOT.remove() ;
            } ;
        }) ;
    }) ;
};