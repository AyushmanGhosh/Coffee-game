export class MenuScene extends Phaser.Scene {
  private startKey: Phaser.Input.Keyboard.Key;

  constructor() {
    super({ key: 'MenuScene' });
  }
  init(): void {
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.X
    );
  }
  preload(): void {
    this.cameras.main.setBackgroundColor(0x75472d);

    this.load.image('crossaint', 'images/croissant.png');
    this.load.audio(
      'menu_theme',
      'audio/Darren Curtis Music - Royalty Free 2018/Darren Curtis Music - Haven of the Faeries/Haven of the Faeries MP3.mp3'
    );
  }

  create(): void {
    const SCENE_CENTER_X =
      this.cameras.main.centerX - this.cameras.main.centerX / 16;
    const SCENE_CENTER_Y =
      this.cameras.main.centerY + this.cameras.main.centerY / 2;

    let crossaint = this.add.sprite(0, 0, 'crossaint');
    //Logo/ moving Tween
    if (crossaint) {
      crossaint.setPosition(SCENE_CENTER_X, SCENE_CENTER_Y);
      crossaint.setScale(2);
    }

    this.tweens.add({
      targets: crossaint,
      angle: 360,
      duration: 5600,
      loop: -1
    });

    //Start Text
    let text = this.add.text(
      0,
      0,
      'Press X to start',

      {
        fontFamily: 'Helvetica',
        fontSize: '30pt'
      }
    );

    text.setPosition(
      SCENE_CENTER_X - SCENE_CENTER_X / 3,
      SCENE_CENTER_Y - SCENE_CENTER_Y / 2
    );

    //Music Setup
    let music = this.sound.add('menu_theme', {
      volume: 0.2,
      loop: true
    });

    if (!this.sound.locked) {
      // already unlocked so play
      music.play();
    } else {
      // wait for 'unlocked' to fire and then play
      this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
        music.play();
      });
    }

    //Scene swap
  }

  update(): void {
    if (this.startKey.isDown) {
      this.scene.start('MainScene');
      this.scene.start('UiScene');
    }
  }
}
