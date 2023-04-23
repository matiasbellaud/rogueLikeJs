import {NormalMap, LMap, ItemMap,BossMap} from './map.js'

export default class Level{
    constructor(){
        this.paterne1 = 
        [[[0,0,0,0,0,0,0,0],[1,0,0,1,0,2,1,1]  ,[0,0,0,0,0,0,0,0]],
        [[2,0,0,1,1,0,0,1],["B",1,1,1,1,0,3,1],["I",0,1,0,0,1,2,0]],
        [[1,1,0,1,0,0,5,0],[1,1,0,0,0,1,0,0]  ,[0,0,0,0,0,0,0,0]],
        [[1,1,0,0,0,0,0,0],[1,1,0,0,0,1,0,0]  ,[0,0,0,0,0,0,0,0]]];

        this.paterne2 = 
        [[[2,0,0,0,1,0,0,0],[1,0,1,1,0,2,1,1]  ,[0,0,0,0,0,0,0,0]],
        [[0,0,0,0,0,0,0,0],[1,1,1,1,1,0,3,1],["B",0,1,0,0,1,2,1]],
        [[1,0,0,1,1,0,5,0],[1,1,0,0,1,1,0,0]  ,[0,0,0,0,0,0,0,0]],
        [[1,1,0,0,0,0,0,0],[1,1,0,0,0,1,0,0]  ,[0,0,0,0,0,0,0,0]]];

        this.nowPaterne = this.paterne1
        
        this.listMap = []
        this.now 
        this.actualPosition = [1,1]
    };

    addMap(){
        this.listMap=[]
        let tempList = []
        for (let i = 0; i<this.nowPaterne.length;i++){
            for (let j=0;j<this.nowPaterne[i].length;j++){
                if (this.nowPaterne[i][j][0]===1){
                    let door = this.nowPaterne[i][j];
                    tempList.push(new NormalMap(door[1],door[2],door[3],door[4],this.nowPaterne[i][j][5],this.nowPaterne[i][j][6],this.nowPaterne[i][j][7]));
                } else if (this.nowPaterne[i][j][0]===2){
                    let door = this.nowPaterne[i][j];
                    tempList.push(new LMap(door[1],door[2],door[3],door[4],this.nowPaterne[i][j][5],this.nowPaterne[i][j][6],this.nowPaterne[i][j][7]));
                } else if (this.nowPaterne[i][j][0]==="I"){
                    let door = this.nowPaterne[i][j];
                    tempList.push(new ItemMap(door[1],door[2],door[3],door[4],this.nowPaterne[i][j][5],this.nowPaterne[i][j][6],this.nowPaterne[i][j][7]));
                } else if (this.nowPaterne[i][j][0]==="B"){
                    let door = this.nowPaterne[i][j];
                    tempList.push(new BossMap(door[1],door[2],door[3],door[4],this.nowPaterne[i][j][5],this.nowPaterne[i][j][6],this.nowPaterne[i][j][7]));
                } else {
                    tempList.push(0);  
                }
            }
            this.listMap.push(tempList)
            tempList = []
        }

        for (let i = 0; i<this.listMap.length;i++){
            let listMapLength = this.listMap[i].length
            for (let j = 0; j<listMapLength;j++){
                if (this.listMap[i][j] !== 0)
                this.listMap[i][j].createMap()
            }
        }
        this.now = this.listMap[this.actualPosition[0]][this.actualPosition[1]]
    }

    createMap(){
        this.now = this.listMap[this.actualPosition[0]][this.actualPosition[1]]
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
          this.createMap()
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
          char.changeMap = false
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
            });
            if (allEnnemyDead === this.now.ennemyList.length){
                this.now.allEnnemyDead = true;
            };
        }
    }

    changeLevel(char){
        if (char.changeLevel){
            this.nowPaterne = this.paterne2;
            this.addMap()
            char.changeLevel = false
        } 
    }

    drawStair(){
        if (this.now instanceof BossMap && this.now.allEnnemyDead){
            this.now.drawStair();
        }
    }
  }