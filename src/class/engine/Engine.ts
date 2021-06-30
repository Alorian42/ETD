import ETD from '../../scenes/Game';

export default abstract class Engine {
    scene!: ETD;

    constructor(scene: ETD) {
        this.scene = scene;
    }
}