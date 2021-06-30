import Enemy from '../enemy/Enemy';
import { v4 as uuidv4 } from 'uuid';
import Engine from './Engine';
import { HP_STYLE } from '../../constants/global';
import ETD from '../../scenes/Game';

export default class EnemyEngine extends Engine {
    enemies: Enemy[] = [];
    textNumberOfEnemies!: Phaser.GameObjects.Text;

    constructor(scene: ETD) {
        super(scene);

        this.textNumberOfEnemies = this.scene.add.text(400, 50, this.enemies.length.toString());
        this.textNumberOfEnemies.setDepth(200);

        this.scene.game.events.on('step', () => {
            this.enemyLoop();
        })
    }

    enemyLoop() {
        this.enemies.forEach(enemy => {
            enemy.update();

            const i = this.scene.platformLayer.getTilesWithinWorldXY(
                enemy.x, enemy.y,
                enemy.self?.width ?? 1,
                enemy.self?.height ?? 1,
            );

            if (i.some(tile => tile.index !== -1)) {
                enemy.setVelocity({
                    y: enemy.velocity.x,
                    x: enemy.velocity.y,
                    updateAngle: true,
                });
            }
        });

        this.enemies = this.enemies.filter(e => !e.removed);
        this.textNumberOfEnemies.setText(this.enemies.length.toString());
    }

    spawn(enemy: Enemy, x?: number, y?: number): string {
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

    move(id: string, { x = 0, y = 0 }) {
        const enemy = this.enemies.find(e => e.id === id);

        if (enemy) {
            enemy.setVelocity({x, y});
        }
    }

    kill(id: string) {
        const enemy = this.enemies.find(e => e.id === id);

        if (enemy) {
            enemy.kill();
        }
    }

    protected getEnemyId(): string {
        return uuidv4();
    }
}