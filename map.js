import Floor from './floor.js';
import Wall from './wall.js';
import Door from './door.js';
import Ennemy from './ennemy.js';
import { DoubleShot, Gatling } from './item.js';
import Stair from './stair.js'

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

class LMap{
    constructor(doorTop,doorLeft,doorBottom,doorRight,nbrEnnemy,isItem){
      this.listMapElement = [];
      this.listMapFloor = [];

      this.cutCornerX = 13;
      this.cutCornerY = 7;

      this.mapTopY= 64;
      this.mapBottomY= 512;
      this.mapLeftX = 64;
      this.mapRightX = 832;

      this.horizontalWallLenght = 23;
      this.verticalWallLenght = 14;

      this.doorTop =doorTop;
      this.doorLeft =doorLeft;
      this.doorBottom =doorBottom;
      this.doorRight =doorRight;

      this.positionDoorTop = [];
      this.positionDoorLeft = [];
      this.positionDoorBottom = [];
      this.positionDoorRight = [];

      this.ennemyList = []
      this.nbrEnnemy = nbrEnnemy;

      this.isItem = isItem
    };
  
    createMapFloor(){ 
      let  floor = new Image(100, 200);
      floor.src = 'assets/room/floor.jpg';
  
      //floor
      for (let i=0;i<this.cutCornerY;i++){
        for (let j=13;j<this.horizontalWallLenght-1;j++){
          this.listMapFloor.push( new Floor(floor,(32*j)+this.mapLeftX,(32*i)+this.mapTopY,32,32));
        }
      };
      for (let i=this.cutCornerY;i<this.verticalWallLenght-2;i++){
        for (let j=0;j<this.horizontalWallLenght-1;j++){
          this.listMapElement.push( new Floor(floor,(32*j)+this.mapLeftX,(32*i)+this.mapTopY,32,32));
        }
      };
    };
  
    createMapWalls(){ 
      let  wall = new Image(100, 200);
      wall.src = 'assets/room/wall.jpg';
  
      let angleWall = new Image(100, 200);
      angleWall.src = 'assets/room/angleWall.jpg';
  
      //wall top
      for (let i=1;i<this.horizontalWallLenght;i++){
        let  top  = this.mapTopY;
        if (i<this.cutCornerX){
          top = this.mapTopY+(32*this.cutCornerY);
        }
        this.listMapElement.push( new Wall(0,wall,(32*i)+this.mapLeftX,top,32,32));
      };
  
      //wall left
      for (let i=1;i<this.verticalWallLenght;i++){
        let left  = this.mapLeftX;
        if (i<this.cutCornerY+1){
          left = this.mapLeftX+(32*this.cutCornerX);
        }
        this.listMapElement.push( new Wall(90,wall,left,(32*i)+this.mapTopY,32,32));
      };
  
      //wall right
      for (let i=1;i<this.verticalWallLenght;i++){
        this.listMapElement.push( new Wall(270,wall,this.mapRightX-32,(32*i)+this.mapTopY-32,32,32));
      };
  
      //wall bottom
      for (let i=1 ;i<this.horizontalWallLenght;i++){
        this.listMapElement.push( new Wall(180,wall,(32*i)+this.mapLeftX,this.mapBottomY-32,32,32));
      };
  
      //angles
      this.listMapElement.push( new Wall(0, angleWall, this.mapLeftX+(32*this.cutCornerX), this.mapTopY,32,32));
      this.listMapElement.push( new Wall(0, angleWall, 0 + this.mapLeftX, (32*this.cutCornerY) + this.mapTopY,32,32));
      this.listMapElement.push( new Wall(270, angleWall, 0 + this.mapRightX-32, this.mapTopY-32,32,32));
      this.listMapElement.push( new Wall(90, angleWall, 0 + this.mapLeftX, this.mapBottomY,32,32));
      this.listMapElement.push( new Wall(180, angleWall, 0 + this.mapRightX-32, this.mapBottomY-32,32,32));
      this.listMapElement.push( new Wall(180, angleWall, this.mapLeftX+(32*this.cutCornerX), (32*this.cutCornerY) + this.mapTopY,32,32));
    };
  
