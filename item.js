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
        this.consumable = false
        this.name = ""
    };
  
    draw(x,y){
        let  item = new Image();
        item.src = this.img;
       
        if (this.active) { 
            
            ctx.drawImage(item,this.x,this.y,this.width,this.height)
        } 
        else {
            ctx.drawImage(item,x,y,this.width,this.height)
        }

        

    }
  }


export class DoubleShot extends Item{
    constructor(x,y){
        super(x,y)
        this.reload = 5
        this.shotNbr = 1
        this.img = 'assets/item/doubleShoot.png'
        this.name = "doubleShot"
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
        this.img = 'assets/item/gatling.png'
        this.name = "Gatling"
    }

    use(char){
        char.cooldown += this.reload
        char.projDmg /=5
        char.projHeight =  char.projHeight/this.projHeight
        char.shootNbr +=  this.shotNbr
        
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
        this.name = "Autoguide"
    }

    use(char){
        char.target= this.target;
        char.projectilSpeed += this.speed;
        char.range += this.range;        
        this.active = false
    }
}

export class Spectral extends Item{
    constructor(x,y){
        super(x,y)
        this.spectral = true
        this.img = 'assets/item/Spectral.png'
        this.name = "Spectral"

    }
    use(char){
        char.spectral = this.spectral     
        this.active = false
    }
}

export class healPotion extends Item{
    constructor(x,y){
        super(x,y)
        this.consumable = true
        this.height = 20
        this.width = 20
        this.img = 'assets/item/healPotion.png'
    }

    use(char){
        if (char.currentHp < char.maxHp) {
            char.currentHp++
            char.hp.currentHp++
            this.active = false
        }
    }
}

export class Piercing extends Item{
    constructor(x,y){
        super(x,y)
        this.piercing = true
        this.img = 'assets/item/Piercing.png'
        this.name = "Piercing"

    }
    use(char){
        char.piercing = this.piercing     
        this.active = false
    }
}