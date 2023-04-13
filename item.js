let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d');

export default class Item{
    constructor(){
        this.x = 400
        this.y = 200
        this.width = 15
        this.height = 15
        this.active = true
    };
  
    draw(){
        if (this.active) {
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x,this.y,this.width,this.height)
        }
        
    }
  }


export class DoubleShot extends Item{
    constructor(){
        super()
        this.reload = 5
        this.shotNbr = 1
        
    }

    use(char){
        char.cooldown += this.reload
        char.shootNbr +=  this.shotNbr
        
        this.active = false
    }
}

export class Gatling extends Item{
    constructor(){
        super()
        this.reload = -15
        this.projHeight = 2
        this.shotNbr = 1
        
    }

    use(char){
        char.cooldown += this.reload
        //char.cooldown = Math.max(1, char.cooldown)
        char.projHeight =  char.projHeight/this.projHeight
        char.shootNbr +=  this.shotNbr
        
        this.active = false
    }
}