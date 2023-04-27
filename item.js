let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d');

export default class Item{
    constructor(x,y){
        this.x = x
        this.y = y
        this.width = 30
        this.height = 30
        this.active = true
        this.img = 'assets/item/Autoguide.png'

    };
  
    draw(){
        if (this.active) {
            let  item = new Image();
            item.src = this.img;
            ctx.drawImage(item,this.x,this.y,this.width,this.height)
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

export class Autoguide extends Item{
    constructor(x,y){
        super(x,y)
        this.target = true
        this.range = 30
        this.speed = -3
        this.img = 'assets/item/Autoguide.png'
    }

    use(char){

        char.target= this.target;
        char.projectilSpeed += this.speed;
        char.range += this.range;        
        this.active = false
    }
}

export class Spectral extends Item{
    constructor(){
        super()
        this.spectral = true

    }

    use(char){

        char.spectral = this.spectral     
        this.active = false
    }
}