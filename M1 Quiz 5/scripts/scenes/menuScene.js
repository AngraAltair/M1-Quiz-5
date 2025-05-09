class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    create() {
        this.add.image(0, 0, 'bgmm').setOrigin(0);
        this.add.text(250, 250, "Rohan the Shooter", { font: "35px Verdana", fill: "#ffffff" });
        this.add.text(300, 350, "press space to start", { font: "24px Verdana", fill: "#ffffff" });

        this.mainMenuMusic = this.sound.add('mainmenu_music', { loop: true, volume: 0.5 });
        this.mainMenuMusic.play();

        this.input.keyboard.once("keydown-SPACE", () => {
            this.mainMenuMusic.stop();
            this.scene.start("GameScene");
        });
    }
}
