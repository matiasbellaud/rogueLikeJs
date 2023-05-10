import Wall, { Obstacle } from "./wall.js";
import Ennemy from "./ennemy.js";
import Character from "./character.js";

let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d'); 

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export default class Projectil{
    constructor(x,y,xDirection,yDirection,height,range,speed,dmg,spectral,piercing,target,blitz,divide,focus,img){

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
      this.piercing = piercing;
      this.target = [target,null]
      this.divide = divide

      this.alive = true
      this.frame = 0
      this.focus= focus
      this.img = img

      this.ennemyList = []

      if (blitz) {
          let luck = randomIntFromInterval(1,10)
          if (luck==1) {
            this.dmg*=3
            this.movement_speed+=10
            this.img = "/assets/projectil/blitz.png"
          }
      }
    }



    getAngles(){
      let scalaire =0*this.xDirection+-1*this.yDirection
      let angle = scalaire/((this.distance(0,0,0,-1)*this.distance(0,0,this.xDirection,this.yDirection)))
      if (this.xDirection>0) {
        angle = Math.acos(angle)
      }else{
        angle = -Math.acos(angle)
      }
      
      return angle
    }
  
    draw(){
      this.frame++
      let degrees =this.getAngles()

      let  arrow = new Image();
      if (this.spectral) {
        arrow.src = "/assets/projectil/spectralArrow.png"
      }else if (this.piercing){
        arrow.src = "/assets/projectil/piercingArrow.png"
      }else{
        arrow.src = this.img;
      }
      
   
      if (this.alive) {
        ctx.save();
        ctx.translate(this.x+this.height/2,this.y+this.width/2)
        ctx.rotate(degrees);
        
        ctx.drawImage(arrow,0-this.height,0-this.width,this.width*2,this.height*2)
        
        ctx.restore();

      }
      ctx.globalAlpha = 1;
    }

    closest(ennemyList){
      let distValue = []
      const close = ennemyList.map(ennemy => [Math.round(this.distance(this.x,this.y,ennemy.x,ennemy.y)),ennemy])
      close.forEach(element => {
        distValue.push(element[0])
      });

      const smallest = Math.min(...distValue)


      for (const element of close) {
        if(smallest==element[0]){
          return element[1];
          
          
        }
      }
      
    }
  
    move(allElement,ennemyList){
 

      this.movement_speed = Math.max(1,this.movement_speed)
      for (let i = 0; i < this.movement_speed; i++) {
        if (this.target[0] && this.frame > 15 && ennemyList.length >0) {
          const cible = this.closest(ennemyList)
          this.img = "assets/projectil/targetArrow.png"
          let dx = this.x - (cible.x+cible.width/2);
          let dy = this.y - (cible.y+cible.height/2);
          let hyp = Math.sqrt(dx*dx + dy*dy);

          dx /= hyp;
          dy /= hyp;
          this.xDirection = -dx
          this.yDirection = -dy

          this.x -=dx;
          this.y -=dy;
        }else if(this.focus =="Character"){
          this.x+=this.xDirection
          this.y+=this.yDirection
         

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
      if (this.alive) {
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
      return [false,"none"]  

        
    }

    alreadyHit(ennemy){
      
      let known = false
      this.ennemyList.forEach(element => {
        if (element[0] == ennemy) {
          known = true
        }
      });
      if (!known) {
        this.ennemyList.push([ennemy,false])
      }
      
      let index 
      for (let i = 0; i < this.ennemyList.length; i++) {
        const ind  = this.ennemyList[i].indexOf(ennemy)
        if (ind != -1) {
          index = i
          break
        }
      }


      if (index != 1 && !this.ennemyList[index][1]) {
        
        this.ennemyList[index][1] = true
        return false
      }else{
        return true
      }
       
      
    }

    collision(allElement,ennemyList){

      if (this.alive){

        for (let i = 0; i < allElement.length; i++) {
          
          if (this.collisionDetection(allElement[i])[0]) {

            
            if (!this.spectral) {
              if (allElement[i] instanceof Wall) {
                this.alive = false
              }
            }else if (allElement[i] instanceof Wall && !(allElement[i] instanceof Obstacle)){
                this.alive = false
              
            }
            
            
              if (allElement[i] instanceof Ennemy && this.focus == "Ennemy" && !this.alreadyHit(allElement[i])){

                allElement[i].hp -= this.dmg
                
                if (allElement[i].hp<=0) {
                  allElement[i].die(allElement)
                  allElement[i].alive=false
                  const index =ennemyList.indexOf(allElement[i])
                  ennemyList.splice(index,1)
                  allElement.splice(i, 1)
                }
                if (!this.piercing) {
                  this.alive = false
                }
                
                
              }
              if (allElement[i] instanceof Character && this.focus == "Character"){
   
                allElement[i].takeDamage()
                
                if (allElement[i].hp<=0) {
                  allElement[i].alive=false
                  
                }
                this.alive = false
                
              }
          }
        }
      }
    }

    distance(x,y,x2,y2){
      const res = Math.sqrt((x2-x)**2+(y2-y)**2)
      return res
    }
  }

