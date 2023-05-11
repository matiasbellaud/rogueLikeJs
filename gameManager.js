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
let deathAlreadyPlayed = false
let winAlreadyPlayed = false

const sound = new Audio("/assets/sound/background.mp3")


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

  if (level.levelPlayer === 11){ // victory condition
    stopTimer()
    if (!winAlreadyPlayed) {
      const win = new Audio("/assets/sound/win.mp3")
      win.volume = 0.4
      win.play()
      sound.currentTime=0;
      sound.pause()
      winAlreadyPlayed = true
    }
    menu.winMenu(minutes,secondes)
    if (menu.reset === true){
      sound.play()
      return(gameManager())
    }
    return window.requestAnimationFrame(gameLoop);
  }

  if (menu.start===true){  // when start to play, open start menu
    menu.startMenu()
    sound.play()
    sound.loop = true;

    sound.volume = 0.4
    return window.requestAnimationFrame(gameLoop);
  }

  if (timerRun === false){ // start the timer when we start to play
    startTimer()
    timerRun = true
  }

  if (char.currentHp < 1){  //death condition
    stopTimer()
    if (!deathAlreadyPlayed) {
      const death = new Audio("/assets/sound/death.mp3")
      death.volume = 0.4
      death.play()
      sound.currentTime=0;
      sound.pause()
      deathAlreadyPlayed = true
    }
    menu.deathMenu(minutes,secondes,level.levelPlayer)
    if (menu.start === true){
      sound.play()
      return (gameManager())
    }
    return window.requestAnimationFrame(gameLoop);

  } else { // action of the  player
    level.now.mapDraw();
  
    char.reload()
    
    char.collisionUpdate(level.now.listMapElement)
    char.draw();
    char.drawListItem();
    level.drawPlayerLevel()

    if (!menu.isPaused){  // if we click on pause freeze  the game
      char.move( level.now.listMapElement);
      char.shoot(level.now.listMapElement,level.now.ennemyList);
    } else {
      char.sprite(false)
    }

    if (!menu.isPaused){ // if we click on pause freeze  the game
      level.ennemyAction();
    }
    level.drawStair();
    level.changeMap(char);
    level.changeLevel(char,menu);
    
    menu.pauseMenu();

    if (menu.isPaused === true){  // draw pause menu
      menu.drawPause(char);
      stopTimer()
    }

    if (menu.isChangeLevel){  // when change level
      menu.changeLevelMenu()
    }
    if (menu.reset === true){  // if reset game
      return (gameManager())
    }

    window.requestAnimationFrame(gameLoop);
  }
};

function startTimer() { // count secondes  and minutes
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

