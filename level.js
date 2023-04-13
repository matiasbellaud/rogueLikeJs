import {NormalMap, LMap, ItemMap,BossMap} from './map.js'

export default class Level{
    constructor(){
        this.paterne = 
        [[[0,0,0,0,0,0],[1,0,0,1,0,2]  ,[0,0,0,0,0,0]],
         [[2,0,0,1,1,0],["B",1,1,1,1,0],["I",0,1,0,0,1]],
         [[1,1,0,1,0,0],[1,1,0,0,0,1]  ,[0,0,0,0,0,0]],
         [[1,1,0,0,0,0],[1,1,0,0,0,1]  ,[0,0,0,0,0,0]]];

        this.listMap = []
        this.now 
        this.actualPosition = [1,1]
    };

    addMap(){
        let tempList = []
        for (let i = 0; i<this.paterne.length;i++){
            for (let j=0;j<this.paterne[i].length;j++){
                if (this.paterne[i][j][0]===1){
                    let door = this.paterne[i][j];
                    tempList.push(new NormalMap(door[1],door[2],door[3],door[4],this.paterne[i][j][5]));
                } else if (this.paterne[i][j][0]===2){
                    let door = this.paterne[i][j];
                    tempList.push(new LMap(door[1],door[2],door[3],door[4],this.paterne[i][j][5]));
                } else if (this.paterne[i][j][0]==="I"){
                    let door = this.paterne[i][j];
                    tempList.push(new ItemMap(door[1],door[2],door[3],door[4],this.paterne[i][j][5]));
                } else if (this.paterne[i][j][0]==="B"){
                    let door = this.paterne[i][j];
                    tempList.push(new BossMap(door[1],door[2],door[3],door[4],this.paterne[i][j][5]));
                } else {
                    tempList.push(0);  
                }
            }
            this.listMap.push(tempList)
            tempList = []
        }
        this.now = this.listMap[this.actualPosition[0]][this.actualPosition[1]]
    }

    createMap(){
        this.now = this.listMap[this.actualPosition[0]][this.actualPosition[1]]
        this.now.createMap()
    }

    deleteMap(){
        this.now.deleteMap()
    }

    changeRoom(position){
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
  }