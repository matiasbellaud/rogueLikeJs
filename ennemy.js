import { healPotion,UpDamageElixir,UpSpeedMoveElixir,UpSpeedShootElixir } from "./item.js";
import Projectil from "./projectil.js";
import Wall, { Obstacle } from "./wall.js";

let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d'); 

export default class Ennemy{
    constructor(x,y){
      this.x = x;
      this.y = y;
      this.width = 30;
      this.height = 30;
      this.movement_speed = 2;
      this.fly = false
      this.delay = 1000
      this.dx = 0
      this.dy = 0
      this.alive = true
      this.hp = 10
      this.color ="rgb(153, 51, 153)"
      this.isBoss = false
      this.canMove = true

      //Projectil parameter

             this.projHeight = 10;
             this.shootNbr=1;
             this.cooldown = 1000;
             this.projectilSpeed = 7;
             this.range = 40;
             this.projDmg = 2;
             this.spectral = false;
             this.target = false;
             this.blizt = false;
             this.divide = false
             this.projImg = 'assets/projectil/fireball.png'
      
             //--------------------------
      this.color ="rgb(153, 51, 153)"

    
    };

    draw(allElement){
      if (this.alive) {  
        ctx.beginPath();

        ctx.ellipse(this.x+this.height/2, this.y+this.width/2, this.width/2,this.height/2, Math.PI / 4, 0, 2 * Math.PI);
        ctx.strokeStyle = "rgb(102, 0, 102)";
        ctx.fillStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.fill();   
      }
    };

