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
    this.load.spritesheet(
      'player',
      'images/character_sprites/Blue_witch/B_witch_idle.png',
      {
        frameWidth: 32,
        frameHeight: 48
      }
    );
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
    this.cameras.main.zoomTo(5, 0);

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const floor = map.addTilesetImage('Cafe_floor_walls', 'floor_walls');
    const wall_1 = map.addTilesetImage('Cafe_floor_walls', 'floor_walls');
    const wall_2 = map.addTilesetImage('Cafe_floor_walls', 'floor_walls');
    const backWall = map.addTilesetImage('Cafe_floor_walls', 'floor_walls');
    const on_floor = map.addTilesetImage('Cafe_furniture_2', 'furniture_2');
    const doorsWindows = map.addTilesetImage(
      'Cafe_doors_windows',
      'doors_windows'
    );
    const furniture = map.addTilesetImage('Cafe_furniture_1', 'furniture_1');
    const smallObjects = map.addTilesetImage(
      'Cafe_furniture_3',
      'smallObjects'
    );

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
    const doorLayer = map.createLayer('door', doorsWindows, 0, 0);

    furnitureLayer.setCollisionByExclusion([-1]);
    backWallLayer.setCollisionByExclusion([-1]);
    wallLayer_1.setCollisionByExclusion([-1]);
    wallLayer_2.setCollisionByExclusion([-1]);

    //Graphics Collision debug mode
    const debugGraphics = this.add.graphics().setAlpha(0.75);
    furnitureLayer.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });

    //Player Character controls

    this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'player');
    // Player Animations

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNames('player', {
        start: 0,
        end: 8
      }),
      frameRate: 8,
      repeat: -1
    });
    this.player.play('idle');
    // Input and player physcis
    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;
    this.player.setScale(0.8)
    this.player.setCircle(
      this.player.width / 8,
      this.player.height / 4 - this.player.width / 21,
      this.player.height - this.player.height/3
    );


    //Add Collisions
    this.physics.add.collider(this.player, furnitureLayer);
    this.physics.add.collider(this.player, backWallLayer);
    this.physics.add.collider(this.player, wallLayer_1);
    this.physics.add.collider(this.player, wallLayer_2);

    // this.physics.add.collider(this.player, backWallLayer);
    // this.physics.add.collider(this.player, wallLayer_1);
    // this.physics.add.collider(this.player, wallLayer_2);

    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);
  }

  update(time, delta): void {
    this.player.body.setVelocity(0);
    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-50);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(50);
    }
    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-50);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(50);
    }
    // this.player.body.velocity.normalize().scale(1);
  }
}
