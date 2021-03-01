function parse(input) {
    const lines = input.split('\n');

    const [simTime, numInts, numStreets, numCars, carPoints] = lines[0]
        .trim()
        .split(' ')
        .map((x) => parseInt(x));

    const streets = new Array(numInts).fill(undefined).map(() => Array(numInts).fill(0));
    const streetHash = {};
    const cars = [];

    for (let i = 1; i <= numStreets; i++) {
        let [start, end, name, time] = lines[i].trim().split(' ');
        [start, end, time] = [start, end, time].map((x) => parseInt(x));
        streets[start][end] = {
            time,
            name,
        };
        streetHash[name] = {
            start,
            end,
            time,
        };
    }

    // parse cars
    for (let i = 1 + numStreets; i <= numStreets + numCars; i++) {
        const [tripStreets, ...streetNames] = lines[i].trim().split(' ');
        const route = streetNames.map((streetName) => streetHash[streetName].start);
        route.push(streetHash[streetNames[streetNames.length - 1]].end);

        let earliestArrivals = [0];
        let journeyLength = 0;
        for (let i = 0; i < route.length - 1; i++) {
            const start = route[i];
            const stop = route[i + 1];
            journeyLength = journeyLength + streets[start][stop].time;
            earliestArrivals.push(journeyLength);
        }

        const bestPossibleTime = journeyLength;

        cars.push({
            route,
            earliestArrivals,
            bestPossibleTime,
            canMakeIt: bestPossibleTime <= simTime,
        });

        cars.sort((a, b) => {
            if (a.canMakeIt !== b.canMakeIt) return b.canMakeIt - a.canMakeIt;
            return b.bestPossibleTime - a.bestPossibleTime;
        });
    }

    return {
        simTime,
        numInts,
        numStreets,
        numCars,
        carPoints,
        streets,
        streetHash,
        cars,
    };
}

module.exports = {
    parse,
};
