import Floor from './floor.js';
import Wall, { Obstacle } from './wall.js';
import Door from './door.js';
import {Cthonicbeast, Mucusthing,Necrodrake,Oozeling, Shadowraith} from './ennemy.js';
import { DoubleShot, Gatling,Autoguide,Spectral, healPotion, UpHpElixir} from './item.js';
import Stair from './stair.js'
import Piedestal from './piedestal.js';

let canvas = document.querySelector('#char');
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

class AllMap{
  constructor(isDoorTop,isDoorLeft,isDoorBottom,isDoorRight,paterneObstacle,nbrEnnemy,isItem,listItem){
    this.listMapElement = [];
    this.listMapFloor = [];

    this.cutCornerX = 0;
    this.cutCornerY = 0;

    this.mapTopY= 64;
    this.mapBottomY= 512;
    this.mapLeftX = 64;
    this.mapRightX = 832;

    this.horizontalWallLenght = 23;
    this.verticalWallLenght = 14;

    this.isDoorTop = isDoorTop;
    this.isDoorLeft = isDoorLeft;
    this.isDoorBottom = isDoorBottom;
    this.isDoorRight = isDoorRight;

    this.positionDoorTop = [];
    this.positionDoorLeft = [];
    this.positionDoorBottom = [];
    this.positionDoorRight = [];

    this.topSection = []
    this.paterneObstacle = paterneObstacle

    this.ennemyList = []
    this.nbrEnnemy = nbrEnnemy;
    this.allEnnemyDead = false

    this.isItem = isItem
    this.itemMap = [0]

    this.listItem = listItem
  };

  createMapFloor(){ 
    //floor
    for (let i=0;i<this.cutCornerY;i++){
      for (let j=13;j<this.horizontalWallLenght-1;j++){
        this.listMapFloor.push( new Floor(this.floor,(32*j)+this.mapLeftX,(32*i)+this.mapTopY,32,32));
      }
    };
    for (let i=this.cutCornerY;i<this.verticalWallLenght-2;i++){
      for (let j=0;j<this.horizontalWallLenght-1;j++){
        this.listMapElement.push( new Floor(this.floor,(32*j)+this.mapLeftX,(32*i)+this.mapTopY,32,32));
      }
    };
  };

  createMapWalls(){ 
    //wall top
    for (let i=1;i<this.horizontalWallLenght;i++){
      let  top  = this.mapTopY;
      if (i<this.cutCornerX){
        top = this.mapTopY+(32*this.cutCornerY);
      }
      this.listMapElement.push( new Wall(0,this.wall,(32*i)+this.mapLeftX,top,32,32));
    };

    //wall left
    for (let i=1;i<this.verticalWallLenght;i++){
      let left  = this.mapLeftX;
      if (i<this.cutCornerY+1){
        left = this.mapLeftX+(32*this.cutCornerX);
      }
      this.listMapElement.push( new Wall(90,this.wall,left,(32*i)+this.mapTopY,32,32));
    };

    //wall right
    for (let i=1;i<this.verticalWallLenght;i++){
      this.listMapElement.push( new Wall(270,this.wall,this.mapRightX-32,(32*i)+this.mapTopY-32,32,32));
    };

    //wall bottom
    for (let i=1 ;i<this.horizontalWallLenght;i++){
      this.listMapElement.push( new Wall(180,this.wall,(32*i)+this.mapLeftX,this.mapBottomY-32,32,32));
    };

    //angles
    if (this.cutCornerX != 0 && this.cutCornerY != 0){
      this.listMapElement.push( new Wall(180, this.angleWall, this.mapLeftX+(32*this.cutCornerX), (32*this.cutCornerY) + this.mapTopY,32,32));
    }
    this.listMapElement.push( new Wall(0, this.angleWall, this.mapLeftX+(32*this.cutCornerX), this.mapTopY,32,32));
    this.listMapElement.push( new Wall(0, this.angleWall, 0 + this.mapLeftX, (32*this.cutCornerY) + this.mapTopY,32,32));
    this.listMapElement.push( new Wall(270, this.angleWall, 0 + this.mapRightX-32, this.mapTopY-32,32,32));
    this.listMapElement.push( new Wall(90, this.angleWall, 0 + this.mapLeftX, this.mapBottomY,32,32));
    this.listMapElement.push( new Wall(180, this.angleWall, 0 + this.mapRightX-32, this.mapBottomY-32,32,32));
    
  };

