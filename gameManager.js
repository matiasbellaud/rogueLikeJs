
import Character from './character.js';
import Ennemy from './ennemy.js';
import {Map, LMap} from './map.js'
import Door from './door.js'


let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d');

const char = new Character();

const map = new Map();
const lMap = new LMap();

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}


let listMap = [map,lMap]
let indexMap = 0
let ennemyList = []
for (let i = 0; i < 1; i++) {
  const ennemy = new Ennemy(randomIntFromInterval(-6,6),randomIntFromInterval(-6,6))
  ennemyList.push(ennemy)
  listMap[indexMap].listMapElement.push(ennemy)
}

listMap[indexMap].createMap();

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  listMap[indexMap].mapDraw();

  
  if (char.currentHp > 0){
    char.move( listMap[indexMap].listMapElement);
    char.collisionUpdate(listMap[indexMap].listMapElement)
    char.draw();
    char.shoot(listMap[indexMap].listMapElement);
  };
  

  ennemyList.forEach(element => {
    element.move(listMap[indexMap].listMapElement)
  });


  char.reload()
  
  

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