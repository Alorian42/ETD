import Enemy from './Enemy';

export default class Teemo extends Enemy {
    name = 'teemo';
    health = 6666;
    maxVelocity = 100;

    defaultVelocity = {
        x: 0,
        y: 100,
    };

    scoreValue = 666;
    goldValue = 666;
}