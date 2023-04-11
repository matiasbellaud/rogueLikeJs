import Hp from './hp.js';

class Character {
  constructor(){
      this.x = 700
      this.y = 200
      this.width = 16
      this.height = 16
      this.movement_speed = 4;
      this.hp = 3
      this.listProj  = {}
      this.projectilNbr = 0;
  }
  draw(){
    ctx.fillStyle = "red";
    ctx.fillRect(this.x,this.y,this.width,this.height)
  }

  move(allWall){
    for (let i = 0; i < this.movement_speed; i++) {
      
      if (keyPresses.z ) {
        this.y -=  1
      } else if (keyPresses.s) {
        this.y +=  1
      }
  
      if (keyPresses.q ) {
        this.x -=  1
      } else if (keyPresses.d ) {
        this.x +=  1
      }
      
      this.collisionBox()
      allWall.forEach(element => {


        if (!element.isColliding) {
          if (char.collisionDetection(element)[0]) {
            console.log(char.collisionDetection(element)[1]);
            this.collisionReaction(element,char.collisionDetection(element)[1])
          }
      
        }
      })
    };
  }

  collisionBox(){
    if (this.x > canvas.width-this.width) {
        this.x=canvas.width-this.width
    }
    if (this.x < 0) {
        this.x=0
    }
    if (this.y > canvas.height-this.height) {
        this.y=canvas.height-this.height
    }
    if (this.y < 0) {
        this.y=0
    }
  }

  collisionDetection(wall){
    const xAxis = (this.x+this.width > wall.x+1 && this.x < wall.x+wall.width-1)
    const yAxis = this.y+this.height > wall.y+1 && this.y < wall.y+wall.height-1

    const upBox = (this.y+this.height >= wall.y && this.y <= wall.y+1)
    const downBox = (this.y <= wall.y+wall.height && this.y >= wall.y+wall.height-1)

    const leftBox = (this.x+this.width >= wall.x && this.x <= wall.x+1)
    const rightBox = (this.x <= wall.x+wall.width && this.x >= wall.x+wall.width-1)


    if (xAxis){

      if (upBox) {
        wall.isColliding = true
        return [true,'up']

      }else {this.sMove = true}

      if (downBox) {

        wall.isColliding = true
        return [true,"down"]

      }else{this.zMove = true}

    }else{this.sMove = true;this.zMove = true}
    if (yAxis) {
      
      if (leftBox) {

        wall.isColliding = true
        return [true, "left"]
      }else { this.dMove = true}

      if (rightBox) {

        wall.isColliding = true
        return [true,"right"]
      }else{ this.qMove = true}

    }
    wall.isColliding = false
    return [false,"none"]  
  }

  collisionReaction(wall,side){
    if (side == "left") {
      this.x=wall.x-this.width

    }
    if (side =="up") {
      this.y=wall.y-this.height

    }
    if (side == "right") {
      this.x=wall.x+wall.width

    }
    if (side == "down") {
      this.y=wall.y+wall.height

    }
    wall.isColliding = false
  }

  shoot(){
    if (keyPresses.ArrowUp || keyPresses.ArrowDown || keyPresses.ArrowLeft || keyPresses.ArrowRight) {
      let xLook = 0
      let yLook = 0
      if (keyPresses.ArrowUp) {
          xLook = 0
          yLook = -50
          this.look(xLook,yLook)

          
        } else if (keyPresses.ArrowDown) {
          xLook = 0
          yLook = 50
          this.look(xLook,yLook)

        }
    
        if (keyPresses.ArrowLeft) {
          xLook = -50
          yLook = 0
          this.look(xLook,yLook)

        } else if (keyPresses.ArrowRight) {
          xLook = 50
          yLook = 0
          this.look(xLook,yLook)
          
        }
        if (canShoot){
          this.listProj[this.projectilNbr] = new Projectil(this.x,this.y, xLook, yLook)
          this.projectilNbr++
          canShoot = false
        }
    }
    this.startProj(this.listProj);
  }

  startProj (){
    if (Object.keys(this.listProj).length > 0){
      for (let key in this.listProj){
        if (this.listProj[key].life < 300){
          this.listProj[key].move()
        } else {
          delete this.listProj[key]
        }
      }
    }
  };

  look(xLook,yLook){
    ctx.beginPath();
    ctx.lineTo(char.x+char.width/2,char.y+char.height/2)
    ctx.lineTo(char.x+xLook+char.width/2,char.y+yLook+char.height/2)
    ctx.stroke()
    ctx.closePath();
  }
}




class Projectil{
  constructor(x,y,xDirection,yDirection){
    this.x = x
    this.y = y
    this.xDirection = xDirection
    this.yDirection = yDirection
    this.life = 0
    this.width = 10
    this.height = 10
    this.movement_speed = 15;
    this.alive = true
  }

