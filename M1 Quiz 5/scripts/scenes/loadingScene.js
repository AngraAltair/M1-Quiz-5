class LoadingScene extends Phaser.Scene {
    constructor() {
        super("LoadingScene");
    }

    preload() {
        // Images
        this.load.image('enemy', 'assets/images/Enemy.png');
        this.load.image('rohan', 'assets/images/Rohan.png');
        this.load.image('bgg', 'assets/images/BackgroundGame.jpg');
        this.load.image('bgmm', 'assets/images/BackgroundMainMenu.jpg');
        this.load.image('obstaclesDestroyable', 'assets/images/obstaclesDestroyable.png');
        this.load.image('obstacle', 'assets/images/Obstacle.png');
        this.load.image('projectile', 'assets/images/Projectile.png');

        // Audio
        this.load.audio('mainmenu_music', 'assets/music/mitekurEPLX.mp3');
        this.load.audio('game_music', 'assets/music/DaraxFLOriginal.mp3');
        this.load.audio('lose_music', 'assets/music/gogoDarken.mp3');

        //I gave up with the sfx, theybreak the scene changing
        //this.load.audio('shoot_fx', 'assets/sounds/laser.mp3');
        //this.load.audio('hit_destroyable_fx', 'assets/sounds/hit_destroyable.wav');
        //this.load.audio('hit_enemy_fx', 'assets/sounds/hit_enemy.wav');
        //this.load.audio('player_hit_fx', 'assets/sounds/player_hit.wav');
    }

    create() {
        this.scene.start("MenuScene");
    }
}
