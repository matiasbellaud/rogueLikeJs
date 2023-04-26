import Character from './character.js';
import Level from './level.js'



let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d');

const char = new Character();

const level = new Level();


level.addMap(char)

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  level.now.mapDraw();
  
  if (char.currentHp > 0){
    char.reload()
    char.move( level.now.listMapElement);
    char.collisionUpdate(level.now.listMapElement)
    char.draw();
    char.shoot(level.now.listMapElement,level.now.ennemyList);
    
  };
  
  level.ennemyAction();
  level.drawStair();
  level.changeMap(char);
  level.changeLevel(char);
  window.requestAnimationFrame(gameLoop);
};



gameLoop();