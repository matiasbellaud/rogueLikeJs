import Wall from "./wall.js";

let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d'); 

export default class Ennemy{
    constructor(dx,dy){
      this.x = 200;
      this.y = 300;
      this.width = 20;
      this.height = 20;
      this.movement_speedX = dx;
      this.movement_speedY = dy;
      this.alive = true
      this.hp = 10
    
    };

    draw(){
      if (this.alive) {
        
        ctx.beginPath();
        ctx.ellipse(this.x+this.width/2, this.y+this.height/2, this.width,this.height, Math.PI / 4, 0, 2 * Math.PI);
        ctx.strokeStyle = "rgb(102, 0, 102)";
        ctx.fillStyle = "rgb(153, 51, 153)";
        ctx.fill();
        ctx.stroke();
        
      }
      //this.hitbox()
    };

    hitbox(){
      ctx.fillStyle = "white";
      ctx.fillRect(this.x-this.width,this.y+this.width,this.width*2,1)
      ctx.fillRect(this.x-this.width,this.y-this.width,this.width*2,1)
      ctx.fillStyle = "yellow";
      ctx.fillRect(this.x-this.height,this.y-this.height,1,this.height*2)
      ctx.fillRect(this.x+this.height,this.y-this.height,1,this.height*2)

    }

    randomIntFromInterval(min, max) { // min and max included 
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
  
    move(allElement){
      if (this.randomIntFromInterval(0,100)==1) {
        this.movement_speedX = -this.movement_speedX 
      }
      
      for (let j = 0; j < Math.abs(this.movement_speedX); j++) {
        if (this.movement_speedX > 0) {
          this.x++;
        }else{
          this.x--;
        }
        for (let i = 0; i < allElement.length; i++) {
          if (this.collisionDetection(allElement[i])[0]) {
            if (allElement[i] instanceof Wall) {
              switch (this.collisionDetection(allElement[i])[1]) {
                case "left":
                  this.x--
                  this.movement_speedX = -this.movement_speedX 
                  break;
                case "right":
                  this.x++
                  this.movement_speedX = Math.abs(this.movement_speedX)
                  break;
              
                default:
                  break;
              }
            }
          }
        }
      }
      for (let j = 0; j < Math.abs(this.movement_speedY); j++) {
        if (this.movement_speedY > 0) {
          this.y++;
        }else{
          this.y--;
        }
        for (let i = 0; i < allElement.length; i++) {
          if (this.collisionDetection(allElement[i])[0]) {
            if (allElement[i] instanceof Wall) {
              switch (this.collisionDetection(allElement[i])[1]) {
                case "up":
                  this.y--
                  this.movement_speedY = -this.movement_speedY
                  break;
                case "down":
                  this.y++
                  this.movement_speedY = Math.abs(this.movement_speedY)
                  break;
              
                default:
                  
                  break;
               }
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
      if (xAxis && yAxis) {
        if (rightBox) {
          console.log("hi");
        }
        
      }
  
      if (xAxis){
  
        if (upBox) {
          //element.isColliding = true
          return [true,'up']
  
        }else {this.sMove = true}
  
        if (downBox) {
  
          //element.isColliding = true
          return [true,"down"]
  
        }else{this.zMove = true}
  
      }else{this.sMove = true;this.zMove = true}
      if (yAxis) {
        
        if (leftBox) {
  
          //element.isColliding = true
          return [true, "left"]
        }else { this.dMove = true}
  
        if (rightBox) {
  
          //element.isColliding = true
          return [true,"right"]
        }else{ this.qMove = true}
  
      }
      //element.isColliding = false
      return [false,"none"]  
    }
  };