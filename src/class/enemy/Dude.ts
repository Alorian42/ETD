import Enemy from './Enemy';

export default class Dude extends Enemy {
    name = 'mob';
    health = 100;
    maxVelocity = 100;

    defaultVelocity = {
        x: 0,
        y: 100,
    };
}