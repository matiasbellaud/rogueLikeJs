import {NormalMap, LMap, ItemMap,BossMap} from './map.js'
import Menu from './menu.js'

let canvas = document.querySelector('#char');
let ctx = canvas.getContext('2d')

export default class Level{
    constructor(){
        this.levelPlayer = 1;
        this.nbrPaterne = 7;
        this.numPaterne = 1;
        this.paterne1 = 
        [[[0,0,0,0,0,0,0,0],[1,0,0,1,0,2,1,0]  ,[0,0,0,0,0,0,0,0]],
        [[2,0,0,1,1,0,0,0],[1,1,1,1,1,0,0,0],["I",0,1,0,0,1,0,1]],
        [[1,1,0,1,0,0,2,0],[1,1,0,0,0,1,1,0]  ,[0,0,0,0,0,0,0,0]],
        [["B",1,0,0,0,1,1,0],[1,1,0,0,0,1,1,0]  ,[0,0,0,0,0,0,0,0]]];

        this.paterne2 = 
        [[[2,0,0,0,1,0,0,0],[1,0,1,1,0,2,1,0]  ,[0,0,0,0,0,0,0,0]],
        [[0,0,0,0,0,0,0,0],[1,1,0,1,1,0,0,0],["B",0,1,0,0,1,1,0]],
        [[1,0,0,1,1,0,5,0],[1,1,1,1,0,1,0,0]  ,[0,0,0,0,0,0,0,0]],
        [[1,1,0,0,1,0,0,0],["I",1,1,0,0,0,0,1]  ,[0,0,0,0,0,0,0,0]]];

        this.paterne3 = 
        [[["I",0,0,0,1,0,0,1],[1,0,1,1,0,2,1,0]  ,[0,0,0,0,0,0,0,0]],
        [[0,0,0,0,0,0,0,0],[1,1,0,1,0,0,0,0],["B",0,0,1,0,1,1,0]],
        [[1,0,0,0,1,0,3,0],[1,1,1,1,0,1,1,0]  ,[1,1,0,1,0,2,1,0]],
        [["I",0,0,0,1,0,0,1],[1,1,1,0,1,1,1,0]  ,[2,1,1,0,0,0,0,0]]];

        this.paterne4 = 
        [[["I",0,0,0,1,0,0,1],[1,0,1,1,0,2,1,0]  ,[0,0,0,0,0,0,0,0]],
        [[0,0,0,0,0,0,0,0],[1,1,0,1,0,0,0,0],[1,0,0,1,0,1,2,0]],
        [[1,0,0,0,1,0,5,0],[1,1,1,0,1,1,2,0]  ,[1,1,1,1,0,2,0,0]],
        [["I",0,0,0,1,0,0,1],["B",0,1,0,1,1,1,0]  ,[1,1,1,0,0,1,3,0]]];

        this.paterne5 = 
        [[["B",0,0,0,1,0,1,0],[1,0,1,1,1,2,3,0]  ,[2,0,1,0,0,0,0,0]],
        [[1,0,0,1,1,1,2,0],[1,1,1,1,0,0,0,0],[0,0,0,0,0,0,0,0]],
        [[1,1,0,0,1,0,5,0],[1,1,1,1,0,1,1,0]  ,["I",0,0,1,0,2,0,1]],
        [[2,0,0,0,1,0,0,0],[1,1,1,0,1,1,3,0]  ,[2,1,1,0,0,0,0,0]]];

        this.paterne6 = 
        [[[0,0,0,0,0,0,0,0],["I",0,0,0,1,0,0,1]  ,[2,0,1,1,0,0,0,0]],
        [[1,0,0,1,1,1,2,0],[1,0,1,1,1,0,0,0],[1,1,1,1,0,0,2,0]],
        [[1,1,0,0,1,0,5,0],[1,1,1,1,0,1,1,0]  ,[2,1,0,1,0,0,0,0]],
        [[2,0,0,0,1,0,0,0],[1,1,1,0,0,1,3,0]  ,["B",1,0,0,0,0,1,0]]];

        this.paterne7 = 
        [[["B",0,0,1,0,0,1,0],[0,0,0,0,0,0,0,0]  ,[0,0,0,0,0,0,0,0]],
        [[1,1,0,1,0,0,2,0],[1,0,0,1,0,0,0,0],[1,0,0,1,0,1,1,0]],
        [[1,1,0,0,1,0,3,0],[1,1,1,1,0,1,1,0]  ,[1,1,0,1,0,2,1,0]],
        [["I",0,0,0,1,0,0,1],[1,1,1,0,1,1,1,0]  ,[2,1,1,0,0,0,0,0]]];

        this.nowPaterne = this.paterne1
        
        this.listMap = []
        this.now 
        this.actualPosition = [1,1]
        this.listItemLevel = []
        this.listItem = ["blitz","doubleShot","Gatling","Spectral","Autoguide","Piercing","upHpElixir"]
    };

