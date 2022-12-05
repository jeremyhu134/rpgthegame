const config = {
    type: Phaser.AUTO,
    width : 1200,
    height: 650,
    backgroundColor: "#C0C0C0",
    audio: {
        disableWebAudio: true
      },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0},
            enableBody: true
            //debug: true
        }
    },
    scene:[MenuScene, SkirmishScene],
    scale: {
        zoom: 1
    }
};

const game = new Phaser.Game(config);
let gameState = {
    
    turn: "player",
    selectedHero: null,
    selectedMove: null,
    attacking: false,
    allies:[],
    enemies:[],
    
    
    
    createHero: function(scene,stats,status,ai,aicode){
        var character = scene.physics.add.sprite(0,0,`${stats.sprite}`).setScale(1).setInteractive();
        
        character.sprite = stats.sprite;
        character.health = stats.health;
        character.defense = stats.defense;
        character.level = stats.level;
        character.moved = 0;
        character.moves = stats.moves.splice();
        character.stats = stats;
        function create(hero){
            gameState.createHealthBar(scene,hero,stats.health);
            stats.integrateMoves(hero);
            if(status == 'ally'){
                gameState.allies.push(hero);
            }else if(status == 'enemy'){``
                gameState.enemies.push(hero);
            }
            hero.anims.play(`${hero.sprite}Idle`,true);
            hero.on('pointerdown', function(pointer){
                if(status == 'ally' && hero.moved == 0 && gameState.attacking == false && gameState.turn == 'player' && hero.health > 0){
                    gameState.moveIcon1.setTexture(`emptyIcon`);
                    gameState.moveIcon2.setTexture(`emptyIcon`);
                    gameState.moveIcon3.setTexture(`emptyIcon`);
                    gameState.selectedHero = hero;
                    if(hero.moves[0]){
                        gameState.moveIcon1.setTexture(`${hero.moves[0].sprite}Icon`);
                        gameState.createMove(scene,hero.moves[0],gameState.moveIcon1,hero);
                    }if(hero.moves[1]){
                        gameState.moveIcon2.setTexture(`${hero.moves[1].sprite}Icon`);
                        gameState.createMove(scene,hero.moves[1],gameState.moveIcon2,hero);
                    }if(hero.moves[2]){
                        gameState.moveIcon3.setTexture(`${hero.moves[2].sprite}Icon`);
                        gameState.createMove(scene,hero.moves[2],gameState.moveIcon3,hero);
                    }
                }else if(status == 'enemy' && gameState.attacking == true){
                    gameState.attacking = false;
                    gameState.selectedMove.action(scene,gameState.selectedHero,hero);
                    gameState.selectedHero.moved = 1;
                    gameState.moveIcon1.setTexture(`emptyIcon`);
                    gameState.moveIcon2.setTexture(`emptyIcon`);
                    gameState.moveIcon3.setTexture(`emptyIcon`);
                }else if(status == 'ally' && gameState.attacking == true){
                    gameState.attacking = false;
                    gameState.selectedMove.action(scene,gameState.selectedHero,hero);
                    gameState.selectedHero.moved = 1;
                    gameState.moveIcon1.setTexture(`emptyIcon`);
                    gameState.moveIcon2.setTexture(`emptyIcon`);
                    gameState.moveIcon3.setTexture(`emptyIcon`);
                }
            });
        }
        create(character);
    },
    
    createMove: function(scene,move,icon,hero){
        var moveButton = icon.on('pointerdown', function(pointer){
            if(hero.moved == 0){
                gameState.selectedMove = move;
                if(move.type === "self"){
                    hero.moved = 1;
                    gameState.attacking = false;
                    move.action(scene,hero,null);
                    gameState.moveIcon1.setTexture(`emptyIcon`);
                    gameState.moveIcon2.setTexture(`emptyIcon`);
                    gameState.moveIcon3.setTexture(`emptyIcon`);
                }
                if(move.type === "enemy"){
                    gameState.attacking = true;
                }
            }
        });
    },
    
    slotsCoord: {
        ally:{
            slot1:{
                x: 175,
                y: 200
            },
            slot2:{
                x: 225,
                y: 325
            },
            slot3:{
                x: 175,
                y: 450
            },
            slot4:{
                x: 100,
                y: 325
            }
        },
        enemy:{
            slot1:{
                x: 1200-175,
                y: 200
            },
            slot2:{
                x: 1200-225,
                y: 325
            },
            slot3:{
                x: 1200-175,
                y: 450
            },
            slot4:{
                x: 1200-100,
                y: 325
            }
        }
    },
    createSlots: function(scene){
        if(gameState.allies[0]){
            gameState.allies[0].x = gameState.slotsCoord.ally.slot1.x;
            gameState.allies[0].y = gameState.slotsCoord.ally.slot1.y;
        }if(gameState.allies[1]){
            gameState.allies[1].x = gameState.slotsCoord.ally.slot2.x;
            gameState.allies[1].y = gameState.slotsCoord.ally.slot2.y;
        }if(gameState.allies[2]){
            gameState.allies[2].x = gameState.slotsCoord.ally.slot3.x;
            gameState.allies[2].y = gameState.slotsCoord.ally.slot3.y;
        }if(gameState.allies[3]){
            gameState.allies[3].x = gameState.slotsCoord.ally.slot4.x;
            gameState.allies[3].y = gameState.slotsCoord.ally.slot4.y;
        }if(gameState.enemies[0]){
            gameState.enemies[0].flipX = true;
            gameState.enemies[0].x = gameState.slotsCoord.enemy.slot1.x;
            gameState.enemies[0].y = gameState.slotsCoord.enemy.slot1.y;
        }if(gameState.enemies[1]){
            gameState.enemies[1].flipX = true;
            gameState.enemies[1].x = gameState.slotsCoord.enemy.slot2.x;
            gameState.enemies[1].y = gameState.slotsCoord.enemy.slot2.y;
        }if(gameState.enemies[2]){
            gameState.enemies[2].flipX = true;
            gameState.enemies[2].x = gameState.slotsCoord.enemy.slot3.x;
            gameState.enemies[2].y = gameState.slotsCoord.enemy.slot3.y;
        }if(gameState.enemies[3]){
            gameState.enemies[3].flipX = true;
            gameState.enemies[3].x = gameState.slotsCoord.enemy.slot4.x;
            gameState.enemies[3].y = gameState.slotsCoord.enemy.slot4.y;
        }
    },
    
    moves:{
        slash:{
            name: "Slash",
            sprite: 'slash',
            description: "Basic sword attack",
            type: 'enemy',
            damage:{
                high: 8,
                low: 5
            },
            action: function(scene,user,target){
                var rand = (Math.ceil(Math.random()*(gameState.moves.bash.damage.high-gameState.moves.bash.damage.low))+gameState.moves.bash.damage.low)-target.defense;
                if(rand < 0){
                    rand = 0;
                }
                target.health -= rand;
            }
        },
        harden:{
            name: "Harden",
            sprite: 'harden',
            description: "Increases Defense",
            type: 'self',
            action: function(scene,user,target){
                user.defense += 1;
            }
        },
        heal:{
            name: "Heal",
            sprite: 'heal',
            description: "Heals hero or an ally",
            type: 'ally',
            action: function(scene,user,target){
                target.health += 10;
            }
        },
        bash:{
            name: "Bash",
            sprite: 'bash',
            description: "Basic smash attack",
            type: 'enemy',
            damage:{
                high: 9,
                low: 3
            },
            action: function(scene,user,target){
                var rand = (Math.ceil(Math.random()*(gameState.moves.bash.damage.high-gameState.moves.bash.damage.low))+gameState.moves.bash.damage.low)-target.defense;
                if(rand < 0){
                    rand = 0;
                }
                target.health -= rand;
            }
        }
    },
    
    soldierStats:{
        sprite: 'soldier',
        health: 40,
        defense: 1,
        level: 1,
        moves:[],
        integrateMoves: function(hero){
            hero.moves.push(gameState.moves.slash);
            hero.moves.push(gameState.moves.harden);
        },
        computer: function(scene,hero){
            
        }
    },
    mageStats:{
        sprite: 'mage',
        health: 30,
        defense: 2,
        level: 1,
        moves:[],
        integrateMoves: function(hero){
            hero.moves.push(gameState.moves.heal);
        },
        computer: function(scene,hero){
            
        }
    },
    
    
    orcStats:{
        sprite: 'orc',
        health: 35,
        defense: 0,
        level: 1,
        moves:[],
        integrateMoves: function(hero){
            hero.moves.push(gameState.moves.bash);
        },
        computer: function(scene,hero){
            var rand;
            var found = false;
            while(found == false){
                rand = Math.ceil(Math.random()*gameState.allies.length)-1;
                if(gameState.allies[rand]){
                    found = true;
                }
            }
            hero.moves[0].action(scene,hero,gameState.allies[rand]);
            hero.moved = 1;
        }
    },
    
    
    createHealthBar: function(scene, object,maxHP){
        var hbBG = scene.add.rectangle(object.x,(object.y-object.body.height/2)-20,100,10,0xff0000).setScale(object.body.width/100).setDepth(window.innerHeight);  
        var hb = scene.add.rectangle(object.x,(object.y-object.body.height/2)-20,100,10,0x2ecc71).setScale(object.body.width/100).setDepth(window.innerHeight);
        var checkHealth = scene.time.addEvent({
            delay: 1,
            callback: ()=>{
                if(object.health > maxHP){
                    object.health = maxHP;
                }
                if(object.health > 0){
                    hbBG.x = object.x;
                    hbBG.y = (object.y-object.body.height/2)-10;
                    hb.x = object.x;
                    hb.y = (object.y-object.body.height/2)-10;
                    hb.width = object.health/maxHP*100;
                } else {
                    hbBG.destroy();
                    hb.destroy();
                    checkHealth.destroy();
                    object.anims.play(`${object.sprite}Death`);
                }
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        });
    },
    
    
    
    
    heroControls: function(scene){
        gameState.hero.body.checkWorldBounds();

        if(gameState.keys.D.isDown && gameState.keys.W.isDown){
            gameState.hero.setVelocityX(100);
            gameState.hero.setVelocityY(-100);
            gameState.hero.flipX = false;
        }
        else if(gameState.keys.A.isDown && gameState.keys.W.isDown){
            gameState.hero.setVelocityX(-100);
            gameState.hero.setVelocityY(-100);
            gameState.hero.flipX = true;
        }
        else if(gameState.keys.W.isDown){
            gameState.hero.setVelocityX(0);
            gameState.hero.setVelocityY(-100);
        }
        else if(gameState.keys.A.isDown){
            gameState.hero.setVelocityX(-100);
            gameState.hero.flipX = true;
        }
        else if(gameState.keys.D.isDown){
            gameState.hero.flipX = false;
            gameState.hero.setVelocityX(100);
        }
        else {
            gameState.hero.setVelocityX(0);
        }
        
        
        
        if(!gameState.keys.SPACE.isDown && !gameState.keys.W.isDown && !gameState.keys.A.isDown && !gameState.keys.D.isDown){
            gameState.hero.anims.play(`marineIdle`,true);
        }else if(gameState.keys.W.isDown && gameState.keys.A.isDown && gameState.keys.SPACE.isDown || gameState.keys.W.isDown && gameState.keys.D.isDown && gameState.keys.SPACE.isDown){
            gameState.hero.anims.play(`marineWalkShoot`,true);
        }else if(gameState.keys.W.isDown && gameState.keys.SPACE.isDown){
            gameState.hero.anims.play(`marineFlyShoot`,true);
        }else if(gameState.keys.SPACE.isDown){
            gameState.hero.anims.play(`marineShoot`,true);
        }else if(gameState.keys.W.isDown){
            gameState.hero.anims.play(`marineFly`,true);
        }else if(gameState.keys.A.isDown || gameState.keys.D.isDown){
            gameState.hero.anims.play(`marineWalk`,true);
        }
    },
    
    archer: {
        sprite: 'archerdefault',
        health: 150,
        damage: 20,
        speed: 150,
        ammo: -1,//infinite
        realoadspeed: 1550,
        attackspeed : 1000,
        primaryAbilityCooldown : 15000,
        secondaryAbilityCooldown : 6000,
        runBehavior: function (scene){
            
            var bLoop = scene.time.addEvent({
                delay: gameState.soldier76.attackspeed,
                callback: ()=>{
                    
                },  
                startAt: 0,
                timeScale: -1
            });
        },
        primaryAttack: function(scene,hero,health,damage,speed,ammo,attackspeed){
            gameState.readyShoot = false;
            var selected = gameState.bullets.create(hero.x,hero.y,'soldier76bullet');
            gameState.angle=Phaser.Math.Angle.Between(selected.x,selected.y,gameState.trueinputx,gameState.trueinputy);
            selected.setRotation(gameState.angle); 
            scene.physics.moveTo(selected,gameState.trueinputx, gameState.trueinputy,1000);
            scene.time.addEvent({
                delay: gameState.soldier76.attackspeed,
                callback: ()=>{
                    gameState.readyShoot = true;
                },  
                startAt: 0,
                timeScale: 1
            });
        },
        primaryAbility : function(scene,hero,health,damage,speed,ammo,primaryAbilityCooldown){
            gameState.readyShoot1 = false;
            scene.time.addEvent({
                delay: 100,
                callback: ()=>{
                    if(health > 0){
                        health += 4;
                    }
                },  
                startAt: 0,
                timeScale: 1,
                repeat: 50
            }); 
            scene.time.addEvent({
                delay: gameState.soldier76.primaryAbilityCooldown,
                callback: ()=>{
                    gameState.readyShoot1 = true;
                },  
                startAt: 0,
                timeScale: 1
            });
        },
       secondaryAbility : function(scene,hero,health,damage,speed,ammo,secondAbilityCooldown){
            gameState.readyShoot2 = false;
            var selected = gameState.bullets.create(hero.x,hero.y,'soldier76rockets');
            gameState.angle=Phaser.Math.Angle.Between(selected.x,selected.y,gameState.trueinputx,gameState.trueinputy);
            selected.setRotation(gameState.angle); 
            scene.physics.moveTo(selected,gameState.trueinputx, gameState.trueinputy,600);
            scene.time.addEvent({
                delay: gameState.soldier76.secondaryAbilityCooldown,
                callback: ()=>{
                    gameState.readyShoot2 = true;
                },  
                startAt: 0,
                timeScale: 1
            });
        },
    },
}