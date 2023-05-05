import { Tilemaps } from 'phaser';
import eventsCenter from '../interfaces/EventManager';

export class UiScene extends Phaser.Scene {
  private uiKey: Phaser.Input.Keyboard.Key;
  private interactKey: Phaser.Input.Keyboard.Key;
  private interactLayer: Phaser.Tilemaps.TilemapLayer;
  private guiLayer: Phaser.Tilemaps.TilemapLayer;
  private currentInteractObject: string;

  private interactions(intObj) {
    // console.log('Caught data', intObj);
    this.interactLayer.setVisible(true);

    if (this.interactKey.isDown && intObj === 'coffee') {
      console.log('interact with', intObj);
    }
  }

  constructor() {
    super({
      key: 'UiScene'
    });
  }
  preload(): void {
    this.load.image('guiImage', 'maps/GUI.png');
    this.load.tilemapTiledJSON('gui', 'maps/Ui.json');
  }

  create(): void {
    const SCENE_CENTER_X =
      this.cameras.main.centerX - this.cameras.main.centerX;
    const SCENE_CENTER_Y =
      this.cameras.main.centerY + this.cameras.main.centerY;
    const gui = this.make.tilemap({ key: 'gui' });

    const main = gui.addTilesetImage('ui', 'guiImage');
    const interact = gui.addTilesetImage('ui', 'guiImage');
    this.interactLayer = gui.createLayer('interact', interact, 0);
    this.guiLayer = gui.createLayer('main', main, 0);

    this.uiKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.interactKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.X
    );

    if (this.guiLayer) {
      this.guiLayer.setPosition(0, 0);
      this.guiLayer.setScale(800 / 80, 600 / 80);
      this.guiLayer.setVisible(false);
    }
    if (this.interactLayer) {
      this.interactLayer.setPosition(0, 0);
      this.interactLayer.setScale(800 / 80, 600 / 80);
      this.interactLayer.setVisible(false);
    }

    // this.cameras.main.zoomTo(5, 0);
    // console.log(eventsCenter.listenerCount('object-interact'));
  }

  update(time, delta): void {
    if (this.uiKey.isDown) {
      this.guiLayer.setVisible(true);
    } else if (this.uiKey.isUp) {
      this.guiLayer.setVisible(false);
    }
    eventsCenter.on('object-interact', (x) => this.interactions(x));

    this.interactLayer.setVisible(true)
      ? this.interactLayer.setVisible(false)
      : this.interactLayer.setVisible(true);

    // if (this.interactKey.isDown) {
    //   console.log(this.interactKey, 'interact key triggerred');
    // }
  }
}
