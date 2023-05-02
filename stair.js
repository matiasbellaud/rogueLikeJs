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
        ctx.drawImage(this.stair,this.x,this.y,this.width,this.height); 
    }
  }