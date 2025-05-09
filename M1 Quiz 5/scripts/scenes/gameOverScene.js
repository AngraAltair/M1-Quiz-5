class GameOverScene extends Phaser.Scene {
    constructor() {
        super("GameOverScene");
    }

    create() {
        this.add.image(0, 0, 'bgmm').setOrigin(0);
        this.sound.stopAll();

        this.loseMusic = this.sound.add('lose_music', { loop: true, volume: 0.5 });
        this.loseMusic.play();

        this.add.text(275, 250, "Game Over", { font: "48px Verdana", fill: "#FF0000" });
        this.add.text(275, 350, "Press SPACE to Restart", { font: "24px Verdana", fill: "#FFFFFF" });

        this.input.keyboard.once("keydown-SPACE", () => {
            this.loseMusic.stop();
            this.scene.start("MenuScene");
        });
    }
}
