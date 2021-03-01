export default class Intersection {
    constructor(lights) {
        this.lights = lights;
    }

    getLight(street) {
        return this.lights.find((x) => x.street === street);
    }

    switchLights() {
        if (this.lights.length < 2) return;
        for (let i = 0; i < this.lights.length; i++) {
            if (this.lights[i].isGreen) this.lights[i].greenFor += 1;
            if (this.lights[i].shouldTurnRed()) {
                this.lights[i].turnRed();
                const nextLightIndex = i + 1 > this.lights.length - 1 ? 0 : i + 1;
                this.lights[nextLightIndex].turnGreen();
                break;
            }
        }
    }
}
