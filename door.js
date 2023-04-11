import Character from './character.js';

let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d');

export default class Door{
    constructor(x,y,width,height){
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    };
  
    draw(){
      ctx.translate(this.x, this.y);
      ctx.fillStyle = "black"
      ctx.fillRect(0,0,this.width,this.height);
      ctx.translate(-this.x, -this.y);
    }
  }