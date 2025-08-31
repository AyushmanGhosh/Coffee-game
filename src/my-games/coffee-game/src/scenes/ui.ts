import { Tilemaps } from 'phaser';
import eventsCenter from '../interfaces/EventManager';

export class UiScene extends Phaser.Scene {
  private isInteracting: boolean = false;
  private uiKey: Phaser.Input.Keyboard.Key;
  private interactKey: Phaser.Input.Keyboard.Key;
  private debugKey: Phaser.Input.Keyboard.Key;
  private interactLayer: Phaser.Tilemaps.TilemapLayer;
  private guiLayer: Phaser.Tilemaps.TilemapLayer;
  private currentInteractObject: string;
  private dialogueContainer: Phaser.GameObjects.Container;
  private dialogueBg: Phaser.GameObjects.Rectangle;
  private dialogueText: Phaser.GameObjects.Text;

 private interactionHandlers: { [key: string]: () => void } = {
  coffee: () => {
    console.log('Interacting coffee boost');
    eventsCenter.emit('coffee-minigame');
  },
  npc: () => {
    console.log('Interacting with NPC');
    eventsCenter.emit('start-dialogue', 'npc1'); // example id
  },
 phone: () => {
    console.log('Interacting with phone...');
    eventsCenter.emit('show-dialogue', 'The phone screen flickers to life with a mysterious message.');
  }
  // Add more interaction types here
};

private interactions(intObj: any) {
  this.isInteracting = true;
  this.interactLayer.setVisible(true);

  // Hide interaction layer after 500ms if not interacting
  this.time.delayedCall(500, () => {
    if (!this.isInteracting) {
      this.interactLayer.setVisible(false);
    }
  });

  // Only trigger on actual interaction key press
  if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
    const handler = this.interactionHandlers[intObj];
    if (handler) {
      handler();
    } else {
      console.warn(`No interaction handler defined for: ${intObj}`);
    }
  }
}


  constructor() {
    super({ key: 'UiScene' });
  }

  preload(): void {
    this.load.image('guiImage', 'maps/GUI.png');
    this.load.tilemapTiledJSON('gui', 'maps/Ui.json');
  }

  create(): void {
    const gui = this.make.tilemap({ key: 'gui' });
    const main = gui.addTilesetImage('ui', 'guiImage');
    const interact = gui.addTilesetImage('ui', 'guiImage');
    const currentDialogueLines: string[] = [];
    const currentLineIndex: number = 0;
    const dialogueActive: boolean = false;


    this.interactLayer = gui.createLayer('interact', interact, 0);
    this.guiLayer = gui.createLayer('main', main, 0);

    this.uiKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.interactKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.X
    );
    this.debugKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D
    ); // DEBUG MODE

    if (this.guiLayer) {
      this.guiLayer
        .setPosition(0, 0)
        .setScale(800 / 80, 600 / 80)
        .setVisible(false);
    }
    if (this.interactLayer) {
      this.interactLayer
        .setPosition(0, 0)
        .setScale(800 / 80, 600 / 80)
        .setVisible(false);
    }

    // Create modular dialogue box (bottom half)
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const dialogueHeight = height / 4;
    this.dialogueBg = this.add
      .rectangle(
        width / 2,
        height - dialogueHeight / 2,
        width,
        dialogueHeight,
        0x222244,
        0.85
      )
      .setStrokeStyle(2, 0xffffff);

    this.dialogueText = this.add
      .text(width / 2, height - dialogueHeight / 2, '', {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#fff',
        wordWrap: { width: width - 40 }
      })
      .setOrigin(0.5);

    this.dialogueContainer = this.add.container(0, 0, [
      this.dialogueBg,
      this.dialogueText
    ]);
    this.dialogueContainer.setVisible(false);

    // Register object interaction events
    eventsCenter.on('object-interact', (x: string) => this.interactions(x));

    // Inside UI Scene's create() or init()
    eventsCenter.on('show-dialogue', (text: string) => {
      this.showDialogue(text);
    });
  }

  update(time: number, delta: number): void {
    // Example: Reset isInteracting if needed (e.g., based on player position or overlap end)
    // For now, we'll reset every frame for demonstration. Replace with your own logic.
    this.isInteracting = false;
    // Show GUI overlay
    this.guiLayer.setVisible(this.uiKey.isDown);

    // DEBUG — Press D to toggle test dialogue
    if (Phaser.Input.Keyboard.JustDown(this.debugKey)) {
      if (this.dialogueContainer.visible) {
        this.hideDialogue();
      } else {
        this.showDialogue(
          'This is a DEBUG test message.\nPress D again to hide.'
        );
      }
    }
  }

  /**
   * Show NPC dialogue in the dialogue box
   */
  public showDialogue(lines: string[] | string) {
  this.dialogueActive = true;
  this.currentLineIndex = 0;
  this.currentDialogueLines = Array.isArray(lines) ? lines : [lines];
  this.displayCurrentLine();
}

  /**
   * Hide the dialogue box
   */
  public hideDialogue() {
    this.dialogueContainer.setVisible(false);
  }
}
