export default abstract class Engine {
    scene!: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }
}