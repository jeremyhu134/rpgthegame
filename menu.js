class MenuScene extends Phaser.Scene {
    constructor() {
		super({ key: 'MenuScene' })
    }

    preload(){
        // map
        this.load.image('testmap','heroimages/mapbg.png');
        this.load.spritesheet('reaperwraith','heroimages/reaperwraith.png',{frameWidth: 50,frameHeight:50});
        this.load.spritesheet('soldier','heroimages/soldier.png',{frameWidth: 100,frameHeight:100});
        this.load.spritesheet('orc','heroimages/orc.png',{frameWidth: 100,frameHeight:100});
        this.load.spritesheet('mage','heroimages/mage.png',{frameWidth: 100,frameHeight:100});
        this.load.spritesheet('endTurn','heroimages/endTurn.png',{frameWidth: 100,frameHeight:50});
        this.load.image('hardenIcon','heroimages/hardenIcon.png');
        this.load.image('slashIcon','heroimages/slashIcon.png');
        this.load.image('emptyIcon','heroimages/emptyIcon.png');
        this.load.image('healIcon','heroimages/healIcon.png');
        
        this.load.spritesheet('background','heroimages/background.png',{frameWidth: 1397,frameHeight:675});
    }
    
    create() {
        //anims
        /*this.anims.create({
            key: 'tracerrecallone',
            frameRate: 20,
            frames:this.anims.generateFrameNames('tracerrecall',{start: 0,end: 10})
        });*/
        gameState.input = this.input;
        gameState.mouse = this.input.mousePointer;
        //disables right click menu
        //this.input.mouse.disableContextMenu();
        //assigns cursors to track mouse
        gameState.cursors = this.input.keyboard.createCursorKeys();
        //assigns instances for the keys listed
        gameState.keys = this.input.keyboard.addKeys('W,S,A,D,R,SPACE,SHIFT,ONE,TWO,THREE,FOUR,FIVE,SIX,SEVEN,EIGHT,ESC');
        
        
        var bg = this.physics.add.sprite(0,0,'background').setOrigin(0,0).setScale(window.innerHeight/675).setDepth(0);
        this.anims.create({
            key: 'bganimate',
            frameRate: 3,
            repeat: -1,
            frames:this.anims.generateFrameNames('background',{start: 0,end: 2})
        });
        bg.anims.play('bganimate','true');
        
        var turnButton = this.add.sprite(600,620,'endTurn').setInteractive();
        turnButton.on('pointerdown', function(pointer){
            gameState.turn = "enemy";
            for(var i = 0; i < gameState.enemies.length; i++){
                console.log(true);
                if(gameState.enemies[i]){
                    
                    gameState.enemies[i].moved = 0;
                }
            }
            if(gameState.turn == "enemy"){
                
            }
        });
        
        this.anims.create({
            key: 'soldierIdle',
            frameRate: 5,
            repeat: -1,
            frames:this.anims.generateFrameNames('soldier',{start: 0,end: 3})
        });
        this.anims.create({
            key: 'soldierDeath',
            frameRate: 10,
            repeat: -1,
            frames:this.anims.generateFrameNames('soldier',{start: 4,end: 6})
        });
        this.anims.create({
            key: 'orcIdle',
            frameRate: 5,
            repeat: -1,
            frames:this.anims.generateFrameNames('orc',{start: 0,end: 3})
        });
        this.anims.create({
            key: 'orcDeath',
            frameRate: 10,
            repeat: -1,
            frames:this.anims.generateFrameNames('orc',{start: 4,end: 6})
        });
        this.anims.create({
            key: 'mageIdle',
            frameRate: 5,
            repeat: -1,
            frames:this.anims.generateFrameNames('mage',{start: 0,end: 3})
        });
        this.anims.create({
            key: 'mageDeath',
            frameRate: 10,
            repeat: -1,
            frames:this.anims.generateFrameNames('mage',{start: 4,end: 6})
        });
        
        
        this.time.addEvent({
            delay: 1,
            callback: ()=>{
                if(gameState.turn == 'player'){
                    turnButton.setFrame(0);
                }else {
                    turnButton.setFrame(1);
                    if(gameState.enemies[0] && gameState.enemies[0].moved == 0 && gameState.enemies[0].health > 0){
                        gameState.enemies[0].stats.computer(this,gameState.enemies[0]);
                    }if(gameState.enemies[1] && gameState.enemies[1].moved == 0 && gameState.enemies[1].health > 0){
                        gameState.enemies[1].stats.computer(this,gameState.enemies[1]);
                    }if(gameState.enemies[2] && gameState.enemies[2].moved == 0 && gameState.enemies[2].health > 0){
                        gameState.enemies[2].stats.computer(this,gameState.enemies[2]);
                    }if(gameState.enemies[3] && gameState.enemies[3].moved == 0 && gameState.enemies[3].health > 0){
                        gameState.enemies[3].stats.computer(this,gameState.enemies[3]);
                    }
                    this.time.addEvent({
                        delay: 500,
                        callback: ()=>{
                            gameState.turn = 'player';
                            if(gameState.allies[0]){
                                gameState.allies[0].moved = 0;
                            }if(gameState.allies[1]){
                                gameState.allies[1].moved = 0;
                            }if(gameState.allies[2]){
                                gameState.allies[2].moved = 0;
                            }if(gameState.allies[3]){
                                gameState.allies[3].moved = 0;
                            }
                        },  
                        startAt: 0,
                        timeScale: 1
                    });
                }
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        });
        
        
        
        gameState.barriers = this.physics.add.group();
        gameState.barriers.create(-600,0,'sidebarrier').setOrigin(0,0).setImmovable();
        
        
        gameState.createHero(this,gameState.soldierStats,'ally');
        gameState.createHero(this,gameState.mageStats,'ally');
        
        gameState.moveIcon1 = this.add.sprite(540,550,'emptyIcon').setInteractive();
        gameState.moveIcon2 = this.add.sprite(600,550,'emptyIcon').setInteractive();
        gameState.moveIcon3 = this.add.sprite(660,550,'emptyIcon').setInteractive();
        
        gameState.createHero(this,gameState.orcStats,'enemy');
        gameState.createHero(this,gameState.orcStats,'enemy');
        gameState.createHero(this,gameState.orcStats,'enemy');
        
        gameState.createSlots(this);
        
        
        
        
        /*
        gameState.Sbutton.on('pointerout', function(pointer){
            gameState.Sbutton.setFrame(0);
        });*/
        
        
    }
    update() {
        
    }
}









class SkirmishScene extends Phaser.Scene {
    constructor() {
		super({ key: 'SkirmishScene' })
	}
    preload(){
        
    }
    create() {
        
    }
    upload() {
        
    }
}








class GameScene extends Phaser.Scene {
    constructor() {
		super({ key: 'GameScene' })
	}
    preload(){
        
    }
    create(){
        
    }
    update(){
        
    }
}
