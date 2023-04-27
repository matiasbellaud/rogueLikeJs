import Projectil from "./projectil.js";
import Wall, { Obstacle } from "./wall.js";

let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d'); 

export default class Ennemy{
    constructor(){
      this.x = 200;
      this.y = 300;
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

             //Projectil parameter

             this.projHeight = 10;
             this.shootNbr=1;
             this.cooldown = 1000;
             this.projectilSpeed = 7;
             this.range = 40;
             this.projDmg = 2;
             this.spectral = false;
             this.target = false;
      
             //--------------------------
      this.color ="rgb(153, 51, 153)"

             //Projectil parameter

             this.projHeight = 10;
             this.shootNbr=1;
             this.cooldown = 1000;
             this.projectilSpeed = 7;
             this.range = 40;
             this.projDmg = 2;
             this.spectral = false;
             this.target = false;
      
             //--------------------------
    
    };

    draw(allElement){
      if (this.alive) {
        
        ctx.beginPath();

        ctx.ellipse(this.x+this.height/2, this.y+this.width/2, this.width/2,this.height/2, Math.PI / 4, 0, 2 * Math.PI);
        ctx.strokeStyle = "rgb(102, 0, 102)";
        ctx.fillStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.fill();
        //tx.stroke();
        
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
 

        // if (this.distance(this.x+0.15,this.y,allElement[0])<=this.distance(this.x-0.5,this.y,allElement[0])){
        //   this.x++
        // }else{
        //   this.x--
        // }
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
        this.listProj.push(new Projectil(this.x+this.height/3,this.y+this.width/3, xLook, yLook,this.projHeight,this.range,this.projectilSpeed,this.projDmg,this.spectral,this.target,"Character"))
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
      //element.isColliding = false
      return [false,"none"]  
    }

    reload(){
      let delay = this.delay
      this.canShoot = false
      return new Promise(function(resolve, reject) {
        setTimeout(() => resolve("done"), delay);
      });
    }
  };

export class Mucusthing extends Ennemy{

  constructor(){
    super()
      this.movement_speed = 2;

      
      this.hp = 10
      this.color ="rgb(153, 100, 153)"
  }

  shoot(){}
}

export class Oozeling extends Ennemy{

  constructor(x){
    super()
      this.x = x;
      this.y = 300;

      this.movement_speed = 2;


      this.hp = 15
      this.color ="rgb(153, 255, 153)"
      this.listProj  = []
      this.projectilNbr = 0;
      this.canShoot = true;

       //Projectil parameter

       this.projHeight = 10;
       this.projectilSpeed = 5;
       this.range = 40;
       this.projDmg = 2;
       this.spectral = false
       


       //--------------------------
      
  }

  move(allElement){}

}
  


export class Shadowraith extends Ennemy{

  constructor(){
    super()
      this.movement_speed = 1;
      this.fly = true

      this.hp = 5
      this.color ="rgb(0, 0, 0)"
  }

  shoot(){}
}

export class Cthonicbeast extends Ennemy{

  constructor(){
    super()
      this.movement_speed = 1;
      this.height = 40
      this.width = 40
      this.canShoot=true
      this.isShooting = false
      this.range = 100
      this.delay = 2000
      this.hp = 20
      this.color ="rgb(234,182,118)"

      this.xAttack = this.x
      this.yAttack = this.y
  }

  draw(allElement){
    if (this.isShooting) {
            let  crack = new Image();
            ctx.globalAlpha = 0.5
            crack.src ='assets/animation/fissure.png';
            ctx.drawImage(crack,this.xAttack-this.range,this.yAttack-this.range+10,this.range*2,this.range*2)
            ctx.globalAlpha = 1
            console.log(this.xAttack-this.range);
    }else{
      
      this.xAttack = this.x
      this.yAttack = this.y
    }
    if (this.canShoot) {
      ctx.beginPath();

      ctx.ellipse(this.x+this.height/2, this.y+this.width/2, this.range,this.range, Math.PI / 4, 0, 2 * Math.PI);

      ctx.fillStyle = "rgb(115, 86, 50)";
      ctx.globalAlpha = 0.1;
      ctx.fill();

      ctx.globalAlpha = 1;
    }

    if (this.alive) {
      
      ctx.beginPath();

      ctx.ellipse(this.x+this.height/2, this.y+this.width/2, this.width/2,this.height/2, Math.PI / 4, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgb(102, 0, 102)";
      ctx.fillStyle = this.color;
      ctx.fill();
      //tx.stroke();
      
    }
    
  };

  shoot(allElement,ennemyList){
    if (this.canShoot) {
      
      this.dx = this.x - allElement[0].x;
      this.dy = this.y - allElement[0].y;
      let hyp = Math.sqrt(this.dx*this.dx + this.dy*this.dy);

      if (hyp<this.range) {
        this.reload().then(result => this.canShoot = true)
        this.animationTime().then(result => this.isShooting = false)
        this.isShooting = true
        this.hitDelay().then(result => 
          {this.dx = this.x - allElement[0].x;
            this.dy = this.y - allElement[0].y;
            let hyp = Math.sqrt(this.dx*this.dx + this.dy*this.dy);
            if (hyp<this.range) {allElement[0].takeDamage()}})
          
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

  constructor(){
    super()
      this.listProj = []
      this.movement_speed = 0;
      this.canShoot=true
      this.fly = true
      this.delay = 1000
      this.hp = 10
      this.range=100
      this.color ="rgb(49, 30, 64)"
  }

  shoot(allElement,ennemyList){
    if (this.canShoot) {
      
      this.reload().then(result => this.canShoot = true)
      for (let i = 0; i < 10; i++) {
        this.projectilSpeed = this.randomIntFromInterval(3,5)
        let dx = this.x - allElement[0].x+this.randomIntFromInterval(-30,30);
        let dy = this.y - allElement[0].y+this.randomIntFromInterval(-30,30);
        let hyp = Math.sqrt(dx*dx + dy*dy);
        dx /= hyp;
        dy /= hyp;
        let xLook = -dx
        let yLook = -dy
        
        this.listProj.push(new Projectil(this.x+this.height/3,this.y+this.width/3, xLook, yLook,this.projHeight,this.range,this.projectilSpeed,this.projDmg,this.spectral,this.target,"Character"))
        this.projectilNbr++
        
      }
      
      
    }
    this.updateProj(allElement,ennemyList);
  }


}