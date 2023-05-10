import Projectil from "./projectil.js";
import Wall, { Obstacle } from "./wall.js";
import Door from './door.js';
import Ennemy from "./ennemy.js";
import Hp from "./hp.js";
import Item from "./item.js";
import Stair from './stair.js'
import Ray from "./ray.js";
import GamePad from "./gamePad.js";


let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d'); 
let frame = 0;

export default class Character {
    constructor(){
        this.x = 700
        this.y = 200
        this.width = 16
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
        this.cross=false
        this.fly = false

        //Projectil parameter

        this.projHeight = 15;
        this.shootNbr=1;
        this.cooldown = 35;
        this.projectilSpeed = 8;
        this.range = 40;
        this.projDmg = 5;
        this.spectral = false;
        this.piercing = false;
        this.target = false;
        this.ray = false;
        this.blitz = false;
        this.divide = false;
        this.projImg='assets/projectil/baseArrow.png';

        //--------------------------

        this.stateSprite = 0;
        this.direction = "S"

        this.spriteW = 3
        this.frameW = 0
        this.indexSpriteW = 0

        this.gp = new GamePad()
    }

    draw(){
      this.gp.update()
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
        if (keyPresses.z || this.gp.y<0) {
          this.y -=  1
          isMoveTop = true
        } else if (keyPresses.s || this.gp.y>0) {
          this.y +=  1
          isMoveBottom = true
        }
    
        if (keyPresses.q || this.gp.x<0) {
          this.x -=  1
          isMoveLeft = true
        } else if (keyPresses.d || this.gp.x>0) {
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
      if (this.fly) {
        if (this.frameW%8==0) {
          this.indexSpriteW ++
          if (this.indexSpriteW == this.spriteW+1) {
            this.indexSpriteW = 0
          }
        }
        let  wing = new Image();
        let wing2 = new Image();
        if (this.direction=="S" ||this.direction=="SE"|| this.direction=="SO") {
          wing.src = '/assets/character/wing/wing'+ this.indexSpriteW+'.png'
          wing2.src = '/assets/character/wing//reverse/wing'+ this.indexSpriteW+'.png'
          ctx.drawImage(wing,this.x-25,this.y-15,this.width*2,this.height*2)
          ctx.drawImage(wing2,this.x+10,this.y-15,this.width*2,this.height*2)
        }else if (this.direction=="E") {
          wing2.src = '/assets/character/wing//reverse/wing'+ this.indexSpriteW+'.png'
          ctx.drawImage(wing2,this.x+10,this.y-15,this.width*2,this.height*2)
        }if (this.direction=="O") {
          wing.src = '/assets/character/wing/wing'+ this.indexSpriteW+'.png'
          ctx.drawImage(wing,this.x-25,this.y-15,this.width*2,this.height*2)
        }


        this.frameW++
      }


      let column
      let heightChar = 32
      let widthChar = 32
      let positionX = (this.x+this.width/2)-widthChar/2
      let positionY = (this.y+this.height/2)-heightChar/2

      let  char = new Image();
      char.src = 'assets/character/character.png';

      if (isMove === true){
        if (this.canTakeDmg){
          char.src = 'assets/character/character.png';
        } else {
          char.src = 'assets/character/characterRed.png';
        }
        
      } else {
        if (this.canTakeDmg){
          char.src = 'assets/character/stopCharacter.png';
        } else {
          char.src = 'assets/character/stopCharacterRed.png';
        }
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
      if (this.fly) {
        if (this.direction=="N" ||this.direction=="NE"|| this.direction=="NO") {
          let  wing = new Image();
          let wing2 = new Image();
          wing.src = '/assets/character/wing/wing'+ this.indexSpriteW+'.png'
          wing2.src = '/assets/character/wing//reverse/wing'+ this.indexSpriteW+'.png'
          ctx.drawImage(wing,this.x-25,this.y-15,this.width*2,this.height*2)
          ctx.drawImage(wing2,this.x+10,this.y-15,this.width*2,this.height*2)
        }
        
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
        // var dmg = new Audio("/assets/sound/dmg.mp3")
        // dmg.play()
        this.invulnerabilityTime().then(result => this.canTakeDmg = true)
        this.hp.currentHp--
        this.currentHp--
      }

      if (this.currentHp<=0) {
        this.alive = false
        // var death = new Audio("/assets/sound/death.mp3")
        // death.play()
        // death.addEventListener('ended', function() {
        // death = null
        //   }, false);
      }

    }
  
    collisionReaction(cell,side,listMapElement){
      if (this.fly && cell instanceof Wall && !(cell instanceof Obstacle)) {
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
      }else if (cell instanceof Wall && !this.fly){
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
      
      if (keyPresses.ArrowUp || keyPresses.ArrowDown || keyPresses.ArrowLeft || keyPresses.ArrowRight || this.gp.X || this.gp.Y || this.gp.A || this.gp.B) {

        let xLook = 0
        let yLook = 0
        if (keyPresses.ArrowUp || this.gp.X) {
            xLook = 0
            yLook = -50
            this.look(xLook,yLook)
  
            
          } else if (keyPresses.ArrowDown || this.gp.B) {
            xLook = 0
            yLook = 50
            this.look(xLook,yLook)
  
          }
      
          if (keyPresses.ArrowLeft || this.gp.Y) {
            xLook = -50
            yLook = 0
            this.look(xLook,yLook)
  
          } else if (keyPresses.ArrowRight || this.gp.A) {
            xLook = 50
            yLook = 0
            this.look(xLook,yLook)
            
          }
          if (this.canShoot){
            if (this.cross) {
              let cross = [[0,1],[0,-1],[-1,0],[1,0]]
                    for (let i = 0; i < cross.length; i++) {
                      this.listProj.push( new Projectil(this.x,this.y+5,cross[i][0],cross[i][1],this.projHeight,this.range,this.projectilSpeed,this.projDmg,this.spectral,this.piercing,this.target,this.blitz,this.divide,"Ennemy",this.projImg))
                      this.projectilNbr++
                    }
                    this.canShoot = false
            }else{
            if (this.ray) {

              for (let i = 1; i <= this.shootNbr; i++) {
                const ray = new Ray(this.x+5,this.y+(10+(i*3.5)), xLook, yLook,this.projDmg,this.spectral,this.target,focus)
                ray.draw(allElement,ennemyList)
              }
            }else{
           
           if(this.shootNbr===1){
            if (xLook=== 0){
              this.listProj.push(new Projectil(this.x,this.y+5, xLook, yLook,this.projHeight,this.range,this.projectilSpeed,this.projDmg,this.spectral,this.piercing,this.target,this.blitz,this.divide,"Ennemy",this.projImg))
            }else{
              this.listProj.push(new Projectil(this.x,this.y+5, xLook, yLook,this.projHeight,this.range,this.projectilSpeed,this.projDmg,this.spectral,this.piercing,this.target,this.blitz,this.divide,"Ennemy",this.projImg))
            }
            this.projectilNbr++
           }else{
              for (let i = 0; i < this.shootNbr; i++) {

                if (xLook=== 0){
                  
                  this.listProj.push( new Projectil((this.x+this.height/2)-((this.projHeight*this.shootNbr)/1.1)+(i*this.projHeight)*2,this.y+10, xLook, yLook,this.projHeight,this.range,this.projectilSpeed,this.projDmg,this.spectral,this.piercing,this.target,this.blitz,this.divide,"Ennemy",this.projImg))
                }else{
                  this.listProj.push(new Projectil(this.x,(this.y+this.width/2)-((this.projHeight*this.shootNbr)/1.2)+(i*this.projHeight)*2+10, xLook, yLook,this.projHeight,this.range,this.projectilSpeed,this.projDmg,this.spectral,this.piercing,this.target,this.blitz,this.divide,"Ennemy",this.projImg))
                }
                this.projectilNbr++
              }
           }
            }
            this.canShoot = false
          }
        }
      }
      this.updateProj(allElement,ennemyList);
    }
  
    updateProj(allElement,ennemyList){

      if (this.listProj.length > 0){

        this.listProj.forEach(element => {
          if (!(element=== undefined)) {
            if (element.alive === true){
              element.move(allElement,ennemyList)
            } else {
              delete this.listProj[this.listProj.indexOf(element)]
              this.projectilNbr--
              if (element.divide){
                let cross = [[1,1],[1,-1],[-1,-1],[-1,1]]
                for (let i = 0; i < cross.length; i++) {
                  this.listProj.push( new Projectil(element.x,element.y,cross[i][0],cross[i][1],8,this.range/2,this.projectilSpeed/3,this.projDmg/3,this.spectral,this.piercing,this.target,this.blitz,false,"Ennemy",this.projImg))
                  this.projectilNbr++
                }
              }
            }
          }
        });
      }
    }

    invulnerabilityTime(){
      this.canTakeDmg = false
      let delay = this.invulnerability*10
      return new Promise(function(resolve, reject) {
        setTimeout(() => resolve("done"), delay);
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





