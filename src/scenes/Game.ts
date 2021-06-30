import Phaser from 'phaser';
import EnemyEngine from '../class/engine/Enemy';
import SpawnerEngine from '../class/engine/Spawner';
import TowerEngine from '../class/engine/Tower';
import BulletEngine from '../class/engine/Bullet';

export default class ETD extends Phaser.Scene {
  map!: Phaser.Tilemaps.Tilemap;
  tileset!: Phaser.Tilemaps.Tileset;
  enemyEngine!: EnemyEngine;
  spawnerEngine!: SpawnerEngine;
  towerEngine!: TowerEngine;
  bulletEngine!: BulletEngine;

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
    // this.load.image('grass', 'assets/grass.png');
    // this.load.image('dirt', 'assets/dirt.png');
    this.load.image('base_tiles', 'assets/map/sci-fi-tiles.png');
    this.load.tilemapTiledJSON('tilemap', 'assets/map/map.json');
  }

  create() {
    this.initEngines();
    this.initMap();

    this.start();
  }

  protected initEngines() {
    this.enemyEngine = new EnemyEngine(this);
    this.bulletEngine = new BulletEngine(this, this.enemyEngine);
    this.towerEngine = new TowerEngine(this, this.enemyEngine, this.bulletEngine);
    this.spawnerEngine = new SpawnerEngine(this, this.enemyEngine);
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
    this.towerEngine.testBuilding();
  }
}
