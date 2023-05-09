import Character from './character.js';
import Level from './level.js'
import Menu from './menu.js'

let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d');

let temps = 0
let minutes = 0
let secondes = 0
var intervalID;
let timerRun = false
let char = new Character();
let level = new Level();
let menu = new Menu();

function gameManager(){
    char = new Character();
    temps = 0
    level = new Level();
    menu = new Menu();
  
    level.addMap(char)
    gameLoop()
}


function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (level.levelPlayer === 11){
    stopTimer()
    menu.winMenu(minutes,secondes)
    if (menu.reset === true){
      return(gameManager())
    }
    return window.requestAnimationFrame(gameLoop);
  }

  if (menu.start===true){
    menu.startMenu()
    return window.requestAnimationFrame(gameLoop);
  }

  if (timerRun === false){
    startTimer()
    timerRun = true
  }

  if (char.currentHp < 1){
    stopTimer()
    
    menu.deathMenu(minutes,secondes,level.levelPlayer)
    if (menu.start === true){
      return (gameManager())
    }
    return window.requestAnimationFrame(gameLoop);

  } else {
    level.now.mapDraw();
  
    char.reload()
    
    char.collisionUpdate(level.now.listMapElement)
    char.draw();
    char.drawListItem();
    level.drawPlayerLevel()

    if (!menu.isPaused){
      char.move( level.now.listMapElement);
      char.shoot(level.now.listMapElement,level.now.ennemyList);
    } else {
      char.sprite(false)
    }

    if (!menu.isPaused){
      level.ennemyAction();
    }
    level.drawStair();
    level.changeMap(char);
    level.changeLevel(char,menu);
    
    menu.pauseMenu();

    if (menu.isPaused === true){
      menu.drawPause(char);
      stopTimer()
    }

    if (menu.isChangeLevel){
      menu.changeLevelMenu()
    }
    if (menu.reset === true){
      return (gameManager())
    }


    window.requestAnimationFrame(gameLoop);
  }
};

function startTimer() {
    intervalID = setInterval(function () {
        minutes = parseInt(temps / 60, 10)
        secondes = parseInt(temps % 60, 10)

        minutes = minutes < 10 ? "0" + minutes : minutes
        secondes = secondes < 10 ? "0" + secondes : secondes

        temps = temps + 1
    }, 1000);
}

function stopTimer() {
    timerRun = false
    clearInterval(intervalID);
}


gameManager();

