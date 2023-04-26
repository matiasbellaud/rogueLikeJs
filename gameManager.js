import Character from './character.js';
import Level from './level.js'
import { Autoguide, DoubleShot, Gatling, Spectral } from './item.js';
import  rayCasting  from "./rayCasting.js";


let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d');

const char = new Character();

let frame = 0;

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}



const level = new Level();


level.addMap(char)

const item = new Autoguide()
level.now.listMapElement.push(item)

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