let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d');

export default class Hp {
    constructor(maxHp,currentHp){
      this.currentHp = currentHp
      this.maxHp = maxHp
    }
  
    takeDamage(){
      if (this.currentHp > 0){
        this.currentHp--
      } 
    }
  
    draw(){
      let fullHeartImage = new Image(100, 200);
      fullHeartImage.src = './assets/fullHeart.png';
      let emptyHeartImage = new Image(100, 200);
      emptyHeartImage.src = './assets/emptyHeart.png';
      for (let i=1;i<=this.maxHp;i++){ 
        if (i<=this.currentHp){
          ctx.drawImage(fullHeartImage, (16+8)*i-8,16,16,16);
        } else {
          ctx.drawImage(emptyHeartImage, (16+8)*i-8,16,16,16);
        }
      }
    }
  }