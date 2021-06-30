import Engine from './Engine';
import ETD from '../../scenes/Game';

export default class UiEngine extends Engine {
    startButton!: Phaser.GameObjects.Text;
    buildButton!: Phaser.GameObjects.Text;

    constructor(scene: ETD) {
        super(scene);
    }

    initStartButton(callback: Function) {
        this.startButton = this.scene.add.text(20, 20, 'Start', { backgroundColor: '#000', fontSize: '20px' });
        this.startButton.setInteractive();
        this.startButton.setDepth(200);

        this.startButton.on('pointerdown', () => {
            callback();

            this.startButton.setVisible(false);
            this.buildButton.setVisible(true);
        });
    }

    initBuildButton(callback: Function) {
        this.buildButton = this.scene.add.text(20, 60, 'Build Basic Tower', { backgroundColor: '#000', fontSize: '20px' });
        this.buildButton.setInteractive();
        this.buildButton.setDepth(200);
        this.buildButton.setVisible(false);

        this.buildButton.on('pointerdown', () => {
            callback();

            this.buildButton.setVisible(false);
        });
    }
}