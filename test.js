class Character {
    constructor(){
        this.x = 132
        this.y = 100
        this.width = 16
        this.height = 16
        this.movement_speed = 2;
        this.hp = 3
    }
    draw(){
      ctx.fillRect(this.x,this.y,this.width,this.height)
    }

    

    move(){
        if (keyPresses.z) {
            this.y -=  this.movement_speed;
          } else if (keyPresses.s) {
            this.y +=  this.movement_speed;
          }
      
          if (keyPresses.q) {
            this.x -=  this.movement_speed;
          } else if (keyPresses.d) {
            this.x +=  this.movement_speed;
          }
          this.collision()
    }

    collision(){
        console.log(this.x);
        console.log(this.y);
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
            listProj[projectilNbr] = new Projectil(this.x,this.y, xLook, yLook)
            projectilNbr++
            canShoot = false
          }
      }
    }

    look(xLook,yLook){
        ctx.beginPath();
        ctx.lineTo(char.x+char.width/2,char.y+char.height/2)
        ctx.lineTo(char.x+xLook+char.width/2,char.y+yLook+char.height/2)
        ctx.stroke()
        ctx.closePath();
    }
}

let fullHeartImage = new Image(100, 200);
fullHeartImage.src = './assets/fullHeart.png';
let emptyHeartImage = new Image(100, 200);
emptyHeartImage.src = './assets/emptyHeart.png';

class Hp {
  constructor(){
    this.currentHp = 3
    this.maxHp = 5
  }

  takeDamage(){
    if (this.currentHp > 0){
      this.currentHp--
    } 
  }

  draw(){
    for (let i=1;i<=this.maxHp;i++){ 
      if (i<=this.currentHp){
        ctx.drawImage(fullHeartImage, (16+8)*i-8,16,16,16);
      } else {
        ctx.drawImage(emptyHeartImage, (16+8)*i-8,16,16,16);
      }
      
    }
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
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.wall = wall
    this.sens = sens
    this.rotate = 0
  }

  draw(){
    switch (this.sens) {
      case 90 : 
        this.rotate = -Math.PI/2
        break;
      case 180 :
        this.rotate = -Math.PI
        break;
      case 270 : 
      this.rotate = Math.PI/2
        break;
    }

    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotate);
    ctx.drawImage(this.wall, 0,0,this.width,this.height);
    ctx.rotate(-this.rotate);
    ctx.translate(-this.x, -this.y);
  }

  hitbox(){
    ctx.fillStyle = "purple";
    ctx.fillRect(this.x-25,this.y,this.width*2,1)
    ctx.fillRect(this.x-25,this.y+this.height,this.width*2,1)
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x,this.y-25,1,this.height*2)
    ctx.fillRect(this.x+this.width,this.y-25,1,this.height*2)
  }
}


const char = new Character()
const hp = new Hp()
const map = new Map()



let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d');

  
  let keyPresses = {};
  
  window.addEventListener('keydown', keyDownListener);
  function keyDownListener(event) {
    console.log(event.key);
      keyPresses[event.key] = true;
  }
  
  window.addEventListener('keyup', keyUpListener);
  function keyUpListener(event) {
      keyPresses[event.key] = false;
  }

  let listProj = {}
  let projectilNbr = 0

  function startProj (listProj){
    if (Object.keys(listProj).length > 0){
      for (let key in listProj){
        if (listProj[key].life < 300){
          listProj[key].move()
        } else {
          delete listProj[key]
        }
      }
    }
  }

  let canShoot = true
  let frame = 0

//var for walls
let listMapWalls = []
let mapTopY=64
let mapBottomY=512
let mapLeftX = 96
let mapRightX = 832
let horizontalWallLenght = 22;
let verticalWallLenght = 14;

let wall = new Image(100, 200);
wall.src = 'assets/pieceWall.jpg';

let angleWall = new Image(100, 200);
angleWall.src = 'assets/angleWall.jpg';


  //wall top
  for (let i=1;i<horizontalWallLenght;i++){
    listMapWalls.push( new Wall(0,wall,(32*i)+mapLeftX,mapTopY,32,32))
  }
  // //wall left
  for (let i=2;i<verticalWallLenght;i++){
    listMapWalls.push( new Wall(90,wall,mapLeftX,(32*i)+mapTopY,32,32))
  }
  // //wall right
  for (let i=1;i<verticalWallLenght-1;i++){
    listMapWalls.push( new Wall(270,wall,mapRightX,(32*i)+mapTopY,32,32))
  }
  // //wall bottom
  for (let i=2  ;i<horizontalWallLenght+1;i++){
    listMapWalls.push( new Wall(180,wall,(32*i)+mapLeftX,mapBottomY,32,32))
  }
  // //angles
  listMapWalls.push( new Wall(0,angleWall,(0)+mapLeftX,mapTopY,32,32));
  listMapWalls.push( new Wall(270,angleWall,(0)+mapRightX,mapTopY,32,32));
  listMapWalls.push( new Wall(90,angleWall,(0)+mapLeftX,mapBottomY,32,32));
  listMapWalls.push( new Wall(180,angleWall,(0)+mapRightX,mapBottomY,32,32));
  
  
  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    listMapWalls.forEach(element => {
      element.draw()
    })
    
    hp.draw()
    if (hp.currentHp > 0){
      char.move()
      char.draw()
      char.shoot()
    }
    
    if (canShoot === false){
      frame++
    }
    if (frame === 21){
      canShoot = true
      frame = 0
    }

    startProj(listProj)

    window.requestAnimationFrame(gameLoop);
  }


  gameLoop()