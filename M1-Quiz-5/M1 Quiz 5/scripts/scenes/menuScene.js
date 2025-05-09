class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    create() {
        this.add.image(0, 0, 'bgmm').setOrigin(0);
        this.add.text(250, 250, "Rohan the Shooter", { font: "35px Verdana", fill: "#ffffff" });
        this.add.text(300, 350, "press space to start", { font: "24px Verdana", fill: "#ffffff" });

        this.input.keyboard.once("keydown-SPACE", () => {
            
            this.scene.start("GameScene");
        });
    }
}
