import Hp from './hp.js';
import Character from './character.js';
import Map from './map.js'


let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d');

const char = new Character();
const hp = new Hp();
const map = new Map();

let frame = 0;

map.createMapWalls();
map.createMapFloor();

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  map.mapDraw();
  hp.draw();
  if (hp.currentHp > 0){
    char.move(map.listMapWalls);
    char.draw();
    char.shoot(map.listMapWalls);
  };
  
  if (char.canShoot === false){
    frame++;
  };

  if (frame === 21){
    char.canShoot = true;
    frame = 0;
  };
  window.requestAnimationFrame(gameLoop);
};

gameLoop();