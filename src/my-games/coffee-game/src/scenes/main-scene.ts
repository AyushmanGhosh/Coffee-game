import { Redhat } from '../objects/redhat';

export class MainScene extends Phaser.Scene {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.cameras.main.setBackgroundColor(0x000000);
    // this.load.image('doors', 'maps/TopDownHouse_DoorsAndWindows.png');
    this.load.image('doors_windows', 'maps/TopDownHouse_DoorsAndWindows.png');
    this.load.image('floor_walls', 'maps/TopDownHouse_FloorsAndWalls.png');
    this.load.image('furniture_1', 'maps/TopDownHouse_FurnitureState1.png');
    this.load.image('furniture_2', 'maps/TopDownHouse_FurnitureState2.png');
    this.load.image('smallObjects', 'maps/TopDownHouse_SmallItems.png');
    this.load.tilemapTiledJSON('map', 'maps/Cafe_main_floor.json');
  }

  create(): void {
    const map = this.make.tilemap({ key: 'map' });
    const spawnPoint = map.findObject(
      'spawnPoint',
      (obj) => obj.name === 'spawnPointPlayer'
    );
    this.cameras.main.zoomTo(2, 0);
    // this.cameras.main.centerOn((spawnPoint.x + 10), (spawnPoint.y - 30));
    this.cameras.main.setBounds(0, 0, 240, 240, true);

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const floor = map.addTilesetImage('Cafe_floor_walls', 'floor_walls');
    const wall_1 = map.addTilesetImage('Cafe_floor_walls', 'floor_walls');
    const wall_2 = map.addTilesetImage('Cafe_floor_walls', 'floor_walls');
    const backWall = map.addTilesetImage('Cafe_floor_walls', 'floor_walls');
    const on_floor = map.addTilesetImage('Cafe_furniture_2', 'furniture_2');
    // const doors = map.addTilesetImage('Cafe_doors_windows', 'doors');
    const test = map.addTilesetImage('Cafe_doors_windows', 'doors_windows');
    const doorsWindows = map.addTilesetImage(
      'Cafe_doors_windows',
      'doors_windows'
    );
    const furniture = map.addTilesetImage('Cafe_furniture_1', 'furniture_1');
    const smallObjects = map.addTilesetImage(
      'Cafe_furniture_3',
      'smallObjects'
    );

    this.cameras.main.startFollow(spawnPoint);

    // Parameters: layer name (or index) from Tiled, tileset, x, y

    const floorLayer = map.createLayer('floor', floor, 0, 0);
    const backWallLayer = map.createLayer('backWall', backWall, 0, 0);

    //Offset because furniture_1 is 8x8 and others are 16x16
    const furnitureLayer = map.createLayer('furniture', furniture, 0, 8);
    const wallLayer_1 = map.createLayer('walls', wall_1, 0, 0);
    const wallLayer_2 = map.createLayer('walls2', wall_2, 0, 0);
    const smallObjectsLayer = map.createLayer(
      'smallObjects',
      smallObjects,
      0,
      0
    );
    const onFloorLayer = map.createLayer('onFloor', on_floor, 0, 0);
    // const doorLayer = map.createLayer('door', doors, 0, 0);
    const doorLayer = map.createLayer('door', doorsWindows, 0, 0);
    // if (!doorLayer){ alert("ERROR")}
    // const testLayer = console.log(
    //   map.createLayer('test', test, 0, 0),
    //   doorLayer,
    //   onFloorLayer
    // );
    // console.log( doorLayer, onFloorLayer)

    //Player Character controls

    // this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'player');
    // this.cursors = this.input.keyboard.createCursorKeys();
  }

  // update(time, delta): void {
  //   this.player.body.setVelocity(0);
  //   // Horizontal movement
  //   if (this.cursors.left.isDown) {
  //     this.player.body.setVelocityX(-80);
  //   } else if (this.cursors.right.isDown) {
  //     this.player.body.setVelocityX(80);
  //   }
  //   // Vertical movement
  //   if (this.cursors.up.isDown) {
  //     this.player.body.setVelocityY(-80);
  //   } else if (this.cursors.down.isDown) {
  //     this.player.body.setVelocityY(80);
  //   }
  // }
}
