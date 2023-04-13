
import Character from './character.js';
import Ennemy from './ennemy.js';
import Level from './level.js'


let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d');

const char = new Character();

let frame = 0;

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}


const level = new Level();
level.addMap()
level.now.createMap()

let ennemyList = []

for (let i = 0; i < 1; i++) {
  const ennemy = new Ennemy(randomIntFromInterval(-6,6),randomIntFromInterval(-6,6))
  ennemyList.push(ennemy)
  level.now.listMapElement.push(ennemy)
}


function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  level.now.mapDraw();
  

  
  if (char.currentHp > 0){
    char.move( level.now.listMapElement);
    char.collisionUpdate(level.now.listMapElement)
    char.draw();
    char.shoot(level.now.listMapElement);
  };
  ennemyList.forEach(element => {
    element.move(level.now.listMapElement)
  });

  if (char.canShoot === false){
    frame++;
  };

  if (frame === 21){
    char.canShoot = true;
    frame = 0;
  };

  if (char.changeMap === true){
    level.changeRoom(char.doorPosition)
    level.deleteMap()
    level.createMap()
    if (char.doorPosition === "top"){
      char.teleportation(level.now.positionDoorBottom[0],level.now.positionDoorBottom[1]-32);
    }
    if (char.doorPosition === "left"){
      char.teleportation(level.now.positionDoorRight[0]-32,level.now.positionDoorRight[1]);
    }
    if (char.doorPosition === "bottom"){
      char.teleportation(level.now.positionDoorTop[0],level.now.positionDoorTop[1]+64);
    }
    if (char.doorPosition === "right"){
      char.teleportation(level.now.positionDoorLeft[0]+64,level.now.positionDoorLeft[1]);
    }
      
    
    char.changeMap = false
  }

  window.requestAnimationFrame(gameLoop);
};

gameLoop();