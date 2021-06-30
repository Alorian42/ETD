import Enemy from './Enemy';

export default class Duck extends Enemy {
    name = 'duck';
    health = 50;
    maxVelocity = 150;

    defaultVelocity = {
        x: 0,
        y: 150,
    };

    scoreValue = 10;
    goldValue = 5;
}