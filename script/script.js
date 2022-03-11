//start animation
var anmtPlayer , anmtPlayerDown , anmtPlanet ;
var startControl = false ;

document.querySelector('#start').addEventListener('click',function() {
    window.scrollTo(0,0) ;
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

if (!localStorage.getItem('level')) {
    localStorage.setItem('level',1) ;
} ;

//game start´s
//resquesting animationFrame
var frame ;

//player controls
var dirPlayerx , dirPlayery , posPlayerx , posPlayery , velPLayer , playerLife;

//game controls 
var playing ;
var canCreateBomb , bombTime , velbomb , howManyBombs , createdBombs;
var canshot , cure;
var planetLife , dangerPlanet;
var colisionDamage ;
var level ;

    



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
        window.addEventListener('touchstart',function(e) {
            let key = e.target.id;
            if (key == 'actionLeft') {
                dirPlayerx = -1 ;
            }else if (key == 'actionDown') {
                dirPlayery = 1 ;
            }else if (key == 'actionRight') {
                dirPlayerx = 1 ;
            }else if (key == 'actionUp') {
                dirPlayery = -1 ;
            }
            if (key == 'actionShot') {
                shot() ;
            } ;
        }) ;
        window.addEventListener('touchend',function(e) {
            let key = e.target.id ;
            if (key == 'actionLeft' || key == 'actionRight') {
                dirPlayerx = 0 ;
            } ;
            if (key == 'actionDown' || key == 'actionUp') {
                dirPlayery = 0 ;
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
        if (canCreateBomb == bombTime) {
            createBombs() ;
            canCreateBomb = 0 ;
        } ;
        if (canshot <= 10 && !cure) {
            setShots() ;
        } ;
        controlBombs() ;
        checkshotsandBombs() ;
    } ;
    if (planetLife > 0 && playerLife > 0) {
        frame = requestAnimationFrame(game) ;
    } ;
    if (playing && createdBombs == howManyBombs && document.querySelectorAll('#bombs .bomb').length == 0) {
        document.querySelector('#nextLevel0').textContent = parseInt(localStorage.getItem('level'))+1 ;
        document.querySelector('#wonscreen').style.display = 'flex' ;
        playing = false ;
        if (level < 6) {
            let level = parseInt(localStorage.getItem('level'))+1 ;
            localStorage.setItem('level',level) ;
            document.querySelector('#defensePlanet').style.display = 'none' ;
            document.querySelector('#menu').style.display = 'flex' ;
        } ;

    } ;
    if (planetLife <= 0 || playerLife <= 0 && !playing) {
        document.querySelector('#loseScreen').style.display = 'flex' ;
        playing = false ;
    }
} ;

function start() {
    startlevel = document.querySelector('.level.active.game')
    startlevel = parseInt(startlevel.getAttribute('data-level')) ;
    posPlayerx = 45 ;
    posPlayery = 80 ;
    dirPlayerx = 0 ; 
    dirPlayery = 0 ;
    canCreateBomb = 0 ;
    createdBombs = 0 ;
    cure = false ;
    planetLife = 100 ;
    playerLife = 100 ;
    canshot = 50 ;
    
    if (startlevel > 6) {
        startlevel = 0 ;
    } ; 
    switch (startlevel) {
        case 1:
            velPLayer = 0.6 ;
            bombTime = 50 ;
            velbomb = 0.1 ;
            howManyBombs = 150 ;
            dangerPlanet = 5 ;
            colisionDamage = 20 ;
            break;
        case 2:
            velPLayer = 0.8 ;
            bombTime = 45 ;
            velbomb = 0.12 ;
            howManyBombs = 200 ;
            dangerPlanet = 10 ;
            colisionDamage = 24 ;
            break;
        case 3:
            velPLayer = 1 ;
            bombTime = 50 ;
            velbomb = 0.13 ;
            howManyBombs = 250 ;
            canshot = 50 ;
            dangerPlanet = 15 ;
            colisionDamage = 27 ;
            break;
        case 4:
            velPLayer = 1.1 ;
            bombTime = 50 ;
            velbomb = 0.14 ;
            howManyBombs = 300 ;
            dangerPlanet = 20 ;
            colisionDamage = 30 ;
            break;
        case 5:
            velPLayer = 1.2 ;
            bombTime = 50 ;
            velbomb = 0.15 ;
            howManyBombs = 350 ;
            dangerPlanet = 25 ;
            colisionDamage = 33 ;
            break;
        case 6:
            velPLayer = 1.25 ;
            bombTime = 50 ;
            velbomb = 0.2 ;
            howManyBombs = 400 ;
            dangerPlanet = 30 ;
            colisionDamage = 36 ;
            break;
    }

    game() ;
} ;

function shot() {
    if (canshot > 0){
        let div = document.createElement('div') ;
        let att1 = document.createAttribute('class') ;
        att1.value = 'shot' ;
        div.setAttributeNode(att1) ;
        document.querySelector('#shots').appendChild(div) ;
        let lastDiv = document.querySelector('#shots').lastChild ;
        lastDiv.style.top = `${posPlayery + 1}%` ;
        lastDiv.style.left = `${posPlayerx + (document.querySelector('#player').offsetWidth/window.innerWidth*100)/2}%` ;
        canshot -= 1 ;
        document.querySelector('#manyshots div').style.width = String(canshot*2)+'%' ;
    } ;
} ;

function controlPLayer() {
    if (cure) {
        let player = document.querySelector('#player') ;
        let newshots = document.querySelector('.cure') ;
        if ((parseFloat(player.style.top.replace('%','')) < parseFloat(newshots.style.top.replace('%',''))+10 && parseFloat(player.style.top.replace('%',''))+10 > parseFloat(newshots.style.top.replace('%',''))) && (parseFloat(player.style.left.replace('%',''))+10 > parseFloat(newshots.style.left.replace('%','')) && parseFloat(player.style.left.replace('%','')) < parseFloat(newshots.style.left.replace('%',''))+10)) {
            canshot = 50 ;
            cure = false ;
            document.querySelector('#manyshots div').style.width = String(canshot*2)+'%' ;
            newshots.remove() ;
        }
    } ;
    let bombs = document.querySelectorAll('#bombs .bomb') ;
    let player = document.querySelector('#player') ;
    bombs.forEach(item => {
        if ((
            parseFloat(player.style.top.replace('%','')) <= parseFloat(item.style.top.replace('%',''))+5 && parseFloat(player.style.top.replace('%',''))+5 >= parseFloat(item.style.top.replace('%',''))) && (parseFloat(player.style.left.replace('%',''))+5 >= parseFloat(item.style.left.replace('%','')) && parseFloat(player.style.left.replace('%','')) <= parseFloat(item.style.left.replace('%',''))+5)) {
            item.remove() ;
            playerLife -= colisionDamage ;
            document.querySelector('#playerLife div').style.width = String(playerLife)+'%' ;
            if (playerLife <= 0) {
                playing = false ;
            } ;
        } ;
    }) ;
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
    if (createdBombs < howManyBombs) {
        let bomb = document.createElement('div') ;
        let img = document.createElement('img') ;
        let att1 = document.createAttribute('class') ;
        let att2 = document.createAttribute('src') ;
        att2.value = 'images/missel.gif' ;
        att1.value = 'bomb' ;
        img.setAttributeNode(att2) ;
        bomb.setAttributeNode(att1) ;
        bomb.style.top = '-10%' ;
        bomb.style.left = `${Math.random()*91}%` ;
        bomb.append(img) ;
        document.querySelector('#bombs').appendChild(bomb) ;
        createdBombs += 1 ;
    }
} ;

function controlBombs() {
    let bombs = document.querySelectorAll('#bombs .bomb') ;
    bombs.forEach(item => {
        item.style.top = `${parseFloat(item.style.top.replace('%',''))+velbomb}%` ;
        if (parseFloat(item.style.top.replace('%','')) > 101) {
            item.remove() ;
            planetLife -= dangerPlanet ;
            document.querySelector('#planetLife div').style.width = String(planetLife)+'%' ;
        } ;
    }) ;
} ;

function checkshotsandBombs() {
    let bombs = document.querySelectorAll('#bombs .bomb') ;
    let shots = document.querySelectorAll('#shots .shot') ;
    bombs.forEach(BOMB => {
        shots.forEach(SHOT => {
            if ((parseFloat(BOMB.style.top.replace('%',''))+10 >= parseFloat(SHOT.style.top.replace('%',''))+4 &&parseFloat(BOMB.style.top.replace('%','')) <= parseFloat(SHOT.style.top.replace('%',''))-4) && ((parseFloat(SHOT.style.left.replace('%','')) >= parseFloat(BOMB.style.left.replace('%',''))) && (parseFloat(SHOT.style.left.replace('%',''))+2 <= parseFloat(BOMB.style.left.replace('%',''))+10))) {
                BOMB.remove() ;
                SHOT.remove() ;
            } ;
        }) ;
    }) ;
};

function setShots() {
    let newshots = document.createElement('div') ;
    let att1 = document.createAttribute('class') ;
    att1.value = 'cure' ;
    newshots.setAttributeNode(att1) ;
    let i = document.createElement('i') ;
    let att2 = document.createAttribute('class') ;
    att2.value = 'fas fa-meteor' ;
    i.setAttributeNode(att2) ;
    newshots.appendChild(i) ;
    let posx = parseInt(Math.random()*90) ;
    let posy = parseInt(Math.random()*90) ;
    newshots.style.top = String(posy)+'%' ;
    newshots.style.left = String(posx)+'%' ;
    document.querySelector('#defensePlanet').appendChild(newshots) ;
    cure = true ;
} ;


// when win , when lose , when start
var changeLevels ;

function activeLevels() {
    level = localStorage.getItem('level') ;
    let activedLevels = document.querySelectorAll('.level') ;
    for (var i = 1 ; i < level ; i++) {
        activedLevels[i].classList.add('active') ;
        if (document.querySelector('.level i')) {
            document.querySelector('.level i').remove() ;
        } ;
    } ;
} ;
activeLevels() ;
setChangedLevels() ;

function setChangedLevels(){
    changeLevels = document.querySelectorAll('.level.active') ;
    changeLevels.forEach(item => item.addEventListener('click',changelevels)) ;
} ;

function changelevels(e) {
    let key = e.target.getAttribute('data-level')-1
    let add = document.querySelectorAll('.level.active')[key] ;
    changeLevels.forEach(item => item.classList.remove('game')) ;
    add.classList.add('game') ;
} ;

function setCurrentyLevel(){
    changeLevels.forEach(item => item.classList.remove('game')) ;
    document.querySelectorAll('.level.active')[parseInt(localStorage.getItem('level'))-1].classList.add('game') ;
    
}
setCurrentyLevel() ; 

document.querySelector('#closeWon').addEventListener('click',function() {
    window.location.href='index.html' ;
}) ;
document.querySelector('#closeLose').addEventListener('click',function() {
    window.location.href='index.html' ;
}) ;
