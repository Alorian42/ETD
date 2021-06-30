import Phaser from 'phaser';
import EnemyEngine from '../class/engine/Enemy';
import SpawnerEngine from '../class/engine/Spawner';
import TowerEngine from '../class/engine/Tower';
import BulletEngine from '../class/engine/Bullet';
import ScoreEngine from '../class/engine/Score';
import UiEngine from '../class/engine/UI';
import BuildEngine from '../class/engine/Build';
import GoldEngine from '../class/engine/Gold';

export default class ETD extends Phaser.Scene {
  map!: Phaser.Tilemaps.Tilemap;
  tileset!: Phaser.Tilemaps.Tileset;
  enemyEngine!: EnemyEngine;
  spawnerEngine!: SpawnerEngine;
  towerEngine!: TowerEngine;
  bulletEngine!: BulletEngine;
  scoreEngine!: ScoreEngine;
  goldEngine!: GoldEngine;
  uiEngine!: UiEngine;
  buildEngine!: BuildEngine;

  groundLayer!: Phaser.Tilemaps.TilemapLayer;
  upperLayer!: Phaser.Tilemaps.TilemapLayer;
  platformLayer!: Phaser.Tilemaps.TilemapLayer;

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('mob', 'assets/mob.png');
    this.load.image('tower', 'assets/tower.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('base_tiles', 'assets/map/sci-fi-tiles.png');
    this.load.tilemapTiledJSON('tilemap', 'assets/map/map.json');
  }

  create() {
    this.initEngines();
    this.initMap();
    this.initStart();
  }

  protected initStart() {
    this.uiEngine.initStartButton(() => this.start());
  }

  protected initEngines() {
    this.uiEngine = new UiEngine(this);
    this.scoreEngine = new ScoreEngine(this);
    this.goldEngine = new GoldEngine(this);
    this.enemyEngine = new EnemyEngine(this, this.scoreEngine, this.goldEngine);
    this.bulletEngine = new BulletEngine(this, this.enemyEngine);
    this.towerEngine = new TowerEngine(this, this.enemyEngine, this.bulletEngine);
    this.spawnerEngine = new SpawnerEngine(this, this.enemyEngine);
    this.buildEngine = new BuildEngine(this, this.uiEngine, this.towerEngine, this.goldEngine);
  }

  protected initMap() {
    this.map = this.make.tilemap({ key: 'tilemap' });
    this.tileset = this.map.addTilesetImage('etd', 'base_tiles')

    this.groundLayer = this.map.createLayer('Ground', this.tileset, 0, 0);
    this.upperLayer = this.map.createLayer('Upper', this.tileset, 0, 0);
    this.platformLayer = this.map.createLayer('Platforms', this.tileset, 0, 0);
    this.upperLayer.setCollisionByExclusion([-1]);
  }

  protected start() {
    this.spawnerEngine.spawnWave();
  }
}
