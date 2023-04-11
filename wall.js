let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d');

export default class Wall{
    constructor(sens,wall,x,y,width,height){
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.wall = wall;
      this.sens = sens;
      this.rotate = 0;
      this.isColliding = false;
      this.change = false;
    };
  
    draw(){
      switch (this.sens) {
        case 90 : 
          this.rotate = -Math.PI/2;
          break;
        case 180 :
          this.rotate = -Math.PI;
          this.change = true;
          break;
        case 270 : 
        this.rotate = Math.PI/2;
          this.change = true;
          break;
      }
      if (this.change === true){
        ctx.translate(this.x +32, this.y+32);
        ctx.rotate(this.rotate);
        ctx.drawImage(this.wall, 0,0,this.width,this.height);
        ctx.rotate(-this.rotate);
        ctx.translate(-this.x-32, -this.y-32);
      }else{
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotate);
        ctx.drawImage(this.wall, 0,0,this.width,this.height);
        ctx.rotate(-this.rotate);
        ctx.translate(-this.x, -this.y);
      }
    }
  }
  