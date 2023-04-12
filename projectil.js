import Wall from "./wall.js";
import Ennemy from "./ennemy.js";

let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d'); 

export default class Projectil{
    constructor(x,y,xDirection,yDirection,speed,range){
      this.x = x
      this.y = y
      this.xDirection = xDirection
      this.yDirection = yDirection
      this.life = range
      this.width = 10
      this.height = 10
      this.movement_speed = speed;
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
          
        } else if (this.xDirection < 0){
          this.x --
        } else if (this.yDirection > 0) {
          this.y ++

        } else if (this.yDirection < 0) {
          this.y --

        }
        this.collision(allWall)
      }

      this.life --
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
            return [true,'up']
          }
          if (downBox) {
             return [true,"down"]
          }
        }
        if (yAxis) {
          if (leftBox) {
            return [true, "left"]
          }
          if (rightBox) {
            return [true,"right"]
          }
        }
        return [false,"none"]  
    }

    collision(allElement){
      for (let i = 0; i < allElement.length; i++) {
        if (this.collisionDetection(allElement[i])[0]) {
          console.log(typeof allElement[i]);
          if (allElement[i] instanceof Wall) {
            this.alive = false
          }
          if (allElement[i] instanceof Ennemy){
            console.log("hi");
            allElement[i].alive = false
            this.alive = false
          }
        }
      }
    }
  }
  