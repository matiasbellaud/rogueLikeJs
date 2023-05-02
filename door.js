let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d');

export default class Door{
    constructor(sens,door,x,y,width,height,doorPosition){
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.door = door;
      this.sens = sens;
      this.rotate = 0;
      this.doorPosition = doorPosition
    };
  
    draw(){
      switch (this.sens) {
        case 0:
          ctx.translate(this.x, this.y);
          ctx.rotate(this.rotate);
          ctx.drawImage(this.door, 0,0,this.width,this.height);
          ctx.rotate(-this.rotate);
          ctx.translate(-this.x, -this.y);
          break;
        case 90 : 
          this.rotate = -Math.PI/2;
          ctx.translate(this.x , this.y+32);
          ctx.rotate(this.rotate);
          ctx.drawImage(this.door, 0,0,this.width,this.height);
          ctx.rotate(-this.rotate);
          ctx.translate(-this.x, -this.y-32);
          break;
        case 180 :
          this.rotate = -Math.PI;
          ctx.translate(this.x +32, this.y+32);
          ctx.rotate(this.rotate);
          ctx.drawImage(this.door, 0,0,this.width,this.height);
          ctx.rotate(-this.rotate);
          ctx.translate(-this.x-32, -this.y-32);
          break;
        case 270 : 
          this.rotate = Math.PI/2;
          ctx.translate(this.x +32, this.y);
          ctx.rotate(this.rotate);
          ctx.drawImage(this.door, 0,0,this.width,this.height);
          ctx.rotate(-this.rotate);
          ctx.translate(-this.x-32, -this.y);
          break;
      }
    }
  }