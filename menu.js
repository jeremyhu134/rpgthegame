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
        this.load.spritesheet('wizard','heroimages/wizard.png',{frameWidth: 100,frameHeight:100});
        this.load.spritesheet('endTurn','heroimages/endTurn.png',{frameWidth: 100,frameHeight:50});
        this.load.image('hardenIcon','heroimages/hardenIcon.png');
        this.load.image('slashIcon','heroimages/slashIcon.png');
        this.load.image('sharpenIcon','heroimages/sharpenIcon.png');
        this.load.image('emptyIcon','heroimages/emptyIcon.png');
        this.load.image('healIcon','heroimages/healIcon.png');
        this.load.image('reviveIcon','heroimages/reviveIcon.png');
        this.load.image('drainIcon','heroimages/drainIcon.png');
        this.load.image('magicRayIcon','heroimages/magicRayIcon.png');
        this.load.image('selfDestructIcon','heroimages/selfDestructIcon.png');
        
        this.load.spritesheet('background','heroimages/background.png',{frameWidth: 1397,frameHeight:675});
    }
    
    create() {
        var scene = this;
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
            if(gameState.turn != "enemy"){
                gameState.moveIcon1.setTexture(`emptyIcon`);
                gameState.moveIcon2.setTexture(`emptyIcon`);
                gameState.moveIcon3.setTexture(`emptyIcon`);
                gameState.turn = "enemy";
                for(var i = 0; i < gameState.enemies.length; i++){
                    if(gameState.enemies[i]){
                        gameState.enemies[i].moved = 0;
                    }
                }
                if(gameState.turn == "enemy"){
                    scene.time.addEvent({
                        delay: 500,
                        callback: ()=>{
                            if(gameState.enemies[0] && gameState.enemies[0].moved == 0 && gameState.enemies[0].health > 0){
                                gameState.enemies[0].stats.computer(scene,gameState.enemies[0]);
                            }
                        },  
                        startAt: 0,
                        timeScale: 1
                    });
                    scene.time.addEvent({
                        delay: 1000,
                        callback: ()=>{
                            if(gameState.enemies[1] && gameState.enemies[1].moved == 0 && gameState.enemies[1].health > 0){
                                gameState.enemies[1].stats.computer(scene,gameState.enemies[1]);
                            }
                        },  
                        startAt: 0,
                        timeScale: 1
                    });
                    scene.time.addEvent({
                        delay: 1500,
                        callback: ()=>{
                            if(gameState.enemies[2] && gameState.enemies[2].moved == 0 && gameState.enemies[2].health > 0){
                                gameState.enemies[2].stats.computer(scene,gameState.enemies[2]);
                            }
                        },  
                        startAt: 0,
                        timeScale: 1
                    });
                    scene.time.addEvent({
                        delay: 2000,
                        callback: ()=>{
                            if(gameState.enemies[3] && gameState.enemies[3].moved == 0 && gameState.enemies[3].health > 0){
                                gameState.enemies[3].stats.computer(scene,gameState.enemies[3]);
                            } 
                        },  
                        startAt: 0,
                        timeScale: 1
                    });
                    scene.time.addEvent({
                        delay: 2500,
                        callback: ()=>{
                            gameState.turn = 'player';
                            gameState.attacking = false;
                            gameState.selectedHero = '';
                            gameState.selectedMove = '';
                            if(gameState.allies[0]){
                                gameState.allies[0].moved = 0;
                                gameState.allies[0].setTint(0xFFFFFF, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF);
                                if(gameState.allies[0].moves[0] && gameState.allies[0].move1Countdown > 0){
                                    gameState.allies[0].move1Countdown -= 1;
                                }
                                if(gameState.allies[0].moves[1] && gameState.allies[0].move2Countdown > 0){
                                    gameState.allies[0].move2Countdown -= 1;
                                }
                                if(gameState.allies[0].moves[2] && gameState.allies[0].move3Countdown > 0){
                                    gameState.allies[0].move3Countdown -= 1;
                                }
                            }if(gameState.allies[1]){
                                gameState.allies[1].moved = 0;
                                gameState.allies[1].setTint(0xFFFFFF, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF);
                                if(gameState.allies[1].moves[0] && gameState.allies[1].move1Countdown > 0){
                                    gameState.allies[1].move1Countdown -= 1;
                                }
                                if(gameState.allies[1].moves[1] && gameState.allies[1].move2Countdown > 0){
                                    gameState.allies[1].move2Countdown -= 1;
                                }
                                if(gameState.allies[1].moves[2] && gameState.allies[1].move3Countdown > 0){
                                    gameState.allies[1].move3Countdown -= 1;
                                }
                            }if(gameState.allies[2]){
                                gameState.allies[2].moved = 0;
                                gameState.allies[2].setTint(0xFFFFFF, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF);
                                if(gameState.allies[2].moves[0] && gameState.allies[2].move1Countdown > 0){
                                    gameState.allies[2].move1Countdown -= 1;
                                }
                                if(gameState.allies[2].moves[1] && gameState.allies[2].move2Countdown > 0){
                                    gameState.allies[2].move2Countdown -= 1;
                                }
                                if(gameState.allies[2].moves[2] && gameState.allies[2].move3Countdown > 0){
                                    gameState.allies[2].move3Countdown -= 1;
                                }
                            }if(gameState.allies[3]){
                                gameState.allies[3].moved = 0;
                                gameState.allies[3].setTint(0xFFFFFF, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF);
                                if(gameState.allies[3].moves[0] && gameState.allies[3].move1Countdown > 0){
                                    gameState.allies[3].move1Countdown -= 1;
                                }
                                if(gameState.allies[3].moves[1] && gameState.allies[3].move2Countdown > 0){
                                    gameState.allies[3].move2Countdown -= 1;
                                }
                                if(gameState.allies[3].moves[2] && gameState.allies[3].move3Countdown > 0){
                                    gameState.allies[3].move3Countdown -= 1;
                                }
                            }
                        },  
                        startAt: 0,
                        timeScale: 1
                    });
                }
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
        this.anims.create({
            key: 'wizardIdle',
            frameRate: 5,
            repeat: -1,
            frames:this.anims.generateFrameNames('wizard',{start: 0,end: 3})
        });
        this.anims.create({
            key: 'wizardDeath',
            frameRate: 10,
            repeat: -1,
            frames:this.anims.generateFrameNames('wizard',{start: 4,end: 6})
        });
        
        
        this.time.addEvent({
            delay: 1,
            callback: ()=>{
                if(gameState.turn == 'player'){
                    turnButton.setFrame(0);
                }else {
                    turnButton.setFrame(1);
                }
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        });
        
        
        
        gameState.barriers = this.physics.add.group();
        gameState.barriers.create(-600,0,'sidebarrier').setOrigin(0,0).setImmovable();
        
        
        
        
        gameState.moveIcon1 = this.add.sprite(540,550,'emptyIcon').setInteractive();
        gameState.moveIcon2 = this.add.sprite(600,550,'emptyIcon').setInteractive();
        gameState.moveIcon3 = this.add.sprite(660,550,'emptyIcon').setInteractive();
        gameState.moveIcon1.on('pointerdown', function(pointer){
            if(gameState.selectedHero.moved == 0){
                gameState.selectedMove = gameState.selectedHero.moves[0];
                gameState.selectedHero.move1Countdown = gameState.selectedHero.moves[0].countdown;
                if(gameState.selectedHero.moves[0].type == "self"){
                    gameState.selectedHero.moved = 1;
                    gameState.selectedHero.setTint(0x808080, 0x808080, 0x808080, 0x808080);
                    gameState.attacking = false;
                    gameState.selectedHero.moves[0].action(scene,gameState.selectedHero,null);
                    gameState.moveIcon1.setTexture(`emptyIcon`);
                    gameState.moveIcon2.setTexture(`emptyIcon`);
                    gameState.moveIcon3.setTexture(`emptyIcon`);
                }
                if(gameState.selectedHero.moves[0].type == "enemy"){
                    gameState.attacking = true;
                }
                if(gameState.selectedHero.moves[0].type == "ally"){
                    gameState.attacking = true;
                }
            }
        });
        gameState.moveIcon2.on('pointerdown', function(pointer){
            if(gameState.selectedHero.moved == 0){
                gameState.selectedMove = gameState.selectedHero.moves[1];
                gameState.selectedHero.move2Countdown = gameState.selectedHero.moves[1].countdown;
                if(gameState.selectedHero.moves[1].type == "self"){
                    gameState.selectedHero.moved = 1;
                    gameState.selectedHero.setTint(0x808080, 0x808080, 0x808080, 0x808080);
                    gameState.attacking = false;
                    gameState.selectedHero.moves[1].action(scene,gameState.selectedHero,null);
                    gameState.moveIcon1.setTexture(`emptyIcon`);
                    gameState.moveIcon2.setTexture(`emptyIcon`);
                    gameState.moveIcon3.setTexture(`emptyIcon`);
                }
                if(gameState.selectedHero.moves[1].type == "enemy"){
                    gameState.attacking = true;
                }
                if(gameState.selectedHero.moves[1].type == "ally"){
                    gameState.attacking = true;
                }
            }
        });
        gameState.moveIcon3.on('pointerdown', function(pointer){
            if(gameState.selectedHero.moved == 0){
                gameState.selectedMove = gameState.selectedHero.moves[2];
                gameState.selectedHero.move3Countdown = gameState.selectedHero.moves[2].countdown;
                if(gameState.selectedHero.moves[2].type == "self"){
                    gameState.selectedHero.moved = 1;
                    gameState.selectedHero.setTint(0x808080, 0x808080, 0x808080, 0x808080);
                    gameState.attacking = false;
                    gameState.selectedHero.moves[2].action(scene,gameState.selectedHero,null);
                    gameState.moveIcon1.setTexture(`emptyIcon`);
                    gameState.moveIcon2.setTexture(`emptyIcon`);
                    gameState.moveIcon3.setTexture(`emptyIcon`);
                }
                if(gameState.selectedHero.moves[2].type == "enemy"){
                    gameState.attacking = true;
                }
                if(gameState.selectedHero.moves[2].type == "ally"){
                    gameState.attacking = true;
                }
            }
        });
        
        
        
        
        gameState.createHero(this,gameState.soldierStats,'ally');
        gameState.createHero(this,gameState.mageStats,'ally');
        gameState.createHero(this,gameState.wizardStats,'ally');
        
        gameState.createHero(this,gameState.orcStats,'enemy');
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
