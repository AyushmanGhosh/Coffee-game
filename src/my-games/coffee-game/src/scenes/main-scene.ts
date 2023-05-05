import eventsCenter from '../interfaces/EventManager';
export class MainScene extends Phaser.Scene {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private interactables: Phaser.GameObjects.GameObject[];
  private zone;

  private interactions() {
    console.log('triggered');
    eventsCenter.emit('hover-emit');

    // if (x.name === 'coffee') {
    //   console.log('intersected');
    // }
  }

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    //Set camera options
    this.cameras.main.setBackgroundColor(0x000000);
    //Load all relevant spritesheets
    this.load.spritesheet(
      'player_idle',
      'images/character_sprites/Blue_witch/B_witch_idle.png',
      {
        frameWidth: 32,
        frameHeight: 48
      }
    );

    this.load.spritesheet(
      'player_run',
      '/images/character_sprites/Blue_witch/B_witch_run.png',
      {
        frameWidth: 32,
        frameHeight: 48
      }
    );
    /*
    Load images and general tilesets



    */
    this.load.image('doors_windows', 'maps/TopDownHouse_DoorsAndWindows.png');
    this.load.image('floor_walls', 'maps/TopDownHouse_FloorsAndWalls.png');
    this.load.image('furniture_1', 'maps/TopDownHouse_FurnitureState1.png');

    this.load.image('furniture_2', 'maps/TopDownHouse_FurnitureState2.png');
    this.load.image('smallObjects', 'maps/TopDownHouse_SmallItems.png');
    this.load.tilemapTiledJSON('map', 'maps/Cafe_main_floor.json');
  }

  create(): void {
    const map = this.make.tilemap({ key: 'map' });
    const SCENE_CENTER_X =
      this.cameras.main.centerX - this.cameras.main.centerX;
    const SCENE_CENTER_Y =
      this.cameras.main.centerY + this.cameras.main.centerY;
    const spawnPoint = map.findObject(
      'spawnPoint',
      (obj) => obj.name === 'spawnPointPlayer'
    );

    // let temp = map.getObjectLayer('interactables');

    // let temp2 = this.physics.overlap();
    // console.log(temp);

    /* 
    Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    Phaser's cache (i.e. the name you used in preload)


    */

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
    /*
    // Parameters: layer name (or index) from Tiled, tileset, x, y
    

    */

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
    this.interactables = map.createFromObjects('interactables', {});
    let temp;
    // temp = this.interactables.forEach((obj) =>
    //   console.log((obj.visible = true), obj)
    // );
    // this.interactables.forEach((obj) =>
    //   obj.setInteractive({}, this.interactions)
    // );
    // this.interactables.forEach((obj) => (obj.on('')));

    // console.log(temp);

    furnitureLayer.setCollisionByExclusion([-1]);
    backWallLayer.setCollisionByExclusion([-1]);
    wallLayer_1.setCollisionByExclusion([-1]);
    wallLayer_2.setCollisionByExclusion([-1]);
    // console.log(temp);

    // Graphics Collision debug mode
    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // furnitureLayer.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // });

    //Player Character controls

    this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'player');
    this.player.body.onOverlap = true;

    let test;
    this.interactables.forEach((x) =>
      this.physics.add.overlap(x, this.player, this.interactions)
    );
    this.interactables.forEach((obj) => obj.setInteractive());

    this.test = this.interactables.forEach((obj) =>
      obj.on('hover-emit', () => {
        console.log('Hovered over');
        // eventsCenter.emit('hover-emit');
      })
    );

    this.interactables.forEach((obj) => obj.update());
    // console.log(this.test);

    this.physics.world.on('overlap', () => {
      console.log('overlap detected');
    });

    // ZONE TESTING
    // this.zone = this.add.zone(300, 200, 200, 200);
    this.interactables.forEach((obj) => {
      this.physics.add.existing(obj, true);
      this.physics.add.overlap(obj, this.player, (zone, pc) => {
        pc.setScale(0.5);
      });
      obj.visible = false;
    });
    // this.physics.add.existing(this.zone, false);

    // this.physics.add.overlap(this.zone, this.player, (zone, pc) => {
    //   pc.setScale(3);
    // });

    // this.zone.body.moves = false;
    // Input and player physcis
    this.cursors = this.input.keyboard.createCursorKeys();

    // Player Animations

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNames('player_idle', {
        start: 0,
        end: 5
      }),
      frameRate: 8,
      repeat: -1
    });
    // this.player.play('idle')
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNames('player_run', {
        start: 0,
        end: 7
      }),
      frameRate: 8,
      repeat: -1
    });
    /*
    //Camera settings


    */
    this.cameras.main.zoomTo(800 / 240, 600 / 240);

    this.cameras.main.setBounds(
      0,
      0,
      map.widthInPixels,
      map.heightInPixels,
      true
    );
    this.cameras.main.centerOn(SCENE_CENTER_X, SCENE_CENTER_Y);

    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;
    this.player.setScale(0.8);
    this.player.setCircle(
      5,
      // this.player.width / 8,
      this.player.height / 2 - this.player.width / 6,
      this.player.height - this.player.height / 4
    );

    //Add Collisions
    this.physics.add.collider(this.player, furnitureLayer);
    this.physics.add.collider(this.player, backWallLayer);
    this.physics.add.collider(this.player, wallLayer_1);
    this.physics.add.collider(this.player, wallLayer_2);

    // this.physics.add.collider(this.interactables, this.player);
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);
  }

  update(time, delta): void {
    // this.physics.world.on('overlap', this.interactions);
    this.player.body.setVelocity(0);
    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.setFlipX(true);

      this.player.body.setVelocityX(-50);
      this.player.play('run', true);
    } else if (this.cursors.right.isDown) {
      this.player.setFlipX(false);

      this.player.body.setVelocityX(50);
      this.player.play('run', true);
    }
    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-50);
      this.player.play('run', true);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(50);
      this.player.play('run', true);
    }
    if (!this.player.body.touching.none) {
      console.log('touchingg!');
    }
    if (
      this.cursors.up.isUp &&
      this.cursors.down.isUp &&
      this.cursors.right.isUp &&
      this.cursors.left.isUp
    ) {
      this.player.play('idle', true);
    }

    this.interactables.forEach((obj) =>
      obj.on('hover-emit', () => {
        console.log('Hoveered over');
        // eventsCenter.emit('hover-emit');
      })
    );
    // this.physics.world.on('overlap', this.interactions);
    // if (this.cursors.left.isDown) {
    //   this.player.setFlipX(false);
    //   this.player.setVelocityX(-160);
    //   this.player.anims.play('walk', true);
    // } else if (this.cursors.right.isDown) {
    //   this.player.setFlipX(true);
    //   this.player.setVelocityX(160);
    //   this.player.anims.play('walk', true);
    // } else {
    //   this.player.setVelocityX(0);
    //   this.player.anims.play('turn');
    // }
    // this.player.body.velocity.normalize().scale(1);
  }
}
