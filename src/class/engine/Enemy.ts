import Enemy from '../enemy/Enemy';
import { v4 as uuidv4 } from 'uuid';
import Engine from './Engine';
import { HP_STYLE } from '../../constants/global';
import ETD from '../../scenes/Game';

export default class EnemyEngine extends Engine {
    enemies: Enemy[] = [];

    constructor(scene: ETD) {
        super(scene);

        this.scene.game.events.on('step', () => {
            this.enemyLoop();
        })
    }

    enemyLoop() {
        this.enemies.forEach(enemy => {
            enemy.update();

            const i = this.scene.upperLayer.getTilesWithinWorldXY(
                enemy.x, enemy.y,
                enemy.self?.width ?? 1,
                enemy.self?.height ?? 1,
            );

            if (i.some(tile => tile.index !== -1)) {
                enemy.setVelocity();
                enemy.kill();
            }
        });

        this.enemies = this.enemies.filter(e => !e.removed);
    }

    spawn(enemy: Enemy, x?: number, y?: number): number {
        if (x !== undefined && y !== undefined) {
            enemy.setPosition(x, y);
        }

        const obj = this.scene.physics.add.sprite(enemy.x, enemy.y, enemy.name);
        const hp = this.scene.add.text(0, 0, enemy.health.toString(), HP_STYLE);

        enemy.setSelf(obj);
        enemy.setHP(hp);

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

    kill(id: number) {
        const enemy = this.enemies.find(e => e.id === id);

        if (enemy) {
            enemy.kill();
        }
    }

    protected getEnemyId(): number {
        return uuidv4();
    }
}