import Wall, { Obstacle } from "./wall.js";

let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d');

export default class Ray{
    constructor(x,y,xDirection,yDirection,dmg,piercing,target,focus){

        this.x = x
        this.y = y
        this.xDirection = xDirection
        this.yDirection = yDirection
        this.width = 8
        
        
        this.dmg = dmg
        this.piercing = piercing;
        this.target = [target,null]
        this.alive = true
        
        
        this.frame = 0
        this.focus= focus
        this.img = ""
  
        this.ennemyList = []
    
    }

    draw(allElement){
        let endLineX = 0
        let endLineY = 0
        if (this.xDirection==0) {
            endLineY = this.y
            
            
            endLineY = this.collisionDetection(allElement,this.x,endLineY)[1];
            endLineY -= this.y
        }else{
            endLineX = this.x
            
            endLineX = this.collisionDetection(allElement,endLineY,this.y)[1];
            endLineX -= this.x
        }
            

        if (this.alive) {
            ctx.save();
            ctx.strokeStyle  = "red"
            ctx.lineWidth = this.width;
            ctx.beginPath()
            ctx.moveTo(this.x,this.y)
            ctx.lineTo(this.x+endLineX, this.y+endLineY);
            ctx.stroke()
            ctx.restore();
        }
    }

    collisionDetection(allElement,endX,endY){
        for (let i = 0; i < allElement.length; i++) {
            
           let wall = allElement[i]

            
            
            if (wall instanceof Obstacle) {
                
                const xAxis = (endX > wall.x+1 && endX < wall.x+wall.width-1)
                const yAxis = endY > wall.y && endY < wall.y+wall.height
            
                const upBox = (endY >= wall.y && endY <= wall.y+1)
                const downBox = (endY <= wall.y+wall.height && endY >= wall.y+wall.height-1)
            
                const leftBox = (endX >= wall.x && endX <= wall.x+1)
                const rightBox = (endX <= wall.x+wall.width && endX >= wall.x+wall.width-1)

                if (this.xDirection==0) {
                    
                    if (xAxis){
                        if (this.yDirection>0 && wall.y>this.y) {
                            
                            return [true,wall.y]
                        }else if (this.yDirection<0 && wall.y<this.y) {
                            return [true,wall.y+wall.height]
                        }

                        
                    }
                
                }else{
                    if (yAxis) {
                        if (this.xDirection>0 && wall.x>this.x) {
                            return [true,wall.x]
                        }else if (this.xDirection<0 && wall.x<this.x) {
                            return [true,wall.x+wall.width]
                        }
                    }
                }
            }
            
        }
        return [false,"none"] 
    }

    closest(allElement){
        let distValue = []
        const close = allElement.map(wall => [Math.round(this.distance(this.x,this.y,wall.x,wall.y)),wall])
        close.forEach(element => {
          distValue.push(element[0])
        });
  
        const smallest = Math.min(...distValue)
        console.log(smallest);
        console.log(close);
  
        for (const element of close) {
          console.log(element[0]);
          console.log(smallest);
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
    
       
