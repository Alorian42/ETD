export default abstract class Enemy {
    name: string = '';
    x = 0;
    y = 0;
    id = 0;
    velocity: {
        x: number,
        y: number,
    } = {
            x: 0,
            y: 0,
        };
    self?: Phaser.GameObjects.Image;
    maxVelocity = 16;
    defaultVelocity: {
        x: number,
        y: number,
    } = {
            x: 0,
            y: 0,
        };

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    setPosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    setSelf(obj: Phaser.GameObjects.Image) {
        this.self = obj;
    }

    setId(id: number) {
        this.id = id;
    }

    setVelocity({ x = 0, y = 0 }) {
        const vector = Math.sqrt(x * x + y * y);
        const maxSpeed = Math.sqrt(this.maxVelocity * this.maxVelocity / 2)

        this.velocity.x = vector <= this.maxVelocity ? x : maxSpeed * Math.sign(x);
        this.velocity.y = vector <= this.maxVelocity ? y : maxSpeed * Math.sign(y)

        console.log(this.velocity);
    }

    update() {
        if (this.self) {
            this.self.setPosition(this.x, this.y);
        }
    }
}