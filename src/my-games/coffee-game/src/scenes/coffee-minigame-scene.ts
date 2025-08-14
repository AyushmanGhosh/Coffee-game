import * as Phaser from 'phaser';

export const COFFEE_MINIGAME_SCENE_KEY = 'CoffeeMinigameScene';

export class CoffeeMinigameScene extends Phaser.Scene {
  static sceneKey = COFFEE_MINIGAME_SCENE_KEY;
  constructor() {
    super(COFFEE_MINIGAME_SCENE_KEY);
  }

  preload(): void {
    // Load assets for the minigame here (stub)
  }

  create(): void {
    // Add a background color
    (this.cameras.main as Phaser.Cameras.Scene2D.Camera).setBackgroundColor(
      0x3e2723
    ); // Coffee brown

    // Add placeholder text
    this.add.text(100, 100, 'Coffee Minigame!', {
      fontFamily: 'Arial',
      fontSize: '32px',
      color: '#fff',
      backgroundColor: '#6d4c41',
      padding: { x: 10, y: 10 }
    });

    // Add a button to return to MainScene
    const btn = this.add
      .text(100, 200, 'Return to Main Game', {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#fff',
        backgroundColor: '#8d6e63',
        padding: { x: 8, y: 8 }
      })
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        // Optionally, you could emit an event or set a flag for more complex state handling
        this.scene.start('MainScene');
      });
  }

  update(): void {
    // Minigame logic goes here (stub)
  }
}
