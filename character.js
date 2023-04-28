import Projectil from "./projectil.js";
import Wall from "./wall.js";
import Door from './door.js';
import Ennemy from "./ennemy.js";
import Hp from "./hp.js";
import Item from "./item.js";
import Stair from './stair.js'


let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d'); 
let frame = 0;

export default class Character {
    constructor(){
        this.x = 700
        this.y = 200
        this.width = 12
        this.height = 25
        this.movement_speed = 4;
        this.maxHp = 5
        this.currentHp = this.maxHp
        this.hp = new Hp(this.maxHp,this.currentHp);
        this.alive = true
        this.invulnerability = 100;
        this.canTakeDmg = true;
        this.listProj  = []
        this.projectilNbr = 0;
        this.canShoot = true;
        this.changeMap = false;
        this.changeLevel = false;
        this.doorPosition = top
        this.listItem = []

        //Projectil parameter

        this.projHeight = 10;
        this.shootNbr=1;
        this.cooldown = 20;
        this.projectilSpeed = 7;
        this.range = 40;
        this.projDmg = 5;
        this.spectral = false;
        this.target = false;

        //--------------------------

        this.stateSprite = 0;
        this.direction = "S"
    }

    draw(){
      this.hp.draw(this.currentHp);
    }

    teleportation(x,y){
      this.x = x;
      this.y = y;
    }
  
    move(listMapElement){
      let isMoveTop = false;
      let isMoveRight = false;
      let isMoveBottom = false;
      let isMoveLeft = false;
      let isMove = false
      let moveNow = ""

      for (let i = 0; i < this.movement_speed; i++) {
        if (keyPresses.z) {
          this.y -=  1
          isMoveTop = true
        } else if (keyPresses.s) {
          this.y +=  1
          isMoveBottom = true
        }
    
        if (keyPresses.q ) {
          this.x -=  1
          isMoveLeft = true
        } else if (keyPresses.d ) {
          this.x +=  1
          isMoveRight = true
        }
        
        this.collisionBox()

        this.collisionUpdate(listMapElement) 
        };
        
        if (isMoveTop){
          moveNow += "N"
          isMove = true
        }
        if (isMoveBottom){
          moveNow += "S"
          isMove = true
        }
        if (isMoveLeft){
          moveNow += "E"
          isMove = true
        }
        if (isMoveRight){
          moveNow += "O"
          isMove = true
        }

        if (moveNow != ""){
          this.direction = moveNow
        }
        this.sprite(isMove)
      };
    
    sprite(isMove){
      let column
      let heightChar = 32
      let widthChar = 32
      let positionX = (this.x+this.width/2)-widthChar/2
      let positionY = (this.y+this.height/2)-heightChar/2

      let  char = new Image();
      char.src = 'assets/character/character.png';

      if (isMove === true){
        char.src = 'assets/character/character.png';
      } else {
        char.src = 'assets/character/stopCharacter.png';
      }
        
      switch (this.direction){
        case "N":
          column = 0
          break;
        case "NO": 
          column = 1
          break;
        case "O":
          column = 2
          break;
        case "SO":
          column = 3
          break ;
        case "S":
          column = 4
          break
        case "SE":
          column = 5
          break
        case "E":
          column = 6
          break
        case "NE":
          column = 7
          break
      }
      ctx.drawImage(char,this.stateSprite*32,column*32,widthChar,heightChar,positionX,positionY,32,32,)
      this.stateSprite++
      if (this.stateSprite===7){
        this.stateSprite=0;
      }
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

    takeDamage(){
      
      if ( this.canTakeDmg) {
        var dmg = new Audio("/assets/sound/dmg.mp3")
        dmg.play()
        this.invulnerabilityTime().then(result => this.canTakeDmg = true)
        this.hp.currentHp--
        this.currentHp--
      }

      if (this.currentHp<=0) {
        this.alive = false
        var death = new Audio("/assets/sound/death.mp3")
        death.play()
        death.addEventListener('ended', function() {
        death = null
          }, false);
      }

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
       
          this.takeDamage();
      
        
      }else if (cell instanceof Item){
       
        cell.use(this)
        if (!cell.active) {
          // var dmg = new Audio("/assets/sound/powerUp.mp3")
          // dmg.play()
          if (!cell.consumable){
            this.listItem.push(cell)
          }
          const index =  listMapElement.indexOf(cell);
          listMapElement.splice(index, 1);
        }
       

      } else if (cell instanceof Stair){
        this.changeLevel = true;
      }

      cell.isColliding = false
    }
  
    shoot(allElement,ennemyList){
      
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
              this.listProj.push(new Projectil(this.x,this.y, xLook, yLook,this.projHeight,this.range,this.projectilSpeed,this.projDmg,this.spectral,this.target,"Ennemy"))
            }else{
              this.listProj.push(new Projectil(this.x,this.y, xLook, yLook,this.projHeight,this.range,this.projectilSpeed,this.projDmg,this.spectral,this.target,"Ennemy"))
            }
            this.projectilNbr++
           }else{
              for (let i = 0; i < this.shootNbr; i++) {

                if (xLook=== 0){
                  
                  this.listProj.push( new Projectil((this.x+this.height/2)-((this.projHeight*this.shootNbr)/1.1)+(i*this.projHeight)*2,this.y, xLook, yLook,this.projHeight,this.range,this.projectilSpeed,this.projDmg,this.spectral,this.target,"Ennemy"))
                }else{
                  this.listProj.push(new Projectil(this.x,(this.y+this.width/2)-((this.projHeight*this.shootNbr)/1.2)+(i*this.projHeight)*2, xLook, yLook,this.projHeight,this.range,this.projectilSpeed,this.projDmg,this.spectral,this.target,"Ennemy"))
                }
                this.projectilNbr++
              }
           }
            this.canShoot = false
          }
      }
      this.updateProj(allElement,ennemyList);
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

    drawListItem(){
      let x =850
      for(let i=0;i<this.listItem.length;i++){
        this.listItem[i].draw(x,0)
        x-=30
      }
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