    createMapDoor(){ 
      let doorLeft = new Image(100, 200);
      let doorRight = new Image(100, 200);
      doorLeft.src = 'assets/room/doorLeft.jpg';
      doorRight.src = 'assets/room/doorRight.jpg';
      
      if (this.doorTop === 1){
        this.listMapElement.push( new Door(0,doorLeft,(this.mapRightX-160)-32,this.mapTopY,32,32,"top"));
        this.listMapElement.push( new Door(0,doorRight,(this.mapRightX-160),this.mapTopY,32,32,"top"));
        this.positionDoorTop.push((this.mapRightX-160))
        this.positionDoorTop.push(this.mapTopY)
      }
      if (this.doorLeft === 1){
        this.listMapElement.push( new Door(90,doorLeft,this.mapLeftX,(this.mapBottomY-128)+16,32,32,"left")); 
        this.listMapElement.push( new Door(90,doorRight,this.mapLeftX,(this.mapBottomY-128)-16,32,32,"left"));      
        this.positionDoorLeft.push(this.mapLeftX)
        this.positionDoorLeft.push((this.mapBottomY-128))
      }
      if (this.doorBottom === 1){
        this.listMapElement.push( new Door(180,doorLeft,(this.mapRightX+this.mapLeftX)/2,this.mapBottomY-32,32,32,"bottom"));
        this.listMapElement.push( new Door(180,doorRight,(this.mapRightX+this.mapLeftX)/2-32,this.mapBottomY-32,32,32,"bottom"));
        this.positionDoorBottom.push((this.mapRightX+this.mapLeftX)/2)
        this.positionDoorBottom.push(this.mapBottomY-32) 
      }
      if (this.doorRight === 1){
        this.listMapElement.push( new Door(270,doorLeft,this.mapRightX-32,(this.mapBottomY-32+this.mapTopY)/2-16,32,32,"right"));
        this.listMapElement.push( new Door(270,doorRight,this.mapRightX-32,(this.mapBottomY-32+this.mapTopY)/2+16,32,32,"right"));
        this.positionDoorRight.push(this.mapRightX-32)
        this.positionDoorRight.push((this.mapBottomY-32+this.mapTopY)/2) 
      }
    }

    createMap(){
        this.createMapFloor();
        this.createMapWalls();
        this.createMapDoor();
        this.createMapEnnemy();
        this.createMapItem();
    }

    createMapEnnemy(){
      function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
      console.log(this.nbrEnnemy)
      for (let i = 0; i < this.nbrEnnemy; i++) {
        
        const ennemy = new Ennemy(randomIntFromInterval(-4,4),randomIntFromInterval(-4,4))
        this.ennemyList.push(ennemy)
        this.listMapElement.push(ennemy)
      }
    }
  
    createMapItem(){
      const item = new DoubleShot()
      this.listMapElement.push(item)
    }

    mapDraw(){
        for (let i=0;i<this.listMapFloor.length;i++){
            this.listMapFloor[i].draw();
        };
        for (let i=0;i<this.listMapElement.length;i++){
            this.listMapElement[i].draw();
        };
    }
  }

  
class SquareMap {
  constructor(doorTop,doorLeft,doorBottom,doorRight,paterneObstacle,nbrEnnemy,isItem){
    this.listMapElement = [];
    this.listMapFloor = [];

    this.mapTopY=64;
    this.mapBottomY=512;
    this.mapLeftX = 64;
    this.mapRightX = 832;

    this.horizontalWallLenght = 23;
    this.verticalWallLenght = 14;

    this.IsDoorTop = doorTop;
    this.IsDoorLeft = doorLeft;
    this.IsDoorBottom = doorBottom;
    this.IsDoorRight = doorRight;

    this.positionDoorTop = [];
    this.positionDoorLeft = [];
    this.positionDoorBottom = [];
    this.positionDoorRight = [];

    this.topSection = []

    this.paterneObstacle = paterneObstacle

    this.ennemyList = []
    this.nbrEnnemy = nbrEnnemy

    this.isItem = isItem
  }

  createMapFloor(){ 
    //floor
    for (let i=0;i<this.verticalWallLenght-2;i++){
        for (let j=0;j<this.horizontalWallLenght-1;j++){
          this.listMapFloor.push( new Floor(this.floor,(32*j)+this.mapLeftX,(32*i)+this.mapTopY,32,32));
        }
    };
  };

