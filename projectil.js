import Wall from "./wall.js";

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
      this.movement_speed = 7;
      this.alive = true
      this.color = "rgb(153, 255, 153)"
    }
  
    draw(){
      ctx.beginPath();
      ctx.ellipse(this.x+8, this.y+8, this.width,this.height, Math.PI / 4, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill()
      ctx.stroke(); 
    }
  
    move(allWall){
      for (let i = 0; i < this.movement_speed; i++) {
        if (this.xDirection > 0){
          this.x ++
          this.life ++
        } else if (this.xDirection < 0){
          this.x --
          this.life ++
        } else if (this.yDirection > 0) {
          this.y ++
          this.life ++
        } else if (this.yDirection < 0) {
          this.y --
          this.life ++
        }
        this.collision(allWall)
      }
      if (this.alive) {
        this.draw()
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

    collision(allWall){
      for (let i = 0; i < allWall.length; i++) {
        if (this.collisionDetection(allWall[i])[0]) {
          if (allWall[i] instanceof Wall) {
            this.alive = false
          }
          
        }
        
      }
     
    }
  }
  