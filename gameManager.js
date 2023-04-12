import Hp from './hp.js';
import Character from './character.js';
import Ennemy from './ennemy.js';
import {Map, LMap} from './map.js'
import Level from './level.js'


let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d');

const char = new Character();
const hp = new Hp();

const ennemy = new Ennemy();

const level = new Level();
level.addMap()
level.now.createMap()

let frame = 0;


function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  level.now.mapDraw();
  

  hp.draw();
  if (hp.currentHp > 0){
    char.move( level.now.listMapElement);
    char.draw();
    char.shoot(level.now.listMapElement);
  };
  ennemy.draw()
  ennemy.move(level.now.listMapElement)


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
      char.teleportation(level.now.positionDoorTop[0],level.now.positionDoorTop[1]+32);
    }
    if (char.doorPosition === "right"){
      char.teleportation(level.now.positionDoorLeft[0]+64,level.now.positionDoorLeft[1]);
    }
      
    
    char.changeMap = false
  }

  window.requestAnimationFrame(gameLoop);
};

gameLoop();