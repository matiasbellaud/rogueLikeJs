let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d');

export default class Stair{
    constructor(stair,x,y,width,height){
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.stair = stair
    };
  
    draw(){
        ctx.translate(this.x +32, this.y+32);
        ctx.drawImage(this.stair,0,0,this.width,this.height);
        ctx.translate(-this.x-32, -this.y-32);   
    }
  }