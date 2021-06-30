import Engine from './Engine';
import ETD from '../../scenes/Game';
import UiEngine from './UI';
import TowerEngine from './Tower';

export default class BuildEngine extends Engine {
    uiEngine!: UiEngine;
    towerEngine!: TowerEngine;
    buildMode = false;
    towerBuild?: Phaser.GameObjects.Sprite;
    towerRange?: Phaser.GameObjects.Arc;

    constructor(scene: ETD, uiEngine: UiEngine, towerEngine: TowerEngine) {
        super(scene);

        this.towerEngine = towerEngine;
        this.uiEngine = uiEngine;
        this.uiEngine.initBuildButton(() => this.build());

        this.scene.game.events.on('step', () => {
            if (this.buildMode && this.towerBuild && this.towerRange) {
                const x = this.scene.game.input.activePointer.x;
                const y = this.scene.game.input.activePointer.y;
                
                this.towerBuild.setPosition(x, y);
                this.towerRange.setPosition(x, y);
            }
        });

        this.scene.input.on('pointerdown', () => {
            if (this.buildMode && this.towerBuild) {
                const x = this.scene.game.input.activePointer.x;
                const y = this.scene.game.input.activePointer.y;
                const width = this.towerBuild.width * 2;
                const height = this.towerBuild.height * 2;

                const i = this.scene.upperLayer.getTilesWithinWorldXY(
                    this.towerBuild.x, this.towerBuild.y,
                    this.towerBuild.width,
                    this.towerBuild.height,
                );
                const canBuildHere = i.every(tile => tile.index === -1) &&
                    this.towerEngine.towers.every(tower => {
                        if (!tower.self) {
                            return true;
                        }

                        return !Phaser.Geom.Intersects.RectangleToRectangle(
                            new Phaser.Geom.Rectangle(tower.self.x, tower.self.y, tower.self.width, tower.self?.height),
                            new Phaser.Geom.Rectangle(x - 16, y - 16, width + 16, height + 16),
                        );
                    });

                if (canBuildHere) {
                    this.cancel();
                    this.towerEngine.buildBasicTower(x, y);
                }
            }
        });

        this.scene.input.keyboard.on('keydown', (event: KeyboardEvent) => {
            if (this.buildMode && this.towerBuild && event.code === 'Escape') {
                this.cancel();
            }
        });
    }

    build(radius = 100) {
        window.setTimeout(() => {
            this.buildMode = true;
        });

        const x = this.scene.game.input.activePointer.x;
        const y = this.scene.game.input.activePointer.y;
        this.towerBuild = this.scene.add.sprite(x, y, 'tower')
            .setScale(2);
        this.towerRange = this.scene.add.circle(x, y, radius).setDepth(200).setStrokeStyle(5, 0xff0000);
    }

    cancel() {
        if (this.towerBuild) {
            this.towerBuild.setActive(false);
            this.towerBuild.setVisible(false);
        }
        if (this.towerRange) {
            this.towerRange.setActive(false);
            this.towerRange.setVisible(false);
        }

        this.buildMode = false;
        this.uiEngine.buildButton.setVisible(true);
    }
}