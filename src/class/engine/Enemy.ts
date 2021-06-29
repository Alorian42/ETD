import Enemy from '../enemy/Enemy';
import { v4 as uuidv4 } from 'uuid';
import Engine from './Engine';

export default class EnemyEngine extends Engine {
    enemies: Enemy[] = [];

    constructor(scene: Phaser.Scene) {
        super(scene);

        this.scene.game.events.on('step', () => {
            this.enemyLoop();
        })
    }

    enemyLoop() {
        this.enemies.forEach(enemy => {
            enemy.setPosition(enemy.x + enemy.velocity.x, enemy.y + enemy.velocity.y);
            enemy.update();
        });
    }

    spawn(enemy: Enemy, x?: number, y?: number): number {
        if (x !== undefined && y !== undefined) {
            enemy.setPosition(x, y);
        }

        const obj = this.scene.add.image(enemy.x, enemy.y, enemy.name);
        enemy.setSelf(obj);

        const id = this.getEnemyId();
        enemy.setId(id);

        this.enemies.push(enemy);

        return id;
    }

    move(id: number, { x = 0, y = 0 }) {
        const enemy = this.enemies.find(e => e.id === id);

        if (enemy) {
            enemy.setVelocity({x, y});
        }
    }

    protected getEnemyId(): number {
        return uuidv4();
    }
}