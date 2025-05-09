class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    create() {
        this.add.image(0, 0, 'bgg').setOrigin(0);

        this.rohan = this.physics.add.sprite(400, 550, 'rohan').setCollideWorldBounds(true);

        this.enemies = this.physics.add.group();
        for (let i = 0; i < 3; i++) {
            this.enemies.create(Phaser.Math.Between(0, 800), 140, 'enemy');
        }

        shoot_fx = this.shoot_fx = this.sound.add('shoot_fx', { volume: 0.5 });
        hit_enemy_fx = this.hit_enemy_fx = this.sound.add('hit_enemy_fx', { volume: 0.5 });
        hit_destroyable_fx = this.hit_destroyable_fx = this.sound.add('hit_destroyable_fx', { volume: 0.8 });
        player_hit_fx = this.player_hit_fx = this.sound.add('player_hit_fx', { volume: 0.5 });

        this.obstacles = this.physics.add.group();
        this.obstaclesDestroyable = this.physics.add.group();

        this.time.addEvent({ delay: 300, callback: this.spawnObstacleLeftRight, callbackScope: this, loop: true });
        this.time.addEvent({ delay: 800, callback: this.spawnObstacleUpDown, callbackScope: this, loop: true });

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

        this.score = 0;
        this.txtScore = this.add.text(550, 10, "Score: 0", { font: "32px Verdana", fill: "#00FF00" });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.projectiles = this.physics.add.group();

        this.setupProjectileHitsEnemy();
        this.setupProjectileHitsDestructibleObstacle();
        this.setupObstacleHitsPlayer();
    }

    setupProjectileHitsEnemy() {
        this.physics.add.overlap(this.projectiles, this.enemies, (projectile, enemy) => {
            hit_enemy_fx.play();
            projectile.destroy();
            enemy.setPosition(
                Phaser.Math.Between(50, 750),
                Phaser.Math.Between(50, 200)
            );
            this.score += 1;
            this.txtScore.setText("Score: " + this.score);
        });
    }

    setupProjectileHitsDestructibleObstacle() {
        this.physics.add.overlap(this.projectiles, this.obstaclesDestroyable, (projectile, obstacle) => {
            hit_destroyable_fx.play();
            projectile.destroy();
            obstacle.destroy();
        });
    }

    setupObstacleHitsPlayer() {
        this.physics.add.collider(this.rohan, this.obstacles, () => {
            player_hit_fx.play();
            this.scene.start("GameOverScene");
        });
    }

    spawnObstacleUpDown() {
        let obstacle = this.obstaclesDestroyable.create(800, Phaser.Math.Between(50, 450), 'obstaclesDestroyable');
        obstacle.setVelocityX(-150);
    }

    spawnObstacleLeftRight() {
        let obstacle = this.obstacles.create(Phaser.Math.Between(0, 700), 0, 'obstacle');
        obstacle.setVelocityY(300);
    }

    shootProjectile(x, y) {
        const projectile = this.projectiles.create(x, y, 'projectile');
        shoot_fx.play();
        projectile.setVelocityY(-300);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.shootProjectile(this.rohan.x, this.rohan.y);
        }

        if (this.cursors.left.isDown) {
            this.rohan.setVelocityX(-300);
        } else if (this.cursors.right.isDown) {
            this.rohan.setVelocityX(300);
        } else {
            this.rohan.setVelocityX(0);
        }

        this.rohan.setVelocityY(0);
    }
}
