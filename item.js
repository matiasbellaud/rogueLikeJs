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
        this.name = "doubleShot"
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
        this.reload = -12
        this.projHeight = 2
        this.shotNbr = 1
        this.name = "gatling"
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
        this.name = "autoGuide"
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
        this.name = "spectral"
        this.img = 'assets/item/Spectral.png'
        this.name = "Spectral"

    }
    use(char){
        char.spectral = this.spectral     
        this.active = false
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

export class UpHpElixir extends Item{
    constructor(x,y){
        super(x,y)
        this.name = "upHpElixir"
        this.img = 'assets/item/healPotion.png'

    }
    use(char){

        char.maxHp++
        char.hp.maxHp++
        this.active = false
    }
}

export class UpDamageElixir extends Item{
    constructor(x,y){
        super(x,y)
        this.consumable = true
        this.name = "upDamageElixir"
        this.img = 'assets/item/upDamageElixir.png'
    }
    use(char){
        char.projDmg += 2
        this.active = false
    }
}

export class UpSpeedShootElixir extends Item{
    constructor(x,y){
        super(x,y)
        this.consumable = true
        this.name = "upSpeedShootElixir"
        this.img = 'assets/item/upSpeedShootElixir.png'
    }
    use(char){
        char.cooldown -= 2
        this.active = false
    }
}

export class UpSpeedMoveElixir extends Item{
    constructor(x,y){
        super(x,y)
        this.consumable = true
        this.name = "upSpeedMoveElixir"
        this.img = 'assets/item/upSpeedMoveElixir.png'
    }
    use(char){
        char.movement_speed += 0.5
        this.active = false
    }
}

export class Blitz extends Item{
    constructor(x,y){
        super(x,y)
        this.name = "blitz"
        this.img = 'assets/item/blitz.png'
    }
    
    use(char){
        char.blitz = true
        this.active = false
    }
}

export class Lazer extends Item{
    constructor(x,y){
        super(x,y)
        this.name = "lazer"
        this.img = 'assets/item/lazer.png'
    }
    
    use(char){
        char.ray = true
        this.active = false
    }
}

export class Divide extends Item{
    constructor(x,y){
        super(x,y)
        this.divide = true
        this.name = "divide"
        this.img = 'assets/item/divide.png'
    }
    
    use(char){
        char.divide = true
        this.active = false
    }
}

export class Cross extends Item{
    constructor(x,y){
        super(x,y)
        this.cross = true
        this.name = "cross"
        this.img = 'assets/item/divide.png'
    }
    
    use(char){
        char.cross = true
        char.projDmg /=1.5
        char.range /=1.5
        this.active = false
    }
}

export class Wings extends Item{
    constructor(x,y){
        super(x,y)

        this.name = "wings"
        this.img = 'assets/item/wing.png'
    }
    
    use(char){
        char.fly = true
        char.movement_speed *= 1.1
        this.active = false
    }
}