import Enemy from './Enemy';

export default class Dude extends Enemy {
    name = 'mob';

    defaultVelocity = {
        x: 0,
        y: 5,
    };
}