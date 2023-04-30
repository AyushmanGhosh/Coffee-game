import { MainScene } from './scenes/main-scene';
import { MenuScene } from './scenes/menu';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Parcel-Boilerplate',
  url: 'https://github.com/digitsensitive/phaser3-typescript',
  version: '1.0',
  width: 800,
  height: 600,
  backgroundColor: 0x3a404d,
  type: Phaser.AUTO,
  parent: 'game',
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: [MenuScene, MainScene]
};
