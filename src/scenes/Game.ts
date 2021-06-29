import Phaser from 'phaser';
import Dude from '../class/enemy/Dude';
import EnemyEngine from '../class/engine/Enemy';
import SpawnerEngine from '../class/engine/Spawner';

export default class ETD extends Phaser.Scene {
  map!: Phaser.Tilemaps.Tilemap;
  tileset!: Phaser.Tilemaps.Tileset;
  enemyEngine!: EnemyEngine;
  spawnerEngine!: SpawnerEngine;

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('mob', 'assets/mob.png');
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
    this.spawnerEngine = new SpawnerEngine(this, this.enemyEngine);
  }

  protected initMap() {
    this.map = this.make.tilemap({ key: 'tilemap' });
    this.tileset = this.map.addTilesetImage('etd', 'base_tiles')

    this.map.createLayer('Ground', this.tileset, 0, 0);
    this.map.createLayer('Upper', this.tileset, 0, 0);
  }

  protected start() {
    this.spawnerEngine.spawnWave();
  }
}
