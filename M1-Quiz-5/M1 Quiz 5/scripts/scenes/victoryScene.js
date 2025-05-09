class VictoryScene extends Phaser.Scene {
    constructor() {
        super("VictoryScene");
    }

    create() {
        this.add.image(0, 0, 'bgmm').setOrigin(0);
        const finalScore = this.registry.get('score') || 0;


        this.add.text(350, 250, "Victory!", { fontSize: '48px Verdana', fill: '#008000' });
        this.add.text(350, 300, `Final Score: ${finalScore}`, { fontSize: '24px Verdana', fill: '#FFFFFF' });
        this.add.text(270, 350, "Press SPACE to Restart", { font: "24px Verdana", fill: "#FFFFFF" });

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start("MenuScene");
        });
    }
}
