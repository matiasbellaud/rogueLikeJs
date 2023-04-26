import Wall from "./wall.js";
import Ennemy from "./ennemy.js";
import Character from "./character.js";

let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d'); 

export default class Projectil{
    constructor(x,y,xDirection,yDirection,height,range,speed,dmg,spectral,target,focus){
      this.x = x
      this.y = y
      this.xDirection = xDirection
      this.yDirection = yDirection

      this.width = height
      this.height = height
      this.life = range
      this.movement_speed = speed;
      this.dmg = dmg
      this.spectral = spectral
      this.target = [target,null]
      this.alive = true
      this.color = "rgb(0, 255, 0)"
      if (!this.spectral) {
        this.opacity = 1
      }else{
        this.opacity = 0.4
      }
      
      this.frame = 0
      this.focus= focus
    }
  
    draw(){
      this.frame++
   
      if (this.alive) {
        ctx.beginPath();
        ctx.globalAlpha = this.opacity;
        ctx.ellipse(this.x+this.height*0.8, this.y+this.height*0.8, this.width,this.height, Math.PI / 4, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.strokeStyle = "black";
        ctx.fill()
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
  
    move(allElement,ennemyList){
      for (let i = 0; i < this.movement_speed; i++) {
        if (this.target[0] && this.frame > 15 && ennemyList.length >0) {

          this.color = "rgb(255,0,0)"
          let dx = this.x - ennemyList[ennemyList.length-1].x;
          let dy = this.y - ennemyList[ennemyList.length-1].y;
          let hyp = Math.sqrt(dx*dx + dy*dy);
          dx /= hyp;
          dy /= hyp;

          this.x -=dx;
          this.y -=dy;
        }else if(this.focus ="Character"){
          this.x+=Math.sign(this.xDirection)
          this.y+=Math.sign(this.yDirection)
         

        }else{
          this.x+=Math.sign(this.xDirection)
          this.y+=Math.sign(this.yDirection)
        }
        
        this.collision(allElement,ennemyList)
      }

      this.life --
      if (this.life<=0) {
        this.alive = false
      }else{
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

    collision(allElement,ennemyList){
      if (this.alive){
        for (let i = 0; i < allElement.length; i++) {
          if (this.collisionDetection(allElement[i])[0]) {
            
            if (!this.spectral) {
              if (allElement[i] instanceof Wall) {

                this.alive = false
  
              }
            }

            
              if (allElement[i] instanceof Ennemy && this.focus == "Ennemy"){

                allElement[i].hp -= this.dmg
                
                
                console.log(allElement[i].hp);
                if (allElement[i].hp<=0) {
                  allElement[i].alive=false
                  const index =ennemyList.indexOf(allElement[i])
                  ennemyList.splice(index,1)
                  allElement.splice(i, 1)
                }

                this.alive = false
                
              }
              if (allElement[i] instanceof Character && this.focus == "Character"){
                console.log(allElement[i]);
                allElement[i].takeDamage()
                
                
                console.log(allElement[i].currentHp);
                if (allElement[i].hp<=0) {
                  allElement[i].alive=false
                  
                }
                this.alive = false
                
              }
          }
        }
      }
    }

    distance(x,y,target){
      const res = Math.sqrt((target.x-x)**2+(target.y-y)**2)
      return res
    }
  }

