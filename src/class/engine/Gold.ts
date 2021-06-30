import Engine from './Engine';
import ETD from '../../scenes/Game';
import Enemy from '../enemy/Enemy';
import Tower from '../tower/Tower';

export default class GoldEngine extends Engine {
    text!: Phaser.GameObjects.Text;
    gold = 100;

    constructor(scene: ETD) {
        super(scene);

        this.text = this.scene.add.text(20, 20, this.scoreText);
        this.text.setDepth(200);

        this.scene.game.events.on('step', () => {
            this.update();
        });
    }

    onTowerBuild(tower: Tower) {
        this.gold -= tower.cost;
    }

    onEnemyKill(enemy: Enemy) {
        this.gold += enemy.goldValue;
    }
    
    update() {
        this.text.setText(this.scoreText);
    }

    get scoreText() {
        return `Gold: ${this.gold}`;
    }
}