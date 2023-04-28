export class MenuScene extends Phaser.Scene{
    
    
    constructor() {
        
        super({key : 'MenuScene'})
    }

    preload(): void {
        
        this.cameras.main.setBackgroundColor(0x75472d)

        this.load.image('crossaint', 'images/croissant.png')
       

    }

    create(): void {
        const SCENE_CENTER_X = this.cameras.main.centerX - (this.cameras.main.centerX/16)
        const SCENE_CENTER_Y = this.cameras.main.centerY +  (this.cameras.main.centerY/2)
        
        
        let crossaint = this.add.sprite(0,0, 'crossaint')
        
        if(crossaint){
        

            crossaint.setPosition( 
                SCENE_CENTER_X,
                SCENE_CENTER_Y,
                
                )
            crossaint.setScale(2)
        }

        this.tweens.add({
            targets: crossaint,
            angle: 360,
            duration: 5600,
            loop: -1
        })
        let text = this.add.text(
            0 , 
            0 ,
             'Press X to start',
             
             {
                fontFamily: 'Helvetica',
                fontSize: '30pt',
             } ,
             )

    
        text.setPosition( 
            (SCENE_CENTER_X - (SCENE_CENTER_X/3)),
            (SCENE_CENTER_Y - (SCENE_CENTER_Y/2))
        )



        // this.anims.create(
        //     {
        //         key: 'rot_crossaint',
        //         frameRate: 7,
        //         frames: this.anims.generateFrameNumbers()
        //     }
        // )

    }

}