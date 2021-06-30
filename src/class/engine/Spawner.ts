import Engine from './Engine';
import EnemyEngine from './Enemy';
import Dude from '../enemy/Dude';
import ETD from '../../scenes/Game';
import { START_POINT } from '../../constants/global';

export default class SpawnerEngine extends Engine {
    enemyEngine!: EnemyEngine;

    constructor(scene: ETD, enemyEngine: EnemyEngine) {
        super(scene);

        this.enemyEngine = enemyEngine;
    }

    spawnWave() {
        this.spawnDude(START_POINT.x, START_POINT.y);
        this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.spawnDude(START_POINT.x, START_POINT.y);
            },
            loop: true,
        });
    }

    protected spawnDude(x = 0, y = 0) {
        const dude = new Dude(x, y);
        const id = this.enemyEngine.spawn(dude);

        const isHorizontal = Math.floor((Math.random() * 2)) === 1;

        if (isHorizontal) {
            dude.defaultVelocity.x = 150;
            dude.defaultVelocity.y = 0;
        }
    
        this.enemyEngine.move(id, {
            x: dude.defaultVelocity.x,
            y: dude.defaultVelocity.y,
        });
    }
}