    addMap(char){
        
        this.listMap=[]
        let tempList = []
        for (let i = 0; i<this.nowPaterne.length;i++){
            for (let j=0;j<this.nowPaterne[i].length;j++){
                if (this.nowPaterne[i][j][0]===1){
                    let door = this.nowPaterne[i][j];
                    tempList.push(new NormalMap(door[1],door[2],door[3],door[4],this.nowPaterne[i][j][5],this.nowPaterne[i][j][6],this.nowPaterne[i][j][7],this.listItem));
                } else if (this.nowPaterne[i][j][0]===2){
                    let door = this.nowPaterne[i][j];
                    tempList.push(new LMap(door[1],door[2],door[3],door[4],this.nowPaterne[i][j][5],this.nowPaterne[i][j][6],this.nowPaterne[i][j][7],this.listItem));
                } else if (this.nowPaterne[i][j][0]==="I"){
                    let door = this.nowPaterne[i][j];
                    tempList.push(new ItemMap(door[1],door[2],door[3],door[4],this.nowPaterne[i][j][5],this.nowPaterne[i][j][6],this.nowPaterne[i][j][7],this.listItem));
                } else if (this.nowPaterne[i][j][0]==="B"){
                    let door = this.nowPaterne[i][j];
                    tempList.push(new BossMap(door[1],door[2],door[3],door[4],this.nowPaterne[i][j][5],this.nowPaterne[i][j][6],this.nowPaterne[i][j][7],this.listItem));
                } else {
                    tempList.push(0);  
                }
            }
            
            this.listMap.push(tempList)
            tempList = []
        }

        for (let i = 0; i<this.listMap.length;i++){
            let listMapLengthI = this.listMap[i].length
            for (let j = 0; j<listMapLengthI;j++){
                if (this.listMap[i][j] !== 0)
                
                this.listMap[i][j].createMap(char,this.levelPlayer)
                if (this.listMap[i][j] != 0){
                    if(this.listMap[i][j].itemMap[0] != 0){
                        this.listItemLevel.push(this.listMap[i][j].itemMap[0])
                    }
                }
                
            }
        }
        this.now = this.listMap[this.actualPosition[0]][this.actualPosition[1]]
        this.now.listMapElement.splice(0, 0, char);
    }

    positionOnChangeMap(position){
        if(position === "top"){
            this.actualPosition[0] -= 1
        } else if(position === "bottom"){
            this.actualPosition[0] +=1
        } else if(position === "right"){
            this.actualPosition[1] +=1
        } else if(position === "left"){
            this.actualPosition[1] -=1
        }
    }

    changeMap(char){
        if (char.changeMap === true && this.now.allEnnemyDead === true){
          this.positionOnChangeMap(char.doorPosition)
          this.now = this.listMap[this.actualPosition[0]][this.actualPosition[1]]
          if (char.doorPosition === "top"){
            char.teleportation(this.now.positionDoorBottom[0],this.now.positionDoorBottom[1]-32);
          }
          if (char.doorPosition === "left"){
            char.teleportation(this.now.positionDoorRight[0]-32,this.now.positionDoorRight[1]);
          }
          if (char.doorPosition === "bottom"){
            char.teleportation(this.now.positionDoorTop[0],this.now.positionDoorTop[1]+64);
          }
          if (char.doorPosition === "right"){
            char.teleportation(this.now.positionDoorLeft[0]+64,this.now.positionDoorLeft[1]);
          }
          this.now = this.listMap[this.actualPosition[0]][this.actualPosition[1]]
          char.changeMap = false
          char.listProj = []
        }

      }

    ennemyAction(){
        if (!this.now.allEnnemyDead){
            let allEnnemyDead = 0;
            this.now.ennemyList.forEach(element => {
                if (!element.alive){
                allEnnemyDead++
                }
                element.move(this.now.listMapElement)
                element.shoot(this.now.listMapElement,this.now.ennemyList)
            });
            if (allEnnemyDead === this.now.ennemyList.length){
                this.now.allEnnemyDead = true;
                this.now.createMapOpenDoor();
            };
        }
    }

    changeLevel(char,menu){
        if (char.changeLevel){
            let numPaterneTemp =  Math.floor(Math.random() * (this.nbrPaterne)+1);
            if (this.numPaterne === numPaterneTemp){
                return this.changeLevel(char,menu)
            }
            this.numPaterne = numPaterneTemp
            switch (this.numPaterne) {
                case 1 : 
                    this.nowPaterne = this.paterne1;
                    break;
                case 2 : 
                    this.nowPaterne = this.paterne2;
                    break;
                case 3 : 
                    this.nowPaterne = this.paterne3;
                    break;
                case 4 : 
                    this.nowPaterne = this.paterne4;
                    break;
                case 5 : 
                    this.nowPaterne = this.paterne5;
                    break;
                case 6 : 
                    this.nowPaterne = this.paterne6;
                    break;
                case 7 : 
                    this.nowPaterne = this.paterne7;
                    break;
            }
            this.levelPlayer++
            this.actualPosition = [1,1]
            this.addMap(char)
            char.changeLevel = false
            menu.isChangeLevel = true
        } 
    }

    drawStair(){
        if (this.now instanceof BossMap && this.now.allEnnemyDead){
            this.now.drawStair();
        }
    }

    drawPlayerLevel(){
        let text = "Level " + this.levelPlayer;
        let color ="white"
        ctx.font = "20px monospace";
        ctx.fillStyle = color
        ctx.fillText(text, 32, 570);
    }
  }