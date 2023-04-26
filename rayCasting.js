import Wall  from "./wall.js";
import Character  from "./character.js";

let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d'); 

export default class rayCasting{

    constructor(direction,target,source,allElement){
        this.direction=direction
        

        this.movement = 100

        this.target=target
        
        this.source = source
        this.allElement = allElement

        this.rayColor = "yellow"
    }

    draw(){

        
        ctx.beginPath()
        ctx.strokeStyle = this.rayColor
        ctx.moveTo(this.source.x,this.source.y)
        if (this.direction >= 0 && this.direction <= 90) {
          ctx.lineTo(this.source.x+(90-this.direction),this.source.y-90+(90-this.direction))
        }else if(this.direction >90 && this.direction <= 180) {
          ctx.lineTo(this.source.x-180+(180-this.direction)+90,this.source.y-(180-this.direction))
        }
        else if(this.direction >180 && this.direction <= 270) {
          ctx.lineTo(this.source.x-(270-this.direction),this.source.y+270-(270-this.direction)-180)
        }else{
          ctx.lineTo(this.source.x+360-(360-this.direction)-270,this.source.y+(360-this.direction))
         }

        
        ctx.stroke()
      
      
        
        
        
      

        // ctx.beginPath()
        // ctx.strokeStyle = this.rayColor
        // ctx.moveTo(this.x+this.source.height/2,this.y+this.source.height/2)
        // ctx.lineTo(this.target.x+this.target.width/2,this.target.y+this.target.height/2)
        // ctx.stroke()

    }

    distance(x,y,target){
      const res = Math.sqrt((target.x-x)**2+(target.y-y)**2)
      return res
    }

    move(){
        // this.x= this.source.x
        // this.y= this.source.y
    }

    simulation(){

      let distance = this.distance(this.x,this.y,this.allElement[0])


      
        

        
            
      for (let i = 0; i < this.movement; i++) {
        if (this.x != this.target.x || this.y != this.target.y) {

          if (this.distance(this.x,this.y+0.5,this.allElement[0])<=this.distance(this.x,this.y-0.5,this.allElement[0])){
            this.y++
          }else{
            this.y--
          }
          
  
          if (this.distance(this.x+0.5,this.y,this.allElement[0])<=this.distance(this.x-0.5,this.y,this.allElement[0])){
            this.x++
          }else{
            this.x--
          }
            this.allElement.forEach(element => {
                if (this.collisionDetection(element)[0]) {
                  if (element instanceof Wall) {
                    console.log("mur");
                    
                    this.x= this.source.x
                    this.y= this.source.y
                    return false
                  }
                }
            });
          }else if (this.x == this.target.x && this.y == this.target.y){
             
            this.x= this.source.x
            this.y= this.source.y
            return true
          }
        
      }
    }

    collisionDetection(element){
        const xAxis = (this.x > element.x+1 && this.x < element.x+element.width-1)
        const yAxis = this.y> element.y+1 && this.y < element.y+element.height-1
    
        const upBox = (this.y>= element.y && this.y <= element.y+1)
        const downBox = (this.y <= element.y+element.height && this.y >= element.y+element.height-1)
    
        const leftBox = (this.x >= element.x && this.x <= element.x+1)
        const rightBox = (this.x <= element.x+element.width && this.x >= element.x+element.width-1)
        if (xAxis && yAxis) {
          if (rightBox) {
            console.log("hi");
          }
          
        }
    
        if (xAxis){
    
          if (upBox) {
            //element.isColliding = true
            return [true,'up']
    
          }else {this.sMove = true}
    
          if (downBox) {
    
            //element.isColliding = true
            return [true,"down"]
    
          }else{this.zMove = true}
    
        }else{this.sMove = true;this.zMove = true}
        if (yAxis) {
          
          if (leftBox) {
    
            //element.isColliding = true
            return [true, "left"]
          }else { this.dMove = true}
    
          if (rightBox) {
    
            //element.isColliding = true
            return [true,"right"]
          }else{ this.qMove = true}
    
        }
        //element.isColliding = false
        return [false,"none"]  
      }

}