import Tower from './Tower';

export default class Basic extends Tower {
    name = 'tower';

    health = 1000;
    radius = 100;
    minDamage = 10;
    maxDamage = 45;
    cost = 75;
    attackSpeed = 300;
    static get TOWER_COST() {
        return 75;
    }
}