  createMapDoor(doorLeft, doorRight){ 
    // top  
    if (this.IsDoorTop === 1){
      this.listMapElement.push( new Door(0,doorLeft,(this.mapRightX+this.mapLeftX)/2-32,this.mapTopY,32,32,"top"));
      this.listMapElement.push( new Door(0,doorRight,(this.mapRightX+this.mapLeftX)/2,this.mapTopY,32,32,"top"));
      this.positionDoorTop.push((this.mapRightX+this.mapLeftX)/2)
      this.positionDoorTop.push(this.mapTopY)
    }
    // left
    if (this.IsDoorLeft === 1){
      this.listMapElement.push( new Door(90,doorLeft,this.mapLeftX,(this.mapBottomY-32+this.mapTopY)/2+16,32,32,"left")); 
      this.listMapElement.push( new Door(90,doorRight,this.mapLeftX,(this.mapBottomY-32+this.mapTopY)/2-16,32,32,"left")); 
      this.positionDoorLeft.push(this.mapLeftX)
      this.positionDoorLeft.push((this.mapBottomY-32+this.mapTopY)/2)     
    }
    // bottom
    if (this.IsDoorBottom === 1){
      this.listMapElement.push( new Door(180,doorLeft,(this.mapRightX+this.mapLeftX)/2,this.mapBottomY-32,32,32,"bottom"));
      this.listMapElement.push( new Door(180,doorRight,(this.mapRightX+this.mapLeftX)/2-32,this.mapBottomY-32,32,32,"bottom"));
      this.positionDoorBottom.push((this.mapRightX+this.mapLeftX)/2)
      this.positionDoorBottom.push(this.mapBottomY-32)  
    }
    // right
    if (this.IsDoorRight === 1){
      this.listMapElement.push( new Door(270,doorLeft,this.mapRightX-32,(this.mapBottomY-32+this.mapTopY)/2-16,32,32,"right"));
      this.listMapElement.push( new Door(270,doorRight,this.mapRightX-32,(this.mapBottomY-32+this.mapTopY)/2+16,32,32,"right"));
      this.positionDoorRight.push(this.mapRightX-32)
      this.positionDoorRight.push((this.mapBottomY-32+this.mapTopY)/2) 
    };
  }

  createMapOpenDoor(){   
    this.createMapDoor(this.openDoorLeft,this.openDoorRight)
  }

  createMapEnnemy(levelPlayer){
    // choose random ennemi  on a random coordonate in the center of the map
    for (let i = 0; i < this.nbrEnnemy; i++) { 
      const index = randomIntFromInterval(0,2)
      let ennemy
      let x = randomIntFromInterval(260,630)
      let y = randomIntFromInterval(220,370)
      switch (index) {
        case 0:
          ennemy = new Mucusthing(x,y)
          break;
        case 1:
          ennemy = new Oozeling(x,y)
          break;
        case 2:
          ennemy = new Shadowraith(x,y)
          break;
        default:
          break;
      }
      ennemy.hp = ennemy.hp+ennemy.hp*(levelPlayer*0.10)
      ennemy.maxHp = ennemy.hp
      this.ennemyList.push(ennemy)
      this.listMapElement.push(ennemy)
    }
  }

  createMapItem(){
    
    if (this.isItem != 0){

      let x = canvas.width/2-30
      let y = canvas.height/2-30
      let piedestal = new Piedestal(x,y)

      piedestal.draw()
      let item = piedestal.itemChoice(this.listItem)
  
      this.listMapElement.push(piedestal)
      this.itemMap.splice(0, 0, item)
      this.listMapElement.push(item)
    } 
  }

