export class UiScene extends Phaser.Scene {
  private uiKey: Phaser.Input.Keyboard.Key;
  private guiLayer: Phaser.Tilemaps.TilemapLayer;
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

    this.guiLayer = gui.createLayer('main', main, 0);

    this.uiKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

    if (this.guiLayer) {
      this.guiLayer.setPosition(SCENE_CENTER_X, 0);
      this.guiLayer.setScale(800 / 80, 600 / 80);
      this.guiLayer.setVisible(false);
    }

    // this.cameras.main.zoomTo(5, 0);
  }

  update(time, delta): void {
    if (this.uiKey.isDown) {
      this.guiLayer.setVisible(true);
    } else if (this.uiKey.isUp) {
      this.guiLayer.setVisible(false);
    }
  }
}
