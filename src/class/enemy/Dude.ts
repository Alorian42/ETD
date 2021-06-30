import Enemy from './Enemy';

export default class Dude extends Enemy {
    name = 'mob';
    health = 100;
    maxVelocity = 150;

    defaultVelocity = {
        x: 0,
        y: 150,
    };

    scoreValue = 100;
    goldValue = 10;
}