export default class GamePad{
    constructor(){
        this.connected = false
        this.x = 0
        this.y = 0
        this.A = false
        this.B = false
        this.X = false
        this.Y = false 
        this.pause = false
    }

    update(){
        
        let gamepad = navigator.getGamepads();
        let gp = gamepad[0];


        if (gp !== null) {
            this.connected = true
            this.x = gp.axes[0];
            this.y = gp.axes[1];

            this.setDeadzone();
            this.A = gp.buttons[1].pressed;
            this.B = gp.buttons[0].pressed;
            this.X = gp.buttons[4].pressed;
            this.Y = gp.buttons[3].pressed;
            this.pause = gp.buttons[10].touched;
            this.entre = gp.buttons[11].touched;
            
            
        }

        
    }

    setDeadzone(deadzone=0.01) {
        if (this.x<deadzone && this.x> -deadzone) {
            this.x = 0
        }
      
        if (this.y<deadzone&& this.y> -deadzone) {
            this.y = 0
        }
    }
}