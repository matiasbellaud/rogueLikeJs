import Character from './character.js';
import Level from './level.js'
import Menu from './menu.js'

let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d');



let char = new Character();

let level = new Level();
let menu = new Menu();

function gameManager(){
    
    char = new Character();

    level = new Level();
    menu = new Menu();
  
    level.addMap(char)
    gameLoop()
    
}


function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (menu.start===true){
    menu.startMenu()
    return window.requestAnimationFrame(gameLoop);
  } 

  if (char.currentHp < 1){
    menu.deathMenu()
    if (menu.start === true){
      return (gameManager())
    }
    return window.requestAnimationFrame(gameLoop);

  } else {
    level.now.mapDraw();
    
    if (char.currentHp > 0){
      char.reload()
      
      char.collisionUpdate(level.now.listMapElement)
      char.draw();
      char.drawListItem();

      if (!menu.isPaused){
        char.move( level.now.listMapElement);
        char.shoot(level.now.listMapElement,level.now.ennemyList);
      } else {
        char.sprite(false)
      }
    };

    if (!menu.isPaused){
      level.ennemyAction();
    }
    level.drawStair();
    level.changeMap(char);
    level.changeLevel(char,menu);
    
    menu.pauseMenu();
    if (menu.isPaused === true){
      menu.drawPause();
    }
    if (menu.isChangeLevel){
      menu.changeLevelMenu()
    }
    if (menu.start === true){
      return (gameManager())
    }
    
    window.requestAnimationFrame(gameLoop);
  }
};

gameManager();