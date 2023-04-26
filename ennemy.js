import Projectil from "./projectil.js";
import Wall from "./wall.js";

let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d'); 

export default class Ennemy{
    constructor(){
      this.x = 200;
      this.y = 300;
      this.width = 15;
      this.height = 15;
      this.movement_speed = 2;

      this.dx = 0
      this.dy = 0
      this.alive = true
      this.hp = 10
      this.color ="rgb(153, 51, 153)"
    
    };

    draw(allElement){
      if (this.alive) {
        
        ctx.beginPath();

        ctx.ellipse(this.x+this.height, this.y+this.width, this.width,this.height, Math.PI / 4, 0, 2 * Math.PI);
        ctx.strokeStyle = "rgb(102, 0, 102)";
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
        
      }
      this.hitbox()
    };

    hitbox(){
      ctx.fillStyle = "white";
      ctx.fillRect(this.x,this.y,this.width*2,1)
      ctx.fillRect(this.x,this.y+this.width,this.width*2,1)
      ctx.fillStyle = "yellow";
      ctx.fillRect(this.x,this.y,1,this.height*2)
      ctx.fillRect(this.x+this.height,this.y,1,this.height*2)

    }

    shoot(allElement){
    
    }
    updateProj(allElement,ennemyList){
      let index = []
      if (this.listProj.length > 0){
        this.listProj.forEach(element => {
          if (element.alive === true){
            element.move(allElement,ennemyList)
          } else {
            index.push(this.listProj.indexOf(element))
            this.projectilNbr--
          }
        });
      }
    }


    randomIntFromInterval(min, max) { // min and max included 
      return Math.floor(Math.random() * (max - min + 1) + min)
    }



  
    move(allElement){
      this.dx = this.x - allElement[0].x;
      this.dy = this.y - allElement[0].y;
      let hyp = Math.sqrt(this.dx*this.dx + this.dy*this.dy);
      this.dx /= hyp;
      this.dy /= hyp;



      for (let i = 0; i < this.movement_speed; i++) {
        // if (this.distance(this.x,this.y+0.5,allElement[0])<=this.distance(this.x,this.y-0.5,allElement[0])){
        //   this.y++
        // }else{
        //   this.y--
        // }
        this.y -= this.dy
        for (let i = 0; i < allElement.length; i++) {
              if (this.collisionDetection(allElement[i])[0]) {
                if (allElement[i] instanceof Wall) {
                  switch (this.collisionDetection(allElement[i])[1]) {
                    case "up":
                      this.y+= this.dy
                      this.movement_speedY = -this.movement_speedY
                      break;
                    case "down":
                      this.y+= this.dy
                      this.movement_speedY = Math.abs(this.movement_speedY)
                      break;
                  
                    default:
                      
                      break;
                   }
                 }
               }
             }
 

        // if (this.distance(this.x+0.15,this.y,allElement[0])<=this.distance(this.x-0.5,this.y,allElement[0])){
        //   this.x++
        // }else{
        //   this.x--
        // }
        this.x -= this.dx
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
        

      

      
      
      if (!this.alive) {
        this.movement_speed = 0
      }
      
      
    };
  
    collisionDetection(element){
      const xAxis = (this.x+this.width > element.x+1 && this.x < element.x+element.width-1)
      const yAxis = this.y+this.height > element.y+1 && this.y< element.y+element.height-1
  
      const upBox = (this.y+this.height*2 >= element.y && this.y <= element.y+1)
      const downBox = (this.y <= element.y+element.height && this.y >= element.y+element.height-1)
  
      const leftBox = (this.x+this.width*2 >= element.x && this.x <= element.x+1)
      const rightBox = (this.x <= element.x+element.width && this.x >= element.x+element.width-1)

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

    reload(){
      this.canShoot = false
      return new Promise(function(resolve, reject) {
        setTimeout(() => resolve("done"), 1500);
      });
    }
  };

export class Mucusthing extends Ennemy{

  constructor(){
    super()
      this.x = 200;
      this.y = 300;
      this.width = 15;
      this.height = 15;
      this.movement_speed = 2;

      this.dx = 0
      this.dy = 0
      this.alive = true
      this.hp = 10
      this.color ="rgb(153, 255, 153)"
  }
}

export class Oozeling extends Ennemy{

  constructor(x){
    super()
      this.x = x;
      this.y = 300;
      this.width = 15;
      this.height = 15;
      this.movement_speed = 2;

      this.dx = 0
      this.dy = 0
      this.alive = true
      this.hp = 10
      this.color ="rgb(153, 255, 153)"
      this.listProj  = []
      this.projectilNbr = 0;
      this.canShoot = true;

       //Projectil parameter

       this.projHeight = 10;
       this.shootNbr=1;
       this.cooldown = 20;
       this.projectilSpeed = 7;
       this.range = 40;
       this.projDmg = 2;
       this.spectral = false;
       this.target = false;

       //--------------------------
      
  }

  move(allElement){}

  shoot(allElement,ennemyList){
    if (this.canShoot) {
      
      this.reload().then(result => this.canShoot = true)
      let dx = this.x - allElement[0].x;
      let dy = this.y - allElement[0].y;
      let hyp = Math.sqrt(dx*dx + dy*dy);
      dx /= hyp;
      dy /= hyp;
      let xLook = -dx
      let yLook = -dy
      this.listProj.push(new Projectil(this.x,this.y, xLook, yLook,this.projHeight,this.range,this.projectilSpeed,this.projDmg,this.spectral,this.target,"Ennemy"))
      this.projectilNbr++
      
    }
    this.updateProj(allElement,ennemyList);
  }
}