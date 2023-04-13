import Projectil from "./projectil.js";
import Wall from "./wall.js";
import Door from './door.js';
import Ennemy from "./ennemy.js";
import Hp from "/hp.js";
import Item from "./item.js";


let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d'); 
let frame = 0;


export default class Character {
    constructor(){
        this.x = 700
        this.y = 200
        this.width = 10
        this.height = 10
        this.movement_speed = 4;
        this.maxHp = 5
        this.currentHp = 5
        this.listProj  = []
        this.projectilNbr = 0;
        this.canShoot = true;
        this.changeMap = false;
        this.doorPosition = top

        //Projectil parameter

        this.projHeight = 10;
        this.shootNbr=2;
        this.cooldown = 20;
        this.projectilSpeed = 11;
        this.range = 40;
        this.projDmg = 2;

        //--------------------------

        this.hp = new Hp(this.maxHp);
        this.invulnerability = 100;
        this.canTakeDmg = true;
    }

    draw(){
      var seconds = Math.floor(new Date().getTime())

      this.hp.draw();
      if (this.canTakeDmg) {
        ctx.fillStyle = "red";
      }else{
        if (seconds%2 === 0) {
          ctx.fillStyle = "red";
          
        } else{
          ctx.fillStyle = "white";
        }
        
      }
      
      ctx.fillRect(this.x,this.y,this.width,this.height)
    }

    teleportation(x,y){
      this.x = x;
      this.y = y;
    }
  
    move(listMapElement){
      
      for (let i = 0; i < this.movement_speed; i++) {
        if (keyPresses.z) {
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

        this.collisionUpdate(listMapElement)
            
            
          
        };
      };
    
  
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

    collisionUpdate(listMapElement){
      for (let i=0;i<listMapElement.length;i++){
        if (!listMapElement[i].isColliding) {
          if (this.collisionDetection(listMapElement[i])[0]) {
            this.collisionReaction(listMapElement[i],this.collisionDetection(listMapElement[i])[1],listMapElement)
          }
        }
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
  
        }
  
      }
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
  
    collisionReaction(cell,side,listMapElement){

      if (cell instanceof Wall){
        if (side == "left") {
          this.x=cell.x-this.width
    
        }
        if (side =="up") {
          this.y=cell.y-this.height
    
        }
        if (side == "right") {
          this.x=cell.x+cell.width
    
        }
        if (side == "down") {
          this.y=cell.y+cell.height
    
        }
      } else if (cell instanceof Door){
        this.changeMap = true;
        this.doorPosition = cell.doorPosition; 
      }else if (cell instanceof Ennemy){
 
        if (this.canTakeDmg) {

          
          this.invulnerabilityTime().then(result => this.canTakeDmg = true)
          
          this.hp.currentHp--
          this.currentHp--
        }
        
        
      }else if (cell instanceof Item){
        
        console.log(this.cooldown);
        cell.use(this)
        console.log(this.cooldown);
        const index =  listMapElement.indexOf(cell);
        listMapElement.splice(index, 1);
      }
      cell.isColliding = false
    }
  
    shoot(allElement){
      
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
          if (this.canShoot){
           if(this.projectilNbr===1){
            if (xLook=== 0){
              this.listProj.push(new Projectil(this.x,this.y, xLook, yLook,this.projHeight,this.range,this.projectilSpeed,this.projDmg))
            }else{
              this.listProj.push(new Projectil(this.x,this.y, xLook, yLook,this.projHeight,this.range,this.projectilSpeed,this.projDmg))
            }
            this.projectilNbr++
           }else{
              for (let i = 0; i < this.shootNbr; i++) {

                if (xLook=== 0){
                  
                  this.listProj.push( new Projectil((this.x+this.height/2)-((this.projHeight*this.shootNbr)/1.1)+(i*this.projHeight)*2,this.y, xLook, yLook,this.projHeight,this.range,this.projectilSpeed,this.projDmg))
                }else{
                  this.listProj.push(new Projectil(this.x,(this.y+this.width/2)-((this.projHeight*this.shootNbr)/1.2)+(i*this.projHeight)*2, xLook, yLook,this.projHeight,this.range,this.projectilSpeed,this.projDmg))
                }
                this.projectilNbr++
              }
           }
            this.canShoot = false
          }
      }
      this.updateProj(allElement);
    }
  
    updateProj(allElement){
      
      if (this.listProj.length > 0){
        this.listProj.forEach(element => {
          if (element.alive === true){
            element.move(allElement)
          } else {
            const index =  this.listProj.indexOf(element); 
            this.listProj.splice(index,1)
            this.projectilNbr--
          }
        });

      }
    }

    invulnerabilityTime(){
      this.canTakeDmg = false
      return new Promise(function(resolve, reject) {
        setTimeout(() => resolve("done"), 1500);
      });
    }

    reload(){
      if (this.canShoot === false){
        frame++;
      };
      
      if (frame === this.cooldown){
        this.canShoot = true;
        frame = 0;
      };
    }
  
    look(xLook,yLook){
      ctx.beginPath();
      ctx.lineTo(char.x+char.width/2,char.y+char.height/2)
      ctx.lineTo(char.x+xLook+char.width/2,char.y+yLook+char.height/2)
      ctx.stroke()
      ctx.closePath();
    }
  }

  
let keyPresses = [];
window.addEventListener('keydown', keyDownListener);
function keyDownListener(event) {
  
    keyPresses[event.key] = true;
};

window.addEventListener('keyup', keyUpListener);
function keyUpListener(event) {
    keyPresses[event.key] = false;
};