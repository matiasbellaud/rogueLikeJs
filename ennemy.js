let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d'); 

export default class Ennemy{
    constructor(){
    this.x = 10;
    this.y = 175;
    this.width = 5;
    this.height = 5;
    this.movement_speed = 5;
    };
  
    draw(){
      ctx.beginPath();
      ctx.ellipse(this.x+5, this.y+5, this.width,this.height, Math.PI / 4, 0, 2 * Math.PI);
      ctx.strokeStyle = "#0a7b20";
      ctx.fillStyle = "#0a7b20";
      ctx.fill();
      ctx.stroke();
    };
  
    move(){
      this.x+= this.movement_speed;
    };
  
    collision(){
      if (this.x+this.width >= canvas.width) {
      
      };
    };
  
    look(xLook,yLook){
      ctx.beginPath();
      ctx.lineTo(char.x+5,char.y+5);
      ctx.lineTo(char.x+xLook+5,char.y+yLook+5);
      ctx.stroke();
      ctx.closePath();
    };
  };