  createMap(char,levelPlayer){ // call all the function to create the map
    this.listMapElement.push(char)
    this.createMapFloor();
    this.createMapWalls();
    this.createMapDoor(this.doorLeft, this.doorRight);
    this.createMapObstacle()
    this.createMapEnnemy(levelPlayer);
    
    this.createMapItem();
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

class LMap extends AllMap{
    constructor(isDoorTop,isDoorLeft,isDoorBottom,isDoorRight,paterneObstacle,nbrEnnemy,isItem,listItem){
      super(isDoorTop,isDoorLeft,isDoorBottom,isDoorRight,paterneObstacle,nbrEnnemy,isItem,listItem)

      this.cutCornerX = 13;
      this.cutCornerY = 7;

      this.isDoorTop = isDoorTop;
      this.isDoorLeft = isDoorLeft;
      this.isDoorBottom = isDoorBottom;
      this.isDoorRight = isDoorRight;

      this.floor = new Image(100, 200);
      this.floor.src = 'assets/room/floor.jpg';

      this.wall = new Image(100, 200);
      this.wall.src = 'assets/room/wall.jpg';
      this.angleWall = new Image(100, 200);
      this.angleWall.src = 'assets/room/angleWall.jpg';

      this.doorLeft = new Image(100, 200);
      this.doorRight = new Image(100, 200);
      this.doorLeft.src = 'assets/room/doorLeft.jpg';
      this.doorRight.src = 'assets/room/doorRight.jpg';

      this.openDoorLeft = new Image(100, 200);
      this.openDoorRight = new Image(100, 200);
      this.openDoorLeft.src = 'assets/room/openDoorLeft.png';
      this.openDoorRight.src = 'assets/room/openDoorRight.png';
    };
  
    
  
    createMapDoor(doorLeft,doorRight){ 
      
      if (this.isDoorTop === 1){
        this.listMapElement.push( new Door(0,doorLeft,(this.mapRightX-160)-32,this.mapTopY,32,32,"top"));
        this.listMapElement.push( new Door(0,doorRight,(this.mapRightX-160),this.mapTopY,32,32,"top"));
        this.positionDoorTop.push((this.mapRightX-160))
        this.positionDoorTop.push(this.mapTopY)
      }
      if (this.isDoorLeft === 1){
        this.listMapElement.push( new Door(90,doorLeft,this.mapLeftX,(this.mapBottomY-128)+16,32,32,"left")); 
        this.listMapElement.push( new Door(90,doorRight,this.mapLeftX,(this.mapBottomY-128)-16,32,32,"left"));      
        this.positionDoorLeft.push(this.mapLeftX)
        this.positionDoorLeft.push((this.mapBottomY-128))
      }
      if (this.isDoorBottom === 1){
        this.listMapElement.push( new Door(180,doorLeft,(this.mapRightX+this.mapLeftX)/2,this.mapBottomY-32,32,32,"bottom"));
        this.listMapElement.push( new Door(180,doorRight,(this.mapRightX+this.mapLeftX)/2-32,this.mapBottomY-32,32,32,"bottom"));
        this.positionDoorBottom.push((this.mapRightX+this.mapLeftX)/2)
        this.positionDoorBottom.push(this.mapBottomY-32) 
      }
      if (this.isDoorRight === 1){
        this.listMapElement.push( new Door(270,doorLeft,this.mapRightX-32,(this.mapBottomY-32+this.mapTopY)/2-16,32,32,"right"));
        this.listMapElement.push( new Door(270,doorRight,this.mapRightX-32,(this.mapBottomY-32+this.mapTopY)/2+16,32,32,"right"));
        this.positionDoorRight.push(this.mapRightX-32)
        this.positionDoorRight.push((this.mapBottomY-32+this.mapTopY)/2) 
      }
    }

    createMap(){
        this.createMapFloor();
        this.createMapWalls();
        this.createMapDoor(this.doorLeft, this.doorRight);    
    }  
  }

  
class SquareMap extends AllMap {
  constructor(doorTop,doorLeft,doorBottom,doorRight,paterneObstacle,nbrEnnemy,isItem,listItem){
    super(doorTop,doorLeft,doorBottom,doorRight,paterneObstacle,nbrEnnemy,isItem,listItem)

    this.IsDoorTop = doorTop;
    this.IsDoorLeft = doorLeft;
    this.IsDoorBottom = doorBottom;
    this.IsDoorRight = doorRight;

  }

  createMapObstacle(){
    let paterne1 = [this.mapLeftX+32*3,this.mapTopY+32*3,this.mapRightX-32*4,this.mapTopY+32*3,this.mapLeftX+32*3,this.mapBottomY-32*4,this.mapRightX-32*4,this.mapBottomY-32*4]
    let paterne2 = [this.mapLeftX+32*7,this.mapTopY+32*4,this.mapLeftX+32*8,this.mapTopY+32*5,this.mapLeftX+32*8,this.mapTopY+32*6,this.mapLeftX+32*8,this.mapTopY+32*7,this.mapLeftX+32*8,this.mapTopY+32*8,this.mapLeftX+32*7,this.mapBottomY-32*5,this.mapRightX-32*8,this.mapTopY+32*4,this.mapRightX-32*9,this.mapTopY+32*5,this.mapRightX-32*9,this.mapTopY+32*6,this.mapRightX-32*9,this.mapTopY+32*7,this.mapRightX-32*9,this.mapTopY+32*8,this.mapRightX-32*8,this.mapBottomY-32*5]
    // 
    switch (this.paterneObstacle) {
      case 1:
        let nbrBoucle1 = paterne1.length

        for (let i=0;i<nbrBoucle1;i+=2){
          this.listMapElement.push( new Obstacle(0, this.obstaclePillar,paterne1[i],paterne1[i+1],32,32));
        }
        break;
      case 2:
        let nbrBoucle2 = paterne2.length

        for (let i=0;i<nbrBoucle2;i+=2){
          this.listMapElement.push( new Obstacle(0, this.obstaclePillar,paterne2[i],paterne2[i+1],32,32));
        }
        break;
    }
  }
}

class ItemMap extends SquareMap{
  constructor(doorTop,doorLeft,doorBottom,doorRight,paterneObstacle,nbrEnnemy,isItem,listItem){
    super(doorTop,doorLeft,doorBottom,doorRight,paterneObstacle,nbrEnnemy,isItem,listItem)
    this.typeRoom = "item"

    this.floor = new Image(100, 200);
    this.wall = new Image(100, 200);
    this.angleWall = new Image(100, 200);
    this.doorLeft = new Image(100, 200);
    this.doorRight = new Image(100, 200);
    this.openDoorLeft = new Image(100, 200);
    this.openDoorRight = new Image(100, 200);
    this.obstaclePillar = new Image(100, 200);

    this.floor.src = 'assets/room/floorBoss.jpg';
    this.wall.src = 'assets/room/wallBoss.jpg';
    this.angleWall.src = 'assets/room/angleWallBoss.jpg';
    this.doorLeft.src = 'assets/room/doorLeftBoss.jpg';
    this.doorRight.src = 'assets/room/doorRightBoss.jpg';
    this.openDoorLeft.src = 'assets/room/openDoorItemLeft.png';
    this.openDoorRight.src = 'assets/room/openDoorItemRight.png';
    this.obstaclePillar.src = 'assets/room/pillar.png';

    this.listItem = listItem
  };
};

class BossMap extends SquareMap{
  constructor(doorTop,doorLeft,doorBottom,doorRight,paterneObstacle,nbrEnnemy,isItem,listItem){
    super(doorTop,doorLeft,doorBottom,doorRight,paterneObstacle,nbrEnnemy,isItem,listItem)
    this.typeRoom = "boss"

    this.floor = new Image(100, 200);
    this.wall = new Image(100, 200);
    this.angleWall = new Image(100, 200);
    this.doorLeft = new Image(100, 200);
    this.doorRight = new Image(100, 200);
    this.openDoorLeft = new Image(100, 200);
    this.openDoorRight = new Image(100, 200);
    this.obstaclePillar = new Image(100, 200);
    this.stair = new Image(100, 200);

    this.floor.src = 'assets/room/floorItem.jpg';
    this.wall.src = 'assets/room/wallItem.jpg';
    this.angleWall.src = 'assets/room/angleWallItem.jpg';
    this.doorLeft.src = 'assets/room/doorLeftItem.jpg';
    this.doorRight.src = 'assets/room/doorRightItem.jpg';
    this.openDoorLeft.src = 'assets/room/openDoorBossLeft.png';
    this.openDoorRight.src = 'assets/room/openDoorBossRight.png';
    this.obstaclePillar.src = 'assets/room/pillar.png';
    this.stair.src = 'assets/room/stair.png';
  };

  drawStair(){
    this.listMapElement.push( new Stair(this.stair,736,416,32,32));
  }

  createMapEnnemy(levelPlayer){  // ennemies are boss
    for (let i = 0; i < this.nbrEnnemy; i++) { 
      const index = randomIntFromInterval(0,1)
      let ennemy
      let x = randomIntFromInterval(260,630)
      let y = randomIntFromInterval(220,370)
      switch (index) {
        case 0:
          ennemy = new Necrodrake(x,y)
          break;
        case 1:
          ennemy = new Cthonicbeast(x,y)
          break;
        default:
          break;
      }
      ennemy.hp = ennemy.hp+ennemy.hp*(levelPlayer*0.10)
      ennemy.maxHp = ennemy.hp
      this.ennemyList.push(ennemy)
      this.listMapElement.push(ennemy)
    }
  }

};

class NormalMap extends SquareMap{
  constructor(doorTop,doorLeft,doorBottom,doorRight,paterneObstacle,nbrEnnemy,isItem,listItem){
    super(doorTop,doorLeft,doorBottom,doorRight,paterneObstacle,nbrEnnemy,isItem,listItem)
    this.typeRoom = "normal"
    
    this.floor = new Image(100, 200);
    this.wall = new Image(100, 200);
    this.angleWall = new Image(100, 200);
    this.doorLeft = new Image(100, 200);
    this.doorRight = new Image(100, 200);
    this.openDoorLeft = new Image(100, 200);
    this.openDoorRight = new Image(100, 200);
    this.obstaclePillar = new Image(100, 200);


    this.floor.src = 'assets/room/floor.jpg';
    this.wall.src = 'assets/room/wall.jpg';
    this.angleWall.src = 'assets/room/angleWall.jpg';
    this.doorLeft.src = 'assets/room/doorLeft.jpg';
    this.doorRight.src = 'assets/room/doorRight.jpg';
    this.openDoorLeft.src = 'assets/room/openDoorLeft.png';
    this.openDoorRight.src = 'assets/room/openDoorRight.png';
    this.obstaclePillar.src = 'assets/room/pillar.png';
  };
};

export {NormalMap, LMap, ItemMap, BossMap}