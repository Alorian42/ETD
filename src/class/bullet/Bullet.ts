import ETD from '../../scenes/Game';
import Enemy from '../enemy/Enemy';
import Tower from '../tower/Tower';

export default class Bullet {
    scene!: ETD;
    tower!: Tower;
    enemy!: Enemy;
    sprite!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    active = true;

    constructor(scene: ETD, tower: Tower, enemy: Enemy) {
        this.tower = tower;
        this.enemy = enemy;
        this.scene = scene;
    }

    fire() {
        if (!this.enemy.self || !this.tower.canAttack) {
            return;
        }

        this.sprite = this.scene.physics.add.sprite(this.tower.x + 16, this.tower.y + 16, 'bullet');
        this.sprite.setCollideWorldBounds(true);
        this.sprite.body.setCollideWorldBounds(true, 0, 0, true);

        const body: Phaser.Physics.Arcade.Body = this.sprite.body;
        body.setVelocity(0, 0);
        this.tower.startAttack(this.enemy);
        this.scene.physics.moveToObject(this.sprite, this.enemy.self, 1000);
        this.sprite.setRotation(Phaser.Math.Angle.Between(this.sprite.x, this.sprite.y, this.enemy.self.x, this.enemy.self.y) * -1);
    }

    destroy() {
        this.sprite.destroy();
        this.sprite.setActive(false);
        this.active = false;
    }
}