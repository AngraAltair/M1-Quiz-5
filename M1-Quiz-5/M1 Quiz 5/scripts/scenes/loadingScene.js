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
        this.load.image('obstacle', 'assets/images/Obstacle.png');
        this.load.image('obstaclesDestroyable', 'assets/images/obstaclesDestroyable.png');
        this.load.image('projectile', 'assets/images/Projectile.png');

        // Audio
        this.load.audio('game_music', 'assets/music/DaraxFLOriginal.mp3');

        // FX
        this.load.audio('shoot_fx', 'assets/sounds/laser.mp3');
        this.load.audio('hit_destroyable_fx', 'assets/sounds/crate.mp3');
        this.load.audio('hit_enemy_fx', 'assets/sounds/movie_1.mp3');
        this.load.audio('player_hit_fx', 'assets/sounds/oof.mp3');
    }

    create() {
        game_music= this.game_music = this.sound.add('game_music', { loop: true, volume: 0.5 });
        game_music.play();
        this.scene.start("MenuScene");
    }
}
