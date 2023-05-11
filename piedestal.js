import { Autoguide, Blitz, DoubleShot, Gatling, Piercing, Lazer, Spectral, UpHpElixir, Divide, Cross, Wings } from "./item.js";

let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d'); 
export default class Piedestal {
    constructor(x,y){
        this.x = x
        this.y = y
        this.width = 30
        this.height = 30
        
    }
    draw(){
        let pillar = new Image();
        pillar.src = "assets/room/item_pillar.png"
        ctx.drawImage(pillar,this.x,this.y,this.width*1.5,this.height*1.5)
    }

    itemChoice(itemList){
        let x = this.x+this.width/4 //spawn the item hover the piedestal
        let y = this.y-this.height
        const index = this.randomIntFromInterval(0,itemList.length-1)//take a random item from the list
        

        let item
        switch (itemList[index]) {
            case "Gatling":
                item = new Gatling(x,y)
                break;
            case "doubleShot":
                item = new DoubleShot(x,y)
                break;
            case "Spectral":
                item = new Spectral(x,y)
                break;
            case "Autoguide":
                item = new Autoguide(x,y)
                break;
            case "Piercing":
                item = new Piercing(x,y)
                break;
            case "upHpElixir":
                item = new UpHpElixir(x,y)
                break;
            case "blitz":
                item = new Blitz(x,y)
                break;
            case "lazer":
                item = new Lazer(x,y)
                break
            case "divide":
                item = new Divide(x,y)
                break
            case "cross":
                item = new Cross(x,y)
                break

            case "wings":
                item = new Wings(x,y)
                break
            default:
                console.log("error item selection,implement divide item");
                item = new Divide(x,y)
                break;
        }

        itemList.splice(index,1)
        console.log(itemList);
        return item
    }

    randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
}