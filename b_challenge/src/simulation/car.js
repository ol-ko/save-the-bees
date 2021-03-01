export default class Car {
    constructor(id, route, streetHash) {
        this.id = id;
        this.route = route;
        this.currStreetIndex = 0;
        this.street = route[0];
        this.entersIntersection = streetHash[this.street].end;
        this.streetPos = streetHash[this.street].time;
    }

    enterNextStreet(intersection) {
        intersection.getLight(this.street).queue.shift();
        this.currStreetIndex += 1;
        this.street = this.route[this.currStreetIndex];
        this.streetPos = 0;
        this.entersIntersection = null;
    }

    moveDownTheStreet(street, intersection) {
        this.streetPos = this.streetPos + 1;
        if (this.streetPos === street.time) {
            this.entersIntersection = street.end;
            intersection.getLight(this.street).queue.push(this.id);
        }
    }
}
