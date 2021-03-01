export default class Light {
    constructor(street, duration, isGreen = true) {
        this.street = street;
        this.isGreen = isGreen;
        this.duration = duration;
        this.greenFor = 0;
        this.queue = [];
    }

    shouldTurnRed() {
        return this.isGreen && this.greenFor === this.duration;
    }

    turnRed() {
        this.isGreen = false;
        this.greenFor = 0;
    }

    turnGreen() {
        this.isGreen = true;
        this.greenFor = 0;
    }
}
