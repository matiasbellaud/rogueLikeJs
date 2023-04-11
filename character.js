import Projectil from "./projectil.js";
import Wall from "./wall.js";
import Floor from "./floor.js";
import Door from './door.js';

let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d'); 

export default class Character {
    constructor(){
        this.x = 700
        this.y = 200
        this.width = 16
        this.height = 16
        this.movement_speed = 4;
        //this.hp = 3
        this.listProj  = {}
        this.projectilNbr = 0;
        this.canShoot = true;
        this.changeMap = false;
    }

    draw(){
      ctx.fillStyle = "red";
      ctx.fillRect(this.x,this.y,this.width,this.height)
    }

    teleportation(x,y){
      this.x = x;
      this.y = y;
    }
  
    move(listMapElement){
      for (let i = 0; i < this.movement_speed; i++) {
        if (keyPresses.z ) {
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

        for (let i=0;i<listMapElement.length;i++){
          if (!listMapElement[i].isColliding) {
            if (this.collisionDetection(listMapElement[i])[0]) {
              this.collisionReaction(listMapElement[i],this.collisionDetection(listMapElement[i])[1])
            }
          }
        };
      };
    }
  
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
  
    collisionReaction(cell,side){
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
        this.teleportation(700,400)
        this.changeMap = true   
      }
      cell.isColliding = false
    }
  
    shoot(allWall){
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
            this.listProj[this.projectilNbr] = new Projectil(this.x,this.y, xLook, yLook)
            this.projectilNbr++
            this.canShoot = false
          }
      }
      this.startProj(allWall);
    }
  
    startProj(allWall){
      if (Object.keys(this.listProj).length > 0){
        for (let key in this.listProj){
          if (this.listProj[key].life < 300){
            this.listProj[key].move(allWall)
          } else {
            delete this.listProj[key]
          }
        }
      }
    };
  
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