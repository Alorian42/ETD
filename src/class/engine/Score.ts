import Engine from './Engine';
import ETD from '../../scenes/Game';
import Enemy from '../enemy/Enemy';

export default class ScoreEngine extends Engine {
    text!: Phaser.GameObjects.Text;
    score = 0;

    constructor(scene: ETD) {
        super(scene);

        this.text = this.scene.add.text(400, 20, this.scoreText);
        this.text.setDepth(200);

        this.scene.game.events.on('step', () => {
            this.update();
        });
    }

    onEnemyKill(enemy: Enemy) {
        this.score += enemy.scoreValue;
    }
    
    update() {
        this.text.setText(this.scoreText);
    }

    get scoreText() {
        return `Score: ${this.score}`;
    }
}