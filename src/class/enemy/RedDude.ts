import Enemy from './Enemy';

export default class RedDude extends Enemy {
    name = 'red_dude';
    health = 1000;
    maxVelocity = 50;

    defaultVelocity = {
        x: 0,
        y: 50,
    };

    scoreValue = 300;
    goldValue = 50;
}