  draw(){
    ctx.beginPath();
    ctx.ellipse(this.x+char.width/2, this.y+char.height/2, this.width,this.height, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke(); 
  }

  move(){
    if (this.xDirection > 0){
      this.x +=5
      this.life += 5
    } else if (this.xDirection < 0){
      this.x -= 5
      this.life += 5
    } else if (this.yDirection > 0) {
      this.y +=5
      this.life += 5
    } else if (this.yDirection < 0) {
      this.y -=5
      this.life += 5
    }
    this.draw()
  }  
}

class Wall{
  constructor(sens,wall,x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.wall = wall;
    this.sens = sens;
    this.rotate = 0;
    this.isColliding = false;
    this.change = false;
  };

  draw(){
    switch (this.sens) {
      case 90 : 
        this.rotate = -Math.PI/2;
        break;
      case 180 :
        this.rotate = -Math.PI;
        this.change = true;
        break;
      case 270 : 
      this.rotate = Math.PI/2;
        this.change = true;
        break;
    }
    if (this.change === true){
      ctx.translate(this.x +32, this.y+32);
      ctx.rotate(this.rotate);
      ctx.drawImage(this.wall, 0,0,this.width,this.height);
      ctx.rotate(-this.rotate);
      ctx.translate(-this.x-32, -this.y-32);
    }else{
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotate);
      ctx.drawImage(this.wall, 0,0,this.width,this.height);
      ctx.rotate(-this.rotate);
      ctx.translate(-this.x, -this.y);
    }
  }
}

class Floor{
  constructor(floor,x,y,width,height){
    this.floor  = floor;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  };

  draw(){
    ctx.translate(this.x +32, this.y+32);
    ctx.drawImage(this.floor,0,0,this.width,this.height);
    ctx.translate(-this.x-32, -this.y-32);
    
  }
}

class Map{
  constructor(){
    this.listMapWalls = [];
    this.listMapFloor = [];
    this.mapTopY=64;
    this.mapBottomY=512;
    this.mapLeftX = 96;
    this.mapRightX = 832;
    this.horizontalWallLenght = 22;
    this.verticalWallLenght = 14;
  };

  createMapFloor(){ 
    let  floor = new Image(100, 200);
    floor.src = 'assets/floor.jpg';

    //floor
    for (let i=0;i<this.verticalWallLenght-2;i++){
        for (let j=0;j<this.horizontalWallLenght-1;j++){
          this.listMapFloor.push( new Floor(floor,(32*j)+this.mapLeftX,(32*i)+this.mapTopY,32,32));
        }
    };
  };

  createMapWalls(){ 
    let  wall = new Image(100, 200);
    wall.src = 'assets/pieceWall.jpg';

    let angleWall = new Image(100, 200);
    angleWall.src = 'assets/angleWall.jpg';

    //wall top
    for (let i=1;i<this.horizontalWallLenght;i++){
      this.listMapWalls.push( new Wall(0,wall,(32*i)+this.mapLeftX,this.mapTopY,32,32));
    };
    //wall left
    for (let i=1;i<this.verticalWallLenght;i++){
      this.listMapWalls.push( new Wall(90,wall,this.mapLeftX,(32*i)+this.mapTopY,32,32));
    };
    //wall right
    for (let i=1;i<this.verticalWallLenght;i++){
      this.listMapWalls.push( new Wall(270,wall,this.mapRightX-32,(32*i)+this.mapTopY-32,32,32));
    };
    //wall bottom
    for (let i=1 ;i<this.horizontalWallLenght;i++){
      this.listMapWalls.push( new Wall(180,wall,(32*i)+this.mapLeftX,this.mapBottomY-32,32,32));
    };
    //angles
    this.listMapWalls.push( new Wall(0,angleWall,(0)+ this.mapLeftX, this.mapTopY,32,32));
    this.listMapWalls.push( new Wall(270,angleWall,(0)+ this.mapRightX-32, this.mapTopY-32,32,32));
    this.listMapWalls.push( new Wall(90,angleWall,(0)+ this.mapLeftX, this.mapBottomY,32,32));
    this.listMapWalls.push( new Wall(180,angleWall,(0)+ this.mapRightX-32, this.mapBottomY-32,32,32));
  };

  mapDraw(){
    for (let i=0;i<this.listMapWalls.length;i++){
      this.listMapWalls[i].draw();
    };
    for (let i=0;i<this.listMapFloor.length;i++){
      this.listMapFloor[i].draw();
    };
  };
};

class  LMap{
  constructor(){
    this.listMapWalls = [];
    this.listMapFloor = [];
    this.cutCornerX = 13;
    this.cutCornerY = 7;
    this.mapTopY=64;
    this.mapBottomY=512;
    this.mapLeftX = 96;
    this.mapRightX = 832;
    this.horizontalWallLenght = 22;
    this.verticalWallLenght = 14;
  };

