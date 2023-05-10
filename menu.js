import GamePad from "./gamePad.js";

let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d')

export default class Menu {
    constructor(){
        this.width = 200
        this.height = 50
        this.clickSpeed = 15
        this.canClick = false
        this.isPaused = false;
        this.frame = 0
        this.start = true
        this.isChangeLevel = false

        this.gp = new GamePad
    }

    startMenu(){
        this.gp.update()
        let text = "Presse Enter to play"
        this.drawText(text,"white",300, 300,"30")

        this.reload()
        if (this.canClick){
            if (keyPresses.Enter || this.gp.entre) {
                this.start = false
                this.canClick = false
            }  
        } 
    }

    deathMenu(minutes,secondes,level){
        this.gp.update()
        this.deathImage(minutes,secondes,level)
        this.reload()
        if (this.canClick){
            if (keyPresses.Enter|| this.gp.entre) {
                this.start = true
                this.canClick = false
            }  
        } 
    }

    deathImage(minutes,secondes,level){
        let death = new Image();
        death.src = 'assets/menu/youDied.png';

        ctx.drawImage(death, 0, 0, 900, 600);

        this.drawText("Presse enter to restart","red",350,500,"15")
        this.drawText(`You have survived ${minutes} : ${secondes}`,"red",340,530,"15")
        this.drawText(`Level  ${level}`,"red",420,560,"15")
    }

    changeLevelMenu(){
        this.gp.update()
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,900,600)
        let text = "You change level, be careful little one ..."
        this.drawText(text,"white",200,500,20)

        this.reload()
        if (this.canClick){
            if (keyPresses.Enter|| this.gp.entre) {
                this.isChangeLevel = false
                this.canClick = false
            }  
        } 
    }

    drawText(text, color,x,y,height){
        let font = "px monospace"
        font = height+font
        ctx.font = font;
        ctx.fillStyle = color
        ctx.fillText(text, x, y);
    }

    pauseMenu(){
        this.gp.update()
        this.reload()
        if (this.canClick){
            if (keyPresses.Escape|| this.gp.pause) {
                if (this.isPaused === false){
                    this.isPaused = true
                } else {
                    this.isPaused = false
                }
                this.canClick = false
            }

            if (this.isPaused === true){
                if (keyPresses.m || this.gp.entre) {
                    this.reset = true
                    this.canClick = false
                }
            }
        } 
    }

    drawPause(char){
        let startButton = new Image();
        startButton.src = 'assets/menu/startButton.jpg';
        let menuButton = new Image();
        menuButton.src = 'assets/menu/menuButton.jpg';

        ctx.drawImage(startButton, 150, 200, this.width, this.height);
        this.drawText("presse Echap to play","black",170,270,"15")

        ctx.drawImage(menuButton, 150, 300, this.width, this.height);
        this.drawText("Presse m to exit","black",185,370,"15")

        ctx.fillStyle = "black"
        ctx.fillRect(495,145,360,310)
        ctx.fillStyle = "grey"
        ctx.fillRect(500,150,350,300)

        this.drawText(`Pablo`,"black",650,190,"20")
        this.drawText(`- max hp : ${char.hp.maxHp}`,"black",520,220,"20")
        this.drawText(`- damage : ${char.projDmg}`,"black",520,250,"20")
        this.drawText(`- move speed : ${char.movement_speed}`,"black",520,280,"20")
        this.drawText(`- invulnerability time : ${char.invulnerability / 1000}s`,"black",520,310,"20")
        this.drawText(`- shoot cooldown : ${char.cooldown}`,"black",520,340,"20")
        this.drawText(`- shoot range : ${char.range}`,"black",520,370,"20")
    }

    winMenu(minutes,secondes){
        this.gp.update()
        this.reload()
        let winImage = new Image()
        winImage.src="assets/menu/win.jpg"
        ctx.drawImage(winImage,100, 100, 700, 500);

        this.drawText(`You win in ${minutes} : ${secondes}`,"white",340,530,"15")

        if (this.canClick){
            if (keyPresses.Enter || this.gp.entre) {
                console.log("test")
                this.reset = true
                this.canClick = false
            }  
        } 
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
