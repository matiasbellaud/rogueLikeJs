let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d')

export default class menu {
    constructor(){
        this.x=350
        this.y=200
        this.width = 200
        this.height = 50
        this.clickSpeed = 15
        this.canClick = false
        this.isPaused = false;
        this.frame = 0
        this.start = true
    }

    isStart(){
        this.drawMenu()
        this.reload()
        if (this.canClick){
            if (keyPresses.Enter) {
                this.start = false
                this.canClick = false
            }  
        } 
    }

    isPause(){
        this.reload()
        if (this.canClick){
            if (keyPresses.Escape) {
                if (this.isPaused === false){
                    this.isPaused = true
                } else {
                    this.isPaused = false
                }
                this.canClick = false
            }

            if (this.isPaused === true){
                if (keyPresses.m) {
                    this.reset = true
                    this.start = true
                    this.canClick = false
                }
            }
        } 
    }

    isDeath(){
        this.drawDeath()
        this.reload()
        if (this.canClick){
            if (keyPresses.Enter) {
                this.start = true
                this.canClick = false
            }  
        } 
    }

    buttonStart(start,text,color,height,x,y){
        if (!start){
            let startButton = new Image();
            startButton.src = 'assets/menu/startButton.jpg';
            ctx.drawImage(startButton, this.x, this.y, this.width, this.height);
        }
        
        this.drawText(text,color,x,y,height)
    }

    buttonMenu(){
        let menuButton = new Image();
        menuButton.src = 'assets/menu/menuButton.jpg';

        ctx.drawImage(menuButton, this.x, this.y +100, this.width, this.height);

        this.drawText("Presse m to exit","black",this.x+35,this.y +100+70,"15")
    }

    deathImage(){
        let death = new Image();
        death.src = 'assets/menu/youDied.png';

        ctx.drawImage(death, 0, 0, 900, 600);

        this.drawText("Presse enter to restart","red",this.x,500,"15")
    }

    drawText(text, color,x,y,height){
        let font = "px monospace"
        font = height+font
        ctx.font = font;
        ctx.fillStyle = color
        ctx.fillText(text, x, y);
    }

    drawMenu(){
        let text = "Presse Enter to play"
        this.buttonStart(true,text,"white","30",this.x-50, this.y+100)
    }

    drawPause(){
        let text = "presse Echap to play"
        this.buttonStart(false,text,"black","15",this.x+20,this.y+70)
        this.buttonMenu()
    }

    drawDeath(){
        this.deathImage()
    }

    reload(){
        if (this.canClick === false){
          this.frame++;
        };
        
        if (this.frame === this.clickSpeed){
          this.canClick = true;
          this.frame = 0;
        };
      }

    
}

let keyPresses = [];
window.addEventListener('keydown', keyDownListener);
function keyDownListener(event) {
    keyPresses[event.key] = true;
};

window.addEventListener('keyup', keyUpListener);
function keyUpListener(event) {
    keyPresses[event.key] = false;
};
