import { v4 as uuidv4 } from 'uuid';
import Engine from './Engine';
import ETD from '../../scenes/Game';
import Tower from '../tower/Tower';
import Bullet from '../bullet/Bullet';
import Enemy from '../enemy/Enemy';
import EnemyEngine from './Enemy';

export default class BulletEngine extends Engine {
    bullets: Bullet[] = [];
    enemyEngine!: EnemyEngine;

    constructor(scene: ETD, enemyEngine: EnemyEngine) {
        super(scene);
        this.enemyEngine = enemyEngine;

        this.scene.game.events.on('step', () => {
            this.bulletLoop();
        })

        this.scene.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Body) => {
            const bullet = this.bullets.find(b => b.sprite.body === body);

            bullet?.destroy();
        });
    }

    bulletLoop() {
        this.bullets.forEach(bullet => {
            this.enemyEngine.enemies.forEach(enemy => {
                this.scene.physics.overlap(bullet.sprite, enemy.self, () => {
                    enemy.health -= bullet.tower.damage;
                    bullet.destroy();
                });
            });
        });

        this.bullets = this.bullets.filter(b => b.active);
    }

    fireBullet(tower: Tower, enemy: Enemy) {
        if (enemy && enemy.self) {
            const bullet = new Bullet(this.scene, tower, enemy);
            this.bullets.push(bullet);

            bullet.fire();
        }
    }

    protected getBulletId(): string {
        return uuidv4();
    }
}