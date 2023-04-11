import Wall from "./wall.js";

let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d'); 

export default class Ennemy{
    constructor(){
    this.x = 200;
    this.y = 175;
    this.width = 15;
    this.height = 15;
    this.movement_speedX = 5;
    this.movement_speedY = -1;
    this.alive = true
    };
  
    draw(){
      ctx.beginPath();
      ctx.ellipse(this.x+5, this.y+5, this.width,this.height, Math.PI / 4, 0, 2 * Math.PI);
      ctx.strokeStyle = "#0a7b20";
      ctx.fillStyle = "#0a7b20";
      ctx.fill();
      ctx.stroke();
    };
  
    move(allElement){
      for (let j = 0; j < Math.abs(this.movement_speedX); j++) {
        if (this.movement_speedX > 0) {
          this.x++;
        }else{
          this.x--;
        }
        for (let i = 0; i < allElement.length; i++) {
          if (this.collisionDetection(allElement[i])[0]) {
            switch (this.collisionDetection(allElement[i])[1]) {
              case "left":
                this.movement_speedX = -5
                break;
              case "right":
                this.movement_speedX = 5
                break;
            
              default:
                break;
            }
          }
        }
      }
      console.log(this.movement_speedY);
      for (let j = 0; j < Math.abs(this.movement_speedY); j++) {
        if (this.movement_speedY > 0) {
          this.y++;
        }else{
          this.y--;
        }
        for (let i = 0; i < allElement.length; i++) {
          if (this.collisionDetection(allElement[i])[0]) {
            switch (this.collisionDetection(allElement[i])[1]) {
              case "up":
                this.movement_speedY = -5
                break;
              case "down":
                this.movement_speedY = 5
                break;
            
              default:
                break;
            }
          }
        }
      }
      if (this.alive) {
        this.draw();
      } else {
        this.movement_speedX = 0
        this.movement_speedY = 0
      }
      
      
    };
  
    collisionDetection(element){
      const xAxis = (this.x+this.width > element.x+1 && this.x < element.x+element.width-1)
      const yAxis = this.y+this.height > element.y+1 && this.y < element.y+element.height-1
  
      const upBox = (this.y+this.height >= element.y && this.y <= element.y+1)
      const downBox = (this.y <= element.y+element.height && this.y >= element.y+element.height-1)
  
      const leftBox = (this.x+this.width >= element.x && this.x <= element.x+1)
      const rightBox = (this.x <= element.x+element.width && this.x >= element.x+element.width-1)
  
      if (xAxis){
  
        if (upBox) {
          element.isColliding = true
          return [true,'up']
  
        }else {this.sMove = true}
  
        if (downBox) {
  
          element.isColliding = true
          return [true,"down"]
  
        }else{this.zMove = true}
  
      }else{this.sMove = true;this.zMove = true}
      if (yAxis) {
        
        if (leftBox) {
  
          element.isColliding = true
          return [true, "left"]
        }else { this.dMove = true}
  
        if (rightBox) {
  
          element.isColliding = true
          return [true,"right"]
        }else{ this.qMove = true}
  
      }
      element.isColliding = false
      return [false,"none"]  
    }
  
    look(xLook,yLook){
      ctx.beginPath();
      ctx.lineTo(char.x+5,char.y+5);
      ctx.lineTo(char.x+xLook+5,char.y+yLook+5);
      ctx.stroke();
      ctx.closePath();
    };
  };