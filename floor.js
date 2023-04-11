let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d');

export default class Floor{
    constructor(floor,x,y,width,height){
      this.floor  = floor;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    };
  
    draw(){
      ctx.translate(this.x +32, this.y+32);
      ctx.drawImage(this.floor,0,0,this.width,this.height);
      ctx.translate(-this.x-32, -this.y-32);
      
    }
  }