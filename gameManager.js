import Hp from './hp.js';
import Character from './character.js';
import Ennemy from './ennemy.js';
import {Map, LMap} from './map.js'
import Door from './door.js'


let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d');

const char = new Character();
const hp = new Hp();
const map = new Map();
const lMap = new LMap();

const ennemy = new Ennemy();

let listMap = [map,lMap]
let indexMap = 0
let frame = 0;

listMap[indexMap].createMap();

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  listMap[indexMap].mapDraw();

  hp.draw();
  if (hp.currentHp > 0){
    char.move( listMap[indexMap].listMapElement);
    char.draw();
    char.shoot(listMap[indexMap].listMapElement);
  };
  ennemy.draw()
  ennemy.move(listMap[indexMap].listMapElement)




  
  if (char.canShoot === false){
    frame++;
  };

  if (frame === 21){
    char.canShoot = true;
    frame = 0;
  };

  if (char.changeMap === true){
    if (indexMap === 0){
      indexMap = 1
      listMap[indexMap].createMap();
    } else {
      indexMap = 0
      listMap[indexMap].createMap();
    }
    char.changeMap = false
  }

  window.requestAnimationFrame(gameLoop);
};

gameLoop();