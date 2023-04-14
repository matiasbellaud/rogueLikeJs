let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d');

export default class Item{
    constructor(x,y){
        this.x = x
        this.y = y
        this.width = 15
        this.height = 15
        this.active = true
        this.color = "blue"

    };
  
    draw(){
        if (this.active) {
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x,this.y,this.width,this.height)
        }
        
    }
  }


export class DoubleShot extends Item{
    constructor(x,y){
        super(x,y)
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
    constructor(x,y){
        super(x,y)
        this.reload = -15
        this.projHeight = 2
        this.shotNbr = 1
    }

    use(char){
        char.cooldown += this.reload
        
        char.projHeight =  char.projHeight/this.projHeight
        char.shootNbr +=  this.shotNbr
        
        this.active = false
    }
}

export class Squary extends Item{
    constructor(x,y){
        super(x,y)
        this.reload = -5    
    }

    use(char){
        char.cooldown += this.reload
        //char.cooldown = Math.max(1, char.cooldown)
        char.projHeight =  char.projHeight/this.projHeight

        
        this.active = false
    }
}