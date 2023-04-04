class Character {
    constructor(){
        this.x = 0
        this.y = 0
        this.width = 10
        this.height = 10
        this.movement_speed = 10;
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



const char = new Character()



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
  

  let positionX = 0;
  let positionY = 0;
  
  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    char.move()

    char.draw()
    char.shoot()
    window.requestAnimationFrame(gameLoop);
  }


  gameLoop()