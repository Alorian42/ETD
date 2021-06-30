import Engine from './Engine';
import EnemyEngine from './Enemy';
import Dude from '../enemy/Dude';
import ETD from '../../scenes/Game';
import { START_POINT } from '../../constants/global';
import Enemy from '../enemy/Enemy';
import RedDude from '../enemy/RedDude';
import Duck from '../enemy/Duck';

export default class SpawnerEngine extends Engine {
    enemyEngine!: EnemyEngine;

    constructor(scene: ETD, enemyEngine: EnemyEngine) {
        super(scene);

        this.enemyEngine = enemyEngine;
    }

    spawnWave() {
        this.spawnDude(START_POINT.x, START_POINT.y);
        this.scene.time.addEvent({
            delay: 3000,
            callback: () => {
                this.spawnDude(START_POINT.x, START_POINT.y);
            },
            loop: true,
        });

        this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.spawnDuck(START_POINT.x, START_POINT.y);
            },
            loop: true,
        });

        this.scene.time.addEvent({
            delay: 5000,
            callback: () => {
                this.spawnRedDude(START_POINT.x, START_POINT.y);
            },
            loop: true,
        });
    }

    protected spawnRedDude(x = 0, y = 0) {
        const dude = new RedDude(x, y);
        this.spawn(dude, x, y);
    }

    protected spawnDuck(x = 0, y = 0) {
        const dude = new Duck(x, y);
        this.spawn(dude, x, y);
    }

    protected spawnDude(x = 0, y = 0) {
        const dude = new Dude(x, y);
        this.spawn(dude, x, y);
    }

    protected spawn(enemy: Enemy, x = 0, y = 0) {
        const id = this.enemyEngine.spawn(enemy, x, y);

        const isHorizontal = Math.floor((Math.random() * 2)) === 1;

        if (isHorizontal) {
            enemy.defaultVelocity = {
                x: enemy.defaultVelocity.y,
                y: enemy.defaultVelocity.x,
            }
        }
    
        this.enemyEngine.move(id, {
            x: enemy.defaultVelocity.x,
            y: enemy.defaultVelocity.y,
        });
    }
}