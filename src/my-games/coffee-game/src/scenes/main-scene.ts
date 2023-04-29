import { Redhat } from '../objects/redhat';

export class MainScene extends Phaser.Scene {
  private myRedhat: Redhat;

  constructor() {
    super({ key: 'MainScene' });
    
    
  }

  preload(): void {
    this.load.image("doors", "maps/TopDownHouse_DoorsAndWindows.png");
    this.load.image("floor", "maps/TopDownHouse_FloorsAndWalls.png");
    this.load.image("furniture_1", "maps/TopDownHouse_FurnitureState1.png");
    this.load.image("furniture_2", "maps/TopDownHouse_FurnitureState2.png")
    this.load.image("smallObjects", "maps/TopDownHouse_SmallItems.png")
    this.load.tilemapTiledJSON("map", "maps/Cafe_main_floor.json");
  }

  create(): void {
    const map = this.make.tilemap({ key: "map" });
    const spawnPoint = map.findObject("spawnPoint", obj => obj.name === "spawnPointPlayer")
    this.cameras.main.zoomTo(3.3,0)
    // this.cameras.main.centerOn((spawnPoint.x + 10), (spawnPoint.y - 30));
    this.cameras.main.setBounds(0,0,map.widthInPixels, map.heightInPixels)
    
    
    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const floor = map.addTilesetImage("Cafe_floor_walls", "floor");
    const door = map.addTilesetImage("Cafe_doors_windows", "doors");
    const furniture_1 = map.addTilesetImage("Cafe_furniture_1", "furniture_1");
    const furniture_2 = map.addTilesetImage("Cafe_furniture_2", "furniture_2");
    const smallObjects = map.addTilesetImage("Cafe_furniture_3", "smallObjects")
    
    this.cameras.main.startFollow(spawnPoint)    
    
    
    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const floorLayer = map.createLayer("Floor", floor, 0, 0);
    const doorLayer = map.createLayer("door", door, 0, 0);
    //Offset because furniture_1 is 8x8 and others are 16x16
    const furnitureLayer_1 = map.createLayer("fridge", furniture_1, 0, 8);
    const furnitureLayer_2 = map.createLayer("furniture", furniture_2, 0,   0);
    const furnitureLayer_3 = map.createLayer("on_floor", furniture_2, 0 , 0);
    const smallObjectsLayer = map.createLayer("smallObjects", smallObjects, 0 , 0);

    
    
  }
}
