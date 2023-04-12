import Floor from './floor.js';
import Wall from './wall.js';
import Door from './door.js';

class Map{
    constructor(doorTop,doorLeft,doorBottom,doorRight){
      this.listMapElement = [];
      this.listMapFloor = [];

      this.mapTopY=64;
      this.mapBottomY=512;
      this.mapLeftX = 96;
      this.mapRightX = 832;

      this.horizontalWallLenght = 22;
      this.verticalWallLenght = 14;

      this.doorTop =doorTop;
      this.doorLeft =doorLeft;
      this.doorBottom =doorBottom;
      this.doorRight =doorRight;

      this.positionDoorTop = [];
      this.positionDoorLeft = [];
      this.positionDoorBottom = [];
      this.positionDoorRight = [];
    };
  
    createMapFloor(){ 
      let  floor = new Image(100, 200);
      floor.src = 'assets/room/floor.jpg';
  
      //floor
      for (let i=0;i<this.verticalWallLenght-2;i++){
          for (let j=0;j<this.horizontalWallLenght-1;j++){
            this.listMapFloor.push( new Floor(floor,(32*j)+this.mapLeftX,(32*i)+this.mapTopY,32,32));
          }
      };
    };
  
    createMapWalls(){ 
      let  wall = new Image(100, 200);
      wall.src = 'assets/room/pieceWall.jpg';
  
      let angleWall = new Image(100, 200);
      angleWall.src = 'assets/room/angleWall.jpg';
  
      //wall top
      for (let i=1;i<this.horizontalWallLenght;i++){
        this.listMapElement.push( new Wall(0,wall,(32*i)+this.mapLeftX,this.mapTopY,32,32));
      };
      //wall left
      for (let i=1;i<this.verticalWallLenght;i++){
        this.listMapElement.push( new Wall(90,wall,this.mapLeftX,(32*i)+this.mapTopY,32,32));
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
      this.listMapElement.push( new Wall(0,angleWall,(0)+ this.mapLeftX, this.mapTopY,32,32));
      this.listMapElement.push( new Wall(270,angleWall,(0)+ this.mapRightX-32, this.mapTopY-32,32,32));
      this.listMapElement.push( new Wall(90,angleWall,(0)+ this.mapLeftX, this.mapBottomY,32,32));
      this.listMapElement.push( new Wall(180,angleWall,(0)+ this.mapRightX-32, this.mapBottomY-32,32,32));
    };

    createMapDoor(){ 
      let door = new Image(100, 200);
      door.src = 'assets/room/door.jpg';
      if (this.doorTop === 1){
        this.listMapElement.push( new Door(0,door,(this.mapRightX+this.mapLeftX)/2,this.mapTopY,32,32,"top"));
        this.positionDoorTop.push((this.mapRightX+this.mapLeftX)/2)
        this.positionDoorTop.push(this.mapTopY)
      }
      if (this.doorLeft === 1){
        this.listMapElement.push( new Door(90,door,this.mapLeftX,(this.mapBottomY-32+this.mapTopY)/2,32,32,"left")); 
        this.positionDoorLeft.push(this.mapLeftX)
        this.positionDoorLeft.push((this.mapBottomY-32+this.mapTopY)/2)     
      }
      if (this.doorBottom === 1){
        this.listMapElement.push( new Door(180,door,(this.mapRightX+this.mapLeftX)/2,this.mapBottomY-32,32,32,"bottom"));
        this.positionDoorBottom.push((this.mapRightX+this.mapLeftX)/2)
        this.positionDoorBottom.push(this.mapBottomY-32)  
      }
      if (this.doorRight === 1){
        this.listMapElement.push( new Door(270,door,this.mapRightX-32,(this.mapBottomY-32+this.mapTopY)/2,32,32,"right"));
        this.positionDoorRight.push(this.mapRightX-32)
        this.positionDoorRight.push((this.mapBottomY-32+this.mapTopY)/2) 
      };
      }

    createMap(){
        this.createMapFloor();
        this.createMapWalls();
        this.createMapDoor();
    }

    deleteMap(){
      this.listMapFloor = []
      this.listMapElement = []
    }
  
    mapDraw(){
        for (let i=0;i<this.listMapFloor.length;i++){
            this.listMapFloor[i].draw();
        };
        for (let i=0;i<this.listMapElement.length;i++){
            this.listMapElement[i].draw();
        };
      
    };
  };
  
class LMap{
    constructor(doorTop,doorLeft,doorBottom,doorRight){
      this.listMapElement = [];
      this.listMapFloor = [];

      this.cutCornerX = 13;
      this.cutCornerY = 7;

      this.mapTopY= 64;
      this.mapBottomY= 512;
      this.mapLeftX = 96;
      this.mapRightX = 832;

      this.horizontalWallLenght = 22;
      this.verticalWallLenght = 14;

      this.doorTop =doorTop;
      this.doorLeft =doorLeft;
      this.doorBottom =doorBottom;
      this.doorRight =doorRight;

      this.positionDoorTop = [];
      this.positionDoorLeft = [];
      this.positionDoorBottom = [];
      this.positionDoorRight = [];
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
      wall.src = 'assets/room/pieceWall.jpg';
  
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
      let door = new Image(100, 200);
      door.src = 'assets/room/door.jpg';
      
      if (this.doorTop === 1){
        this.listMapElement.push( new Door(0,door,(this.mapRightX-160),this.mapTopY,32,32,"top"));
        this.positionDoorTop.push((this.mapRightX-160))
        this.positionDoorTop.push(this.mapTopY)
      }
      if (this.doorLeft === 1){
        this.listMapElement.push( new Door(90,door,this.mapLeftX,(this.mapBottomY-128),32,32,"left"));      
        this.positionDoorLeft.push(this.mapLeftX)
        this.positionDoorLeft.push((this.mapBottomY-128))
      }
      if (this.doorBottom === 1){
        this.listMapElement.push( new Door(180,door,(this.mapRightX+this.mapLeftX)/2,this.mapBottomY-32,32,32,"bottom"));
        this.positionDoorBottom.push((this.mapRightX+this.mapLeftX)/2)
        this.positionDoorBottom.push(this.mapBottomY-32) 
      }
      if (this.doorRight === 1){
        this.listMapElement.push( new Door(270,door,this.mapRightX-32,(this.mapBottomY-32+this.mapTopY)/2,32,32,"right"));
        this.positionDoorRight.push(this.mapRightX-32)
        this.positionDoorRight.push((this.mapBottomY-32+this.mapTopY)/2) 
      }
    }

    createMap(){
        this.createMapFloor();
        this.createMapWalls();
        this.createMapDoor();
    }

    deleteMap(){
      this.listMapFloor = []
      this.listMapElement = []
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

export {Map, LMap}