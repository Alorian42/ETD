import { v4 as uuidv4 } from 'uuid';
import Engine from './Engine';
import { HP_STYLE } from '../../constants/global';
import ETD from '../../scenes/Game';
import Tower from '../tower/Tower';
import Basic from '../tower/Basic';
import EnemyEngine from './Enemy';
import Bullet from '../bullet/Bullet';
import BulletEngine from './Bullet';

export default class TowerEngine extends Engine {
    towers: Tower[] = [];
    enemyEngine!: EnemyEngine;
    bulletEngine!: BulletEngine;

    constructor(scene: ETD, enemyEngine: EnemyEngine, bulletEngine: BulletEngine) {
        super(scene);
        this.enemyEngine = enemyEngine;
        this.bulletEngine = bulletEngine;

        this.scene.game.events.on('step', () => {
            this.towerLoop();
        })
    }

    towerLoop() {
        this.towers.filter(t => t.canAttack).forEach(tower => {
            tower.update();
            const radius = new Phaser.Geom.Circle(tower.x, tower.y, tower.radius);
            const inRadius = this.enemyEngine.enemies.filter(enemy => radius.contains(enemy.x, enemy.y));

            const enemy = inRadius.find(enemy => enemy.id === tower.lastTarget) || inRadius[0];

            this.bulletEngine.fireBullet(tower, enemy);
        });
    }

    build(tower: Tower, x?: number, y?: number): string {
        if (x !== undefined && y !== undefined) {
            tower.setPosition(x, y);
        }

        const obj = this.scene.physics.add.sprite(tower.x, tower.y, tower.name).setScale(2, 2);
        const hp = this.scene.add.text(0, 0, tower.health.toString(), HP_STYLE);

        tower.setSelf(obj);
        tower.setHP(hp);

        const id = this.getTowerId();
        tower.setId(id);

        this.towers.push(tower);

        return id;
    }

    destroy(id: string) {
        const tower = this.towers.find(e => e.id === id);

        if (tower) {
            tower.destroy();
        }
    }

    buildBasicTower(x: number, y: number) {
        const tower = new Basic(x, y);
        this.build(tower);

        return tower;
    }

    protected getTowerId(): string {
        return uuidv4();
    }
}