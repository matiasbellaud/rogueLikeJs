import Ennemy from "./ennemy.js";
import Wall, { Obstacle } from "./wall.js";

let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d');

export default class Ray{
    constructor(x,y,xDirection,yDirection,dmg,spectral,target,focus){

        this.x = x
        this.y = y
        this.xDirection = xDirection
        this.yDirection = yDirection
        this.width = 2
        
        
        this.dmg = dmg
        this.spectral = spectral;
        this.target = [target,null]
        this.alive = true
        
        
        this.frame = 0
        this.focus= focus
        this.img = ""

        this.color = "red"
        if (spectral) {
            this.color = "purple"
        }
  
        //this.ennemyList = []
    
    }

    draw(allElement,ennemyList){
        let endLineX = 0
        let endLineY = 0
        if (this.xDirection==0) {
            endLineY = this.y
            
            
            endLineY = this.collisionDetection(allElement,this.x,endLineY,ennemyList)[1];
            endLineY -= this.y
        }else{
            endLineX = this.x
            
            endLineX = this.collisionDetection(allElement,endLineY,this.y,ennemyList)[1];
            endLineX -= this.x
        }
            

        if (this.alive) {
            ctx.save();
            ctx.strokeStyle  = this.color
            ctx.lineWidth = this.width;
            ctx.beginPath()
            ctx.moveTo(this.x,this.y)
            ctx.lineTo(this.x+endLineX, this.y+endLineY);
            ctx.stroke()
            ctx.restore();
        }
    }

    collisionDetection(allElement,endX,endY,ennemyList){
        let elementOnPath = []
        for (let i = 0; i < allElement.length; i++) {
            
           let element = allElement[i]
           if (!this.spectral) {
                if (element instanceof Wall) {
                    let cell = this.collision(element,endX,endY)
                    if (cell !== undefined) {
    
                        elementOnPath.push(cell)
                    }
                }
           }else if(element instanceof Wall && !(element instanceof Obstacle)){
                let cell = this.collision(element,endX,endY)
                if (cell !== undefined) {
    
                    elementOnPath.push(cell)
                }
           }


            
            if (element instanceof Ennemy) {


                let cell = this.collision(element,endX,endY)
                if (cell !== undefined) {

                    elementOnPath.push(cell)
                }
                
                // if (element.hp<=0) {
                //     element.die(allElement)
                //     element.alive=false
                //     let index =ennemyList.indexOf(element)
                //     ennemyList.splice(index,1)
                //     index =allElement.indexOf(element)
                //     allElement.splice(index, 1)
                //   }
            }
        }
        
        let wallOnPath = []
        for (const element of elementOnPath) {

            if (element[1] instanceof Ennemy) {
                element[1].hp -= this.dmg

                if (element[1].hp<=0) {

                    element[1].alive=false

                    const index =elementOnPath.indexOf(element)
                    elementOnPath.splice(index,1)

                    const indexEnnemy =ennemyList.indexOf(element)
                    ennemyList.splice(indexEnnemy,1)
                }
            }else{
                wallOnPath.push(element[0])
            }
        }

        if (wallOnPath == []) {
            return [false,"none"] 
        }else{
            return [true,this.closest(wallOnPath)]
        }
        
    }

    collision(element,endX,endY){
        let elementOnPath = []
        const xAxis = (endX > element.x+1 && endX < element.x+element.width-1)
        const yAxis = endY > element.y && endY < element.y+element.height

        if (this.xDirection==0) {
            
            if (xAxis){
                
                if (this.yDirection>0 && element.y>this.y) {
                    
                    elementOnPath = [element.y,element]
                }else if (this.yDirection<0 && element.y<this.y) {
                    
                    elementOnPath = [element.y+element.height,element]
                }

                
            }
        
        }else{
            
            if (yAxis) {
                if (this.xDirection>0 && element.x>this.x) {
                    elementOnPath = [element.x,element]
                }else if (this.xDirection<0 && element.x<this.x) {
                    elementOnPath = [element.x+element.width,element]
                }
            }
        }
        

        if (elementOnPath.length == 0) {
            
        }else{
            return elementOnPath
        }
    }

    closest(wallProx){
        let close = []
        let distValue = []
        if (this.yDirection>0){
            close = wallProx.map(wall => [Math.round(this.distance(this.x,this.y,wall,0)),wall])
        }else{
            close = wallProx.map(wall => [Math.round(this.distance(this.x,this.y,0,wall)),wall])
        }
        
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

      distance(x,y,x2,y2){
        const res = Math.sqrt((x2-x)**2+(y2-y)**2)
        return res
      }
          
}
    
       
