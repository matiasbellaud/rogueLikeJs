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
    };
  
    draw(x,y){
        let  item = new Image();
        item.src = this.img;
        let pillar = new Image();
        pillar.src = "assets/room/item_pillar.png"
        if (this.active) { 
            ctx.drawImage(pillar,this.x-7,this.y+30,this.width*1.5,this.height*1.5)
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
        this.name = "doubleShot"
        this.img = 'assets/item/doubleShoot.png'
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
        this.name = "gatling"
        this.img = 'assets/item/gatling.png'
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
        this.name = "autoGuide"
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
    constructor(x,y){
        super(x,y)
        this.spectral = true
        this.name = "spectral"
        this.img = 'assets/item/Spectral.png'

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
        this.name = "healPotion"
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
        this.name = "piercing"
        this.img = 'assets/item/Piercing.png'
    }
    use(char){
        char.piercing = this.piercing     
        this.active = false
    }
}