    hitbox(){
      ctx.fillStyle = "white";
      ctx.fillRect(this.x,this.y,this.width*2,1)
      ctx.fillRect(this.x,this.y+this.width,this.width*2,1)
      ctx.fillStyle = "yellow";
      ctx.fillRect(this.x,this.y,1,this.height*2)
      ctx.fillRect(this.x+this.height,this.y,1,this.height*2)

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
      if (this.canMove) {
        
        
        this.dx = this.x - allElement[0].x;
        this.dy = this.y - allElement[0].y;
        let hyp = Math.sqrt(this.dx*this.dx + this.dy*this.dy);
        this.dx /= hyp;
        this.dy /= hyp;

        for (let i = 0; i < this.movement_speed; i++) {
          this.y -= this.dy
          
          for (let i = 0; i < allElement.length; i++) {
                if (this.collisionDetection(allElement[i])[0]) {
                  if (!this.fly) {
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
                  }else if(allElement[i] instanceof Wall && !(allElement[i] instanceof Obstacle)){
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
          this.x -= this.dx
              for (let i = 0; i < allElement.length; i++) {
                if (this.collisionDetection(allElement[i])[0]) {
                  if (!this.fly) {
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
                  }else if (allElement[i] instanceof Wall && !(allElement[i] instanceof Obstacle)) {
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
      }
    };

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
        this.listProj.push(new Projectil(this.x+this.width/2,this.y+this.height/4, xLook, yLook,this.projHeight,this.range,this.projectilSpeed,this.projDmg,this.spectral,this.piercing,this.target,this.blitz,this.divide,"Character",this.projImg))
        this.projectilNbr++
      }
      this.updateProj(allElement,ennemyList);
    }
  
    collisionDetection(element){
      const xAxis = (this.x+this.width > element.x+1 && this.x < element.x+element.width-1)
      const yAxis = this.y+this.height > element.y+1 && this.y< element.y+element.height-1
  
      const upBox = (this.y+this.height >= element.y && this.y <= element.y+1)
      const downBox = (this.y <= element.y+element.height && this.y >= element.y+element.height-1)
  
      const leftBox = (this.x+this.width >= element.x && this.x <= element.x+1)
      const rightBox = (this.x <= element.x+element.width && this.x >= element.x+element.width-1)


      if (xAxis){
  
        if (upBox) {
          return [true,'up']
        }else {this.sMove = true}
  
        if (downBox) {
          return [true,"down"]
        }else{this.zMove = true}

      }else{this.sMove = true;this.zMove = true}
      if (yAxis) {
        
        if (leftBox) {
          return [true, "left"]
        }else { this.dMove = true}
  
        if (rightBox) {   
          return [true,"right"]
        }else{ this.qMove = true}
      }
      return [false,"none"]  
    }

    reload(){
      let delay = this.delay
      this.canShoot = false
      return new Promise(function(resolve, reject) {
        setTimeout(() => resolve("done"), delay);
      });
    }

    die(allElement){
        let chance = Math.floor(Math.random() * (100 - 0 + 1) + 0)
        if (chance <= 10){
          let potion = new healPotion(this.x,this.y)
          allElement.push(potion)
      
        } else if (chance >= 11 && chance <= 13){
          let potion = new UpDamageElixir(this.x,this.y)
          allElement.push(potion)
     
        } else if (chance >= 14 && chance <= 17){
          let potion = new UpSpeedShootElixir(this.x,this.y)
          allElement.push(potion)
      
        } else if (chance >= 18 && chance <= 21){
          let potion = new UpSpeedMoveElixir(this.x,this.y)
          allElement.push(potion)
        }
    }
  };

export class Mucusthing extends Ennemy{

  constructor(x,y){
    super(x,y)
      this.movement_speed = 2;
      this.hp = 10
      this.height=40
      this.width=40

      this.sprite = 11
      this.frame = 0
      this.indexSprite = 0
    }
  
    draw(){
      
      let  ennemy = new Image();
      if (this.frame%2==0) {
        this.indexSprite ++
        if (this.indexSprite == this.sprite+1) {
          this.indexSprite = 0
        }
      }
       if (this.dx>0) {
        ennemy.src = "/assets/Ennemy/Mucuthing/reverse/Mucuthing"+this.indexSprite+".png"
       }else{
      ennemy.src = "/assets/Ennemy/Mucuthing/Mucuthing"+this.indexSprite+".png"
      }
      ctx.drawImage(ennemy,this.x,this.y,this.width,this.height)
      this.frame++
    }
  shoot(){}
}

export class Oozeling extends Ennemy{

  constructor(x){
    super()
      this.x = x;
      this.y = 300;

      this.height = 60
      this.width = 60

      this.movement_speed = 2;

      this.hp = 15
      this.color ="rgb(153, 255, 153)"
      this.listProj  = []
      this.projectilNbr = 0;
      this.canShoot = true;

       //Projectil parameter

       this.projHeight = 25;
       this.projectilSpeed = 5;
       this.range = 40;
       this.projDmg = 2;
       this.spectral = false
       this.projImg = 'assets/projectil/acidball.png'
      

       //--------------------------
       this.sprite = ["/assets/Ennemy/Oozeling/Oozeling-Face.png","/assets/Ennemy/Oozeling/Oozeling-Face2.png","/assets/Ennemy/Oozeling/Oozeling-Face3.png","/assets/Ennemy/Oozeling/Oozeling-Face4.png","/assets/Ennemy/Oozeling/Oozeling-Face5.png"]
       this.frame = 0
       this.indexSprite = 0
      
  }

  draw(){
    
    let  ennemy = new Image();
    if (this.frame%5==0) {
      this.indexSprite ++
      if (this.indexSprite == this.sprite.length) {
        this.indexSprite = 0
      }
    }
    ennemy.src = this.sprite[this.indexSprite]
    ctx.drawImage(ennemy,this.x,this.y,this.width,this.height)
    this.frame++
  }

  move(allElement){}
}
  
export class Shadowraith extends Ennemy{
  constructor(x,y){
    super(x,y)
    this.height = 60
    this.width = 60
    this.movement_speed = 1;
    this.fly = true
    this.hp = 5
      
      
    this.sprite = 3
    this.frame = 0
    this.indexSprite = 0
  }

  draw(){
    
    let  ennemy = new Image();
    if (this.frame%10==0) {
      this.indexSprite ++
      if (this.indexSprite == this.sprite+1) {
        this.indexSprite = 0
      }
    }
    ennemy.src = "/assets/Ennemy/ShadowWrath/ShadowWrath"+this.indexSprite+".png"
    ctx.drawImage(ennemy,this.x,this.y,this.width,this.height)
    this.frame++
  }
  shoot(){}
}

export class Cthonicbeast extends Ennemy{
  constructor(x,y){
    super(x,y)
      this.movement_speed = 1;
      this.height = 100
      this.width = 100
      this.canShoot=true
      this.isShooting = false
      this.range = 120
      this.delay = 2000
      this.hp = 50
      this.color ="rgb(234,182,118)"
      this.xAttack = (this.x+this.range/2)
      this.yAttack = (this.y+this.range/2)
      this.isBoss = true

      this.sprite = 7
      this.frame = 0
      this.indexSprite = 0
  }

  draw(allElement){
    this.xAttack = (this.x+this.range/2)
    this.yAttack = (this.y+this.range/2)
    if (this.isShooting) {
            let  crack = new Image();
            ctx.globalAlpha = 0.5
            crack.src ='assets/animation/fissure.png';
            ctx.drawImage(crack,this.x-this.range/1.5,this.y-this.range/1.5,this.range*2,this.range*2)
            ctx.globalAlpha = 1
    }
    if (this.canShoot) {
      ctx.beginPath();

      ctx.ellipse(this.x+this.height/2, this.y+this.width/2, this.range,this.range, Math.PI / 4, 0, 2 * Math.PI);

      ctx.fillStyle = "rgb(115, 86, 50)";
      ctx.globalAlpha = 0.3;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    if (this.alive) {
      
      let  ennemy = new Image();
      if (this.frame%4==0) {
        this.indexSprite ++
        if (this.indexSprite == this.sprite) {
          this.indexSprite = 0
        }
      }if (this.isShooting) {
        this.canMove = false
        ennemy.src = "/assets/Ennemy/ChtonicBeast/chtonicBeastHandUp.png"
      
      }else{
        this.canMove = true
        ennemy.src = "/assets/Ennemy/ChtonicBeast/chtonicBeast"+this.indexSprite+".png"
      }
      
      ctx.drawImage(ennemy,this.x,this.y,this.width,this.height)
      this.frame++
      

    }
  };

  shoot(allElement,ennemyList){
    if (this.canShoot) {
      
      this.dx = this.xAttack - allElement[0].x;
      this.dy = this.yAttack- allElement[0].y;
      let hyp = Math.sqrt(this.dx*this.dx + this.dy*this.dy);

      if (hyp<this.range) {
        this.reload().then(result => this.canShoot = true)
        this.animationTime().then(result => this.isShooting = false)
        this.isShooting = true
        this.hitDelay().then(result => { 
            this.dx = this.xAttack - allElement[0].x;
            this.dy = this.yAttack - allElement[0].y;
            let hyp = Math.sqrt(this.dx*this.dx + this.dy*this.dy);
            if (hyp<this.range) {allElement[0].takeDamage()}
          }
            
            )
      }
    }
  }

  animationTime(){
    return new Promise(function(resolve, reject) {
      setTimeout(() => resolve("done"), 500);
    });
  }

  hitDelay(){
    return new Promise(function(resolve, reject) {
      setTimeout(() => resolve("done"), 300);
    });
  }
}

export class Necrodrake extends Ennemy{
  constructor(x,y){
    super(x,y)
    this.height = 100
    this.width = 100 
    this.listProj = []
    this.movement_speed = 2;
    this.canShoot=true
    this.fly = true
    this.delay = 1000
    this.projHeight = 15
    this.hp = 30
    this.range=100
    this.color ="rgb(49, 30, 64)"
    this.isBoss = true
    this.projImg ="assets/projectil/fireball.png"

    this.sprite = 8
    this.frame = 0
    this.indexSprite = 0
  }


  draw(){
    
    let  ennemy = new Image();
    if (this.frame%4==0) {
      this.indexSprite ++
      if (this.indexSprite == this.sprite+1) {
        this.indexSprite = 0
      }
    }
    if (this.dx<0) {
    ennemy.src = "/assets/Ennemy/NecroDrake/nd"+this.indexSprite+".png"
    }else{
      ennemy.src = "/assets/Ennemy/NecroDrake/reverse/nd"+this.indexSprite+".png"
    }
    ctx.drawImage(ennemy,this.x,this.y,this.width,this.height)
    this.frame++
  }

  shoot(allElement,ennemyList){
    if (this.canShoot) {
      this.reload().then(result => this.canShoot = true)
      for (let i = 0; i < this.randomIntFromInterval(7,12); i++) {
        this.projectilSpeed = this.randomIntFromInterval(3,5)
        this.dx = this.x - allElement[0].x+this.randomIntFromInterval(-35,35);
        this.dy = this.y - allElement[0].y+this.randomIntFromInterval(-35,35);
        let hyp = Math.sqrt(this.dx*this.dx + this.dy*this.dy);
        let dx = this.dx/ hyp;
        let dy = this.dy/ hyp;
        let xLook = -dx
        let yLook = -dy
        if (this.dx<0) {
        this.listProj.push(new Projectil(this.x+this.height-10,this.y+this.width/2-5, xLook, yLook,this.projHeight,this.range,this.projectilSpeed,this.projDmg,this.spectral,this.piercing,this.target,this.blitz,this.divide,"Character",this.projImg))
        }else{
          this.listProj.push(new Projectil(this.x,this.y+this.width/2-5, xLook, yLook,this.projHeight,this.range,this.projectilSpeed,this.projDmg,this.spectral,this.piercing,this.target,this.blitz,this.divide,"Character",this.projImg))
        }
        this.projectilNbr++
      }
    }
    this.updateProj(allElement,ennemyList);
  }
}