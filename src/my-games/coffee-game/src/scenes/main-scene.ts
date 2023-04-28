import { Redhat } from '../objects/redhat';

export class MainScene extends Phaser.Scene {
  private myRedhat: Redhat;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.load.image("tiles", "maps/tilesheet_basic.png");
    this.load.tilemapTiledJSON("map", "maps/TestMap.json");
  }

  create(): void {
    const map = this.make.tilemap({ key: "map" });

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const tileset = map.addTilesetImage("TestTileset", "tiles");
  
    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const worldLayer = map.createLayer("Tile Layer 1", tileset, 0, 0);
  }
}
