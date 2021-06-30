export default abstract class Enemy {
    id: string = '';
    name: string = '';
    self?: Phaser.GameObjects.Sprite;
    x = 0;
    y = 0;
    velocity: {
        x: number,
        y: number,
    } = {
            x: 0,
            y: 0,
        };
    maxVelocity = 16;
    defaultVelocity: {
        x: number,
        y: number,
    } = {
            x: 0,
            y: 0,
        };
    health = 1;
    hp?: Phaser.GameObjects.Text;
    removed = false;
    movableGracePeriod = 0;
    velocitySign = -1;
    scoreValue = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    setPosition(x: number, y: number) {
        this.x = x;
        this.y = y;

        this.updateHP();
    }

    setSelf(obj: Phaser.GameObjects.Sprite) {
        this.self = obj;
    }

    setHP(hp: Phaser.GameObjects.Text) {
        this.hp = hp;

        this.updateHP();
    }

    setId(id: string) {
        this.id = id;
    }

    setVelocity({ x = 0, y = 0, updateAngle = false } = {}) {
        if (!this.isMovable) {
            return;
        }

        const vector = Math.sqrt(x * x + y * y);
        const maxSpeed = Math.sqrt(this.maxVelocity * this.maxVelocity / 2);

        this.velocity.x = vector <= this.maxVelocity ? x : maxSpeed * Math.sign(x);
        this.velocity.y = vector <= this.maxVelocity ? y : maxSpeed * Math.sign(y);
        
        if (updateAngle) {
            this.velocitySign *= (-1);
            this.velocity.x *= this.velocitySign;
            this.velocity.y *= this.velocitySign;
        }


        this.isMovable = false;
    }

    updateHP() {
        this.hp?.setText(this.health.toString());
        this.hp?.setPosition(
            Math.floor(this.x - ((this.self?.width ?? 0) / 4)),
            this.y - (this.self?.height ?? 0) / 2,
        );
    }

    update() {
        if (!this.self || !this.hp || this.removed) {
            return;
        }

        if (this.isDead) {
            this.self.setActive(false);
            this.hp.setActive(false);
            this.self.setVisible(false);
            this.hp.setVisible(false);

            this.hp = undefined;
            this.self = undefined;
            this.removed = true;

            return;
        }
        
        this.self.body.velocity.x = this.velocity.x;
        this.self.body.velocity.y = this.velocity.y;
        this.setPosition(this.self.body.position.x, this.self.body.position.y);

        if (this.movableGracePeriod >= 1) {
            this.movableGracePeriod--;
        }
    }

    kill() {
        this.health = 0;
    }

    get isDead(): boolean {
        return this.health <= 0;
    }

    get isMovable(): boolean {
        return this.movableGracePeriod === 0;
    }

    set isMovable(value: boolean) {
        this.movableGracePeriod = value ? 0 : 60;
    }
}