import _ from 'lodash';
import Intersection from './intersection.js';
import Light from './light.js';
import Car from './car.js';

class Simulation {
    constructor(steps, carsDriving, intersections, streetHash) {
        this.stepsPassed = 0;
        this.carsArrived = [];
        this.steps = steps;
        this.carsDriving = carsDriving;
        this.intersections = intersections;
        this.streetHash = streetHash;
    }

    upgradeArrived() {
        for (let i = 0; i < this.carsDriving.length; i++) {
            const car = this.carsDriving[i];
            const lastRouteStreetName = _.last(car.route);
            const currStreetName = car.street;
            if (lastRouteStreetName === currStreetName && this.streetHash[lastRouteStreetName].time === car.streetPos) {
                this.carsArrived.push({ id: car.id, bonus: this.steps - this.stepsPassed });
                this.carsDriving.splice(i, 1);
            }
        }
    }

    moveCarDownTheStreet(car) {
        const currStreet = this.streetHash[car.street];
        car.moveDownTheStreet(currStreet, this.intersections[currStreet.end]);
    }

    moveCarThroughIntersection(car) {
        const intersection = this.intersections[car.entersIntersection];
        const lightForThisCar = intersection.getLight(car.street);
        if (lightForThisCar.isGreen && lightForThisCar.queue[0] === car.id) {
            car.enterNextStreet(intersection);
        }
    }

    move(car) {
        if (car.entersIntersection !== null) {
            this.moveCarThroughIntersection(car);
        } else {
            this.moveCarDownTheStreet(car);
        }
    }

    simulateStep() {
        for (let car of this.carsDriving) {
            this.move(car);
        }

        this.upgradeArrived();

        for (let intersection of this.intersections) {
            intersection.switchLights();
        }
    }

    simulate() {
        for (let i = 0; i < this.steps; i++) {
            this.simulateStep();
            this.stepsPassed = i;
        }
        return this.carsArrived;
    }
}

export function simulate(steps, cars, candidate, streetHash) {
    const intersections = [];

    for (let key in candidate) {
        intersections.push(new Intersection(candidate[key].map((l) => new Light(...l))));
    }

    const carsDriving = [];

    for (let i = 0; i < cars.length; i++) {
        carsDriving[i] = new Car(...cars[i]);
        intersections[carsDriving[i].entersIntersection].getLight(carsDriving[i].street).queue.push(carsDriving[i].id);
    }

    const sim = new Simulation(steps, carsDriving, intersections, streetHash);

    return sim.simulate();
}

export function score(result) {
    return result.reduce((acc, i) => acc + 1000 + i.bonus, 0);
}
