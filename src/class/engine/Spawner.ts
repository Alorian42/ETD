import Engine from './Engine';
import EnemyEngine from './Enemy';
import Dude from '../enemy/Dude';

export default class SpawnerEngine extends Engine {
    enemyEngine!: EnemyEngine;

    constructor(scene: Phaser.Scene, enemyEngine: EnemyEngine) {
        super(scene);

        this.enemyEngine = enemyEngine;
    }

    spawnWave() {
        this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.spawnDude(110);
            },
            loop: true,
        });
    }

    protected spawnDude(x = 0, y = 0) {
        const dude = new Dude(x, y);
        const id = this.enemyEngine.spawn(dude);
        console.log(`${id} spawned`);
    
        this.enemyEngine.move(id, {
            x: dude.defaultVelocity.x,
            y: dude.defaultVelocity.y,
        });
    }
}