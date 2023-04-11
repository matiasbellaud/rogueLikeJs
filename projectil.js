let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d'); 

export default class Projectil{
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
      ctx.ellipse(this.x+8, this.y+8, this.width,this.height, Math.PI / 4, 0, 2 * Math.PI);
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
  