  createMapFloor(){ 
    let  floor = new Image(100, 200);
    floor.src = 'assets/floor.jpg';

    //floor
    for (let i=0;i<this.cutCornerY;i++){
      for (let j=13;j<this.horizontalWallLenght-1;j++){
        this.listMapFloor.push( new Floor(floor,(32*j)+this.mapLeftX,(32*i)+this.mapTopY,32,32));
      }
    };
    for (let i=this.cutCornerY;i<this.verticalWallLenght-2;i++){
      for (let j=0;j<this.horizontalWallLenght-1;j++){
        this.listMapFloor.push( new Floor(floor,(32*j)+this.mapLeftX,(32*i)+this.mapTopY,32,32));
      }
    };
  };

  createMapWalls(){ 
    let  wall = new Image(100, 200);
    wall.src = 'assets/pieceWall.jpg';

    let angleWall = new Image(100, 200);
    angleWall.src = 'assets/angleWall.jpg';

    //wall top
    for (let i=1;i<this.horizontalWallLenght;i++){
      let  top  = this.mapTopY;
      if (i<this.cutCornerX){
        top = this.mapTopY+(32*this.cutCornerY);
      }
      this.listMapWalls.push( new Wall(0,wall,(32*i)+this.mapLeftX,top,32,32));
    };

    //wall left
    for (let i=1;i<this.verticalWallLenght;i++){
      let left  = this.mapLeftX;
      if (i<this.cutCornerY+1){
        left = this.mapLeftX+(32*this.cutCornerX);
      }
      this.listMapWalls.push( new Wall(90,wall,left,(32*i)+this.mapTopY,32,32));
    };

    //wall right
    for (let i=1;i<this.verticalWallLenght;i++){
      this.listMapWalls.push( new Wall(270,wall,this.mapRightX-32,(32*i)+this.mapTopY-32,32,32));
    };

    //wall bottom
    for (let i=1 ;i<this.horizontalWallLenght;i++){
      this.listMapWalls.push( new Wall(180,wall,(32*i)+this.mapLeftX,this.mapBottomY-32,32,32));
    };

    //angles
    this.listMapWalls.push( new Wall(0, angleWall, this.mapLeftX+(32*this.cutCornerX), this.mapTopY,32,32));
    this.listMapWalls.push( new Wall(0, angleWall, 0 + this.mapLeftX, (32*this.cutCornerY) + this.mapTopY,32,32));
    this.listMapWalls.push( new Wall(270, angleWall, 0 + this.mapRightX-32, this.mapTopY-32,32,32));
    this.listMapWalls.push( new Wall(90, angleWall, 0 + this.mapLeftX, this.mapBottomY,32,32));
    this.listMapWalls.push( new Wall(180, angleWall, 0 + this.mapRightX-32, this.mapBottomY-32,32,32));
    this.listMapWalls.push( new Wall(180, angleWall, this.mapLeftX+(32*this.cutCornerX), (32*this.cutCornerY) + this.mapTopY,32,32));
  };

  mapDraw(){
    for (let i=0;i<this.listMapWalls.length;i++){
      this.listMapWalls[i].draw();
    };
    for (let i=0;i<this.listMapFloor.length;i++){
      this.listMapFloor[i].draw();
    };
  };
}


class Ennemy{
  constructor(){
  this.x = 10;
  this.y = 175;
  this.width = 5;
  this.height = 5;
  this.movement_speed = 5;
  };

  draw(){
    ctx.beginPath();
    ctx.ellipse(this.x+5, this.y+5, this.width,this.height, Math.PI / 4, 0, 2 * Math.PI);
    ctx.strokeStyle = "#0a7b20";
    ctx.fillStyle = "#0a7b20";
    ctx.fill();
    ctx.stroke();
  };

  move(){
    this.x+= this.movement_speed;
  };

  collision(){
    if (this.x+this.width >= canvas.width) {
    
    };
  };

  look(xLook,yLook){
    ctx.beginPath();
    ctx.lineTo(char.x+5,char.y+5);
    ctx.lineTo(char.x+xLook+5,char.y+yLook+5);
    ctx.stroke();
    ctx.closePath();
  };
};

let keyPresses = [];
window.addEventListener('keydown', keyDownListener);
function keyDownListener(event) {
  
    keyPresses[event.key] = true;
};

window.addEventListener('keyup', keyUpListener);
function keyUpListener(event) {
    keyPresses[event.key] = false;
};

let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d');

const char = new Character();
const hp = new Hp();
const map = new Map();

let canShoot = true;
let frame = 0;


map.createMapWalls();
map.createMapFloor();

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  map.mapDraw();
  hp.draw();
  if (hp.currentHp > 0){
    char.move( map.listMapWalls);
    char.draw();
    char.shoot();
  };
  
  if (canShoot === false){
    frame++;
  };

  if (frame === 21){
    canShoot = true;
    frame = 0;
  };
  window.requestAnimationFrame(gameLoop);
};


gameLoop();