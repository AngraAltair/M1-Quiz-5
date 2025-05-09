class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    create() {
        this.add.image(0, 0, 'bgg').setOrigin(0);

        this.rohan = this.physics.add.sprite(20, 300, 'rohan').setCollideWorldBounds(true);


        this.enemies = this.physics.add.group();
        for (let i = 0; i < 3; i++) {
            this.enemies.create(
                Phaser.Math.Between(600, 750),
                Phaser.Math.Between(50, 550),
                'enemy'
            );
        }

        this.obstacles = this.physics.add.group();
        this.time.addEvent({ delay: 750, callback: this.spawnObstacleLeftRight, callbackScope: this, loop: true });

        this.obstaclesDestroyable = this.physics.add.group();
        this.time.addEvent({ delay: 500, callback: this.spawnObstacleUpDown, callbackScope: this, loop: true });

   
        this.sound.stopAll();
        this.gameMusic = this.sound.add('game_music', { loop: true, volume: 0.5 });
        this.gameMusic.play();

        // Timer
        this.timeRemaining = 10;
        this.txtTimer = this.add.text(10, 10, "Time: 10", { font: "32px Verdana", fill: "#FF0000" });

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.timeRemaining--;
                this.txtTimer.setText("Time: " + this.timeRemaining);
                if (this.timeRemaining <= 0) {
                    this.registry.set('score', this.score);
                    this.scene.start("VictoryScene");
                }
            },
            callbackScope: this,
            loop: true
        });

        // Score
        this.score = 0;
        this.txtScore = this.add.text(550, 10, "Score: 0", { font: "32px Verdana", fill: "#00FF00" });

        // Input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Projectiles
        this.projectiles = this.physics.add.group();

        this.physics.add.overlap(this.projectiles, this.enemies, (projectile, enemy) => {
            projectile.destroy();
            enemy.setPosition(
                Phaser.Math.Between(600, 750),
                Phaser.Math.Between(50, 550)
            );
            this.score += 1;
            this.txtScore.setText("Score: " + this.score);
        });

        this.physics.add.overlap(this.projectiles, this.obstaclesDestroyable, (projectile, obstacle) => {
            projectile.destroy();
            obstacle.destroy();
        });

        this.physics.add.collider(this.rohan, this.obstacles, () => {
            this.gameMusic.stop();
            this.scene.start("GameOverScene");
        });

    }

    spawnObstacleLeftRight() {
        let obstacle = this.obstacles.create(800, Phaser.Math.Between(50, 550), 'obstacle');
        obstacle.setVelocityX(-150);
    }

    spawnObstacleUpDown() {
        let obstacle = this.obstaclesDestroyable.create(Phaser.Math.Between(100, 700), 0, 'obstaclesDestroyable');
        obstacle.setVelocityY(150);
    }

    shootProjectile(x, y) {
        const projectile = this.projectiles.create(x, y, 'projectile');
        projectile.setVelocityX(300);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.shootProjectile(this.rohan.x, this.rohan.y);
        }

        if (this.cursors.up.isDown) {
            this.rohan.setVelocityY(-200);
        } else if (this.cursors.down.isDown) {
            this.rohan.setVelocityY(200);
        } else {
            this.rohan.setVelocityY(0);
        }

        this.rohan.setVelocityX(0);
    }
}
