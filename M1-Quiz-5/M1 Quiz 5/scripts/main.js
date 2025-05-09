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

let shoot_fx, hit_destroyable_fx, hit_enemy_fx, player_hit_fx;
let game_music;

const game = new Phaser.Game(config);