  createMapWalls(){ 
    //wall top
    for (let i=1;i<this.horizontalWallLenght;i++){
      this.listMapElement.push( new Wall(0, this.wall,(32*i)+this.mapLeftX,this.mapTopY,32,32));
      this.topSection.push( new Wall(0, this.wall,(32*i)+this.mapLeftX,this.mapTopY,32,32));
    };
    //wall left
    for (let i=1;i<this.verticalWallLenght;i++){
      this.listMapElement.push( new Wall(90, this.wall,this.mapLeftX,(32*i)+this.mapTopY,32,32));
    };
    //wall right
    for (let i=1;i<this.verticalWallLenght;i++){
      this.listMapElement.push( new Wall(270, this.wall,this.mapRightX-32,(32*i)+this.mapTopY-32,32,32));
    };
    //wall bottom
    for (let i=1 ;i<this.horizontalWallLenght;i++){
      this.listMapElement.push( new Wall(180, this.wall,(32*i)+this.mapLeftX,this.mapBottomY-32,32,32));
    };
    //angles
    this.listMapElement.push( new Wall(0, this.angleWall,(0)+ this.mapLeftX, this.mapTopY,32,32));
    this.listMapElement.push( new Wall(270, this.angleWall,(0)+ this.mapRightX-32, this.mapTopY-32,32,32));
    this.listMapElement.push( new Wall(90, this.angleWall,(0)+ this.mapLeftX, this.mapBottomY,32,32));
    this.listMapElement.push( new Wall(180, this.angleWall,(0)+ this.mapRightX-32, this.mapBottomY-32,32,32));
  };

  createMapDoor(){   
    if (this.IsDoorTop === 1){
      this.listMapElement.push( new Door(0,this.doorLeft,(this.mapRightX+this.mapLeftX)/2-32,this.mapTopY,32,32,"top"));
      this.listMapElement.push( new Door(0, this.doorRight,(this.mapRightX+this.mapLeftX)/2,this.mapTopY,32,32,"top"));
      this.positionDoorTop.push((this.mapRightX+this.mapLeftX)/2)
      this.positionDoorTop.push(this.mapTopY)
    }
    if (this.IsDoorLeft === 1){
      this.listMapElement.push( new Door(90,this.doorLeft,this.mapLeftX,(this.mapBottomY-32+this.mapTopY)/2+16,32,32,"left")); 
      this.listMapElement.push( new Door(90, this.doorRight,this.mapLeftX,(this.mapBottomY-32+this.mapTopY)/2-16,32,32,"left")); 
      this.positionDoorLeft.push(this.mapLeftX)
      this.positionDoorLeft.push((this.mapBottomY-32+this.mapTopY)/2)     
    }
    if (this.IsDoorBottom === 1){
      this.listMapElement.push( new Door(180,this.doorLeft,(this.mapRightX+this.mapLeftX)/2,this.mapBottomY-32,32,32,"bottom"));
      this.listMapElement.push( new Door(180, this.doorRight,(this.mapRightX+this.mapLeftX)/2-32,this.mapBottomY-32,32,32,"bottom"));
      this.positionDoorBottom.push((this.mapRightX+this.mapLeftX)/2)
      this.positionDoorBottom.push(this.mapBottomY-32)  
    }
    if (this.IsDoorRight === 1){
      this.listMapElement.push( new Door(270,this.doorLeft,this.mapRightX-32,(this.mapBottomY-32+this.mapTopY)/2-16,32,32,"right"));
      this.listMapElement.push( new Door(270, this.doorRight,this.mapRightX-32,(this.mapBottomY-32+this.mapTopY)/2+16,32,32,"right"));
      this.positionDoorRight.push(this.mapRightX-32)
      this.positionDoorRight.push((this.mapBottomY-32+this.mapTopY)/2) 
    };
  }

  createMap(){
    this.createMapFloor();
    this.createMapWalls();
    this.createMapDoor();
    this.createMapObstacle()
    this.createMapEnnemy();
    this.createMapItem();
    if (this.typeRoom === "boss"){
      this.createMapStair()
    }
  }

  mapDraw(){
    for (let i=0;i<this.listMapFloor.length;i++){
      this.listMapFloor[i].draw();
    };
    for (let i=0;i<this.listMapElement.length;i++){
        this.listMapElement[i].draw();
    };
  };

  createMapEnnemy(){
    for (let i = 0; i < this.nbrEnnemy; i++) {  
      const ennemy = new Ennemy(randomIntFromInterval(-4,4),randomIntFromInterval(-4,4))
      this.ennemyList.push(ennemy)
      this.listMapElement.push(ennemy)
    }
  }

  createMapItem(){
    if (this.isItem != 0){
      let x = randomIntFromInterval(this.mapLeftX+64,this.mapRightX-64)
      let y = randomIntFromInterval(this.mapTopY+64,this.mapBottomY-64)
      const item = new DoubleShot(x,y)
      this.listMapElement.push(item)
    }
  }

