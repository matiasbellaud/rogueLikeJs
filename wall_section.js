let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d');

export default class WallSection{
    constructor(listWall){
        this.x = listWall[0].x
        this.y = listWall[0].y
        this.listWall = listWall
        this.wallNbr = listWall.length
        this.width = listWall[0].width* this.wallNbr
    }

    draw(){
        console.log("hi");
        ctx.fillRect(0,0,50,50)
        this.hitbox()
    };
    hitbox(){
        ctx.fillStyle = "purple";
        ctx.fillRect(this.x-5,this.y,this.width*1.5,1)
        ctx.fillRect(this.x-5,this.y+this.height,this.width*1.5,1)
        ctx.fillStyle = "red";
        ctx.fillRect(this.x,this.y-5,1,this.height*1.5)
        ctx.fillRect(this.x+this.width,this.y-5,1,this.height*1.5)
      }
  }