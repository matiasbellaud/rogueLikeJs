class Character {
    constructor(){
        this.x = 0
        this.y = 0
        this.width = 10
        this.height = 10
        this.movement_speed = 3;


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
        const projectil = new Projectil(this.x,this.y)
        projectil.draw()
        projectil.move(xLook,yLook)
      }
      
    }

    look(xLook,yLook){
        ctx.beginPath();
        ctx.lineTo(char.x+5,char.y+5)
        ctx.lineTo(char.x+xLook+5,char.y+yLook+5)
        ctx.stroke()
        ctx.closePath();
    }
}

class Projectil{
    constructor(x,y){
        this.x = x
        this.y = y
        this.width = 15
        this.height = 15
        this.movement_speed = 15;
    }

    draw(){
        ctx.beginPath();
        ctx.ellipse(this.x+5, this.y+5, this.width,this.height, Math.PI / 4, 0, 2 * Math.PI);
        ctx.stroke();
        
    }

    move(xDirection,yDirection){
        for (let i = 0; i < 50; i++) {
          this.x++
        }
    }
}


class Wall{
  constructor(x,y,width,height){
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.isColliding = false
  }

  draw(){
    this.hitbox()

    ctx.fillStyle = "black";
    ctx.fillRect(this.x,this.y,this.width,this.height)

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

class Ennemy{
  constructor(){
  this.x = 10
  this.y = 175
  this.width = 5
  this.height = 5
  this.movement_speed = 5;
  }

  draw(){
    ctx.beginPath();
    ctx.ellipse(this.x+5, this.y+5, this.width,this.height, Math.PI / 4, 0, 2 * Math.PI);
    ctx.strokeStyle = "#0a7b20";
    ctx.fillStyle = "#0a7b20";
    ctx.fill()
    ctx.stroke();
    
  }

  move(){
    this.x+= this.movement_speed
  }

  collision(){
    if (this.x+this.width >= canvas.width) {
      
    }
  }
  look(xLook,yLook){
    ctx.beginPath();
    ctx.lineTo(char.x+5,char.y+5)
    ctx.lineTo(char.x+xLook+5,char.y+yLook+5)
    ctx.stroke()
    ctx.closePath();
}

}


const char = new Character()

const ball = new Ennemy()

function getRandomInt(min, max) {
  return  Math.random() * (max - min) + min;
}

let allWall = []
// for (let i = 0; i < 8; i++) {

//   allWall.push(new Wall(getRandomInt(0,900),getRandomInt(0,600),getRandomInt(50,100),getRandomInt(50,100)))
  
  
// }

allWall.push(new Wall(150,100,50,50))
allWall.push(new Wall(200,50,50,50))

allWall.push(new Wall(350,350,50,50))

allWall.push(new Wall(300,100,50,50))
allWall.push(new Wall(300,150,50,50))
allWall.push(new Wall(250,150,50,50))
allWall.push(new Wall(250,200,50,50))
allWall.push(new Wall(250,250,50,50))
allWall.push(new Wall(300,250,50,50))




let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d');

  
  let keyPresses = {};
  
  window.addEventListener('keydown', keyDownListener);
  function keyDownListener(event) {
    
      keyPresses[event.key] = true;
  }
  
  window.addEventListener('keyup', keyUpListener);
  function keyUpListener(event) {
      keyPresses[event.key] = false;
  }
  

  let positionX = 0;
  let positionY = 0;


  
  function gameLoop() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    console.log(char.dMove);
    // ball.move()
    // ball.collision()
    // ball.draw()

    allWall.forEach(element => {
      element.draw()
    });

    char.move(allWall)
    
    
    char.draw()


    char.shoot()
    
    window.requestAnimationFrame(gameLoop);
  }


  gameLoop()