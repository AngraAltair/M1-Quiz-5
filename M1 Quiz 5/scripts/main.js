const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [LoadingScene, MenuScene, GameScene, VictoryScene, GameOverScene]
};

const game = new Phaser.Game(config);
