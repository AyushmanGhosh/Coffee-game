import { Redhat } from '../objects/redhat';

export class MainScene extends Phaser.Scene {
  private myRedhat: Redhat;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.load.image("doors", "maps/TopDownHouse_DoorsAndWindows.png");
    this.load.image("floor", "maps/TopDownHouse_FloorsAndWalls.png");
    this.load.tilemapTiledJSON("map", "maps/Cafe_main_floor.json");
  }

  create(): void {
    const map = this.make.tilemap({ key: "map" });
    const spawnPoint = map.findObject("spawnPoint", obj => obj.name === "spawnPointPlayer")
    this.cameras.main.zoomTo(3.5,0)
    this.cameras.main.centerOn((spawnPoint.x + 30), (spawnPoint.y - 30));

    
    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const floor = map.addTilesetImage("Cafe_floor_walls", "floor");
    const door = map.addTilesetImage("Cafe_doors_windows", "doors")
   
    
    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const floorLayer = map.createLayer("Floor", floor, 0, 0);
    const doorLayer = map.createLayer("door", door, 0, 0);
    
    
  }
}