  createMapObstacle(){
    let paterne1 = [this.mapLeftX+32*3,this.mapTopY+32*3,this.mapRightX-32*4,this.mapTopY+32*3,this.mapLeftX+32*3,this.mapBottomY-32*4,this.mapRightX-32*4,this.mapBottomY-32*4]
    let paterne2 = [this.mapLeftX+32*7,this.mapTopY+32*4,this.mapLeftX+32*8,this.mapTopY+32*5,this.mapLeftX+32*8,this.mapTopY+32*6,this.mapLeftX+32*8,this.mapTopY+32*7,this.mapLeftX+32*8,this.mapTopY+32*8,this.mapLeftX+32*7,this.mapBottomY-32*5,this.mapRightX-32*8,this.mapTopY+32*4,this.mapRightX-32*9,this.mapTopY+32*5,this.mapRightX-32*9,this.mapTopY+32*6,this.mapRightX-32*9,this.mapTopY+32*7,this.mapRightX-32*9,this.mapTopY+32*8,this.mapRightX-32*8,this.mapBottomY-32*5]
    // 
    switch (this.paterneObstacle) {
      case 1:
        let nbrBoucle1 = paterne1.length

        for (let i=0;i<nbrBoucle1;i+=2){
          this.listMapElement.push( new Wall(0, this.obstaclePillar,paterne1[i],paterne1[i+1],32,32));
        }
        break;
      case 2:
        let nbrBoucle2 = paterne2.length

        for (let i=0;i<nbrBoucle2;i+=2){
          this.listMapElement.push( new Wall(0, this.obstaclePillar,paterne2[i],paterne2[i+1],32,32));
        }
        break;
    }
  }
}

class ItemMap extends SquareMap{
  constructor(doorTop,doorLeft,doorBottom,doorRight,paterneObstacle,nbrEnnemy){
    super(doorTop,doorLeft,doorBottom,doorRight,paterneObstacle,nbrEnnemy)
    this.typeRoom = "item"

    this.floor = new Image(100, 200);
    this.wall = new Image(100, 200);
    this.angleWall = new Image(100, 200);
    this.doorLeft = new Image(100, 200);
    this.doorRight = new Image(100, 200);
    this.obstaclePillar = new Image(100, 200);

    this.floor.src = 'assets/room/floorBoss.jpg';
    this.wall.src = 'assets/room/wallBoss.jpg';
    this.angleWall.src = 'assets/room/angleWallBoss.jpg';
    this.doorLeft.src = 'assets/room/doorLeftBoss.jpg';
    this.doorRight.src = 'assets/room/doorRightBoss.jpg';
    this.obstaclePillar.src = 'assets/room/pillar.png';
  };
};

class BossMap extends SquareMap{
  constructor(doorTop,doorLeft,doorBottom,doorRight,paterneObstacle,nbrEnnemy,isItem){
    super(doorTop,doorLeft,doorBottom,doorRight,paterneObstacle,nbrEnnemy,isItem)
    this.typeRoom = "boss"

    this.floor = new Image(100, 200);
    this.wall = new Image(100, 200);
    this.angleWall = new Image(100, 200);
    this.doorLeft = new Image(100, 200);
    this.doorRight = new Image(100, 200);
    this.obstaclePillar = new Image(100, 200);
    this.stair = new Image(100, 200);

    this.floor.src = 'assets/room/floorItem.jpg';
    this.wall.src = 'assets/room/wallItem.jpg';
    this.angleWall.src = 'assets/room/angleWallItem.jpg';
    this.doorLeft.src = 'assets/room/doorLeftItem.jpg';
    this.doorRight.src = 'assets/room/doorRightItem.jpg';
    this.obstaclePillar.src = 'assets/room/pillar.png';
    this.stair.src = 'assets/room/stair.png';
  };

  createMapStair(){
    this.listMapElement.push( new Stair(this.stair,704,384,32,32));
  }
};

class NormalMap extends SquareMap{
  constructor(doorTop,doorLeft,doorBottom,doorRight,paterneObstacle,nbrEnnemy,isItem){
    super(doorTop,doorLeft,doorBottom,doorRight,paterneObstacle,nbrEnnemy,isItem)
    this.typeRoom = "normal"

    this.floor = new Image(100, 200);
    this.wall = new Image(100, 200);
    this.angleWall = new Image(100, 200);
    this.doorLeft = new Image(100, 200);
    this.doorRight = new Image(100, 200);
    this.obstaclePillar = new Image(100, 200);


    this.floor.src = 'assets/room/floor.jpg';
    this.wall.src = 'assets/room/wall.jpg';
    this.angleWall.src = 'assets/room/angleWall.jpg';
    this.doorLeft.src = 'assets/room/doorLeft.jpg';
    this.doorRight.src = 'assets/room/doorRight.jpg';
    this.obstaclePillar.src = 'assets/room/pillar.png';
  };
};

export {NormalMap, LMap, ItemMap, BossMap}