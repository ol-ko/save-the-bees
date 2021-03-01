const { parse } = require('./parse');

function run(input) {
    const { simTime, numInts, numStreets, numCars, carPoints, streets, streetHash, cars } = parse(input);
    // console.log(simTime, numInts, numStreets, numCars, carPoints, streets, streetHash, cars);

    const lights = {};

    for (let car of cars) {
        for (let i = 0; i < car.route.length - 1; i++) {
            const start = car.route[i];
            const stop = car.route[i + 1];

            if (lights[stop] === undefined) {
                lights[stop] = {};
            }

            if (lights[stop][streets[start][stop].name] === undefined) {
                lights[stop][streets[start][stop].name] = {
                    time: 1,
                    minArrival: car.earliestArrivals[i + 1],
                };
            } else if (car.canMakeIt) {
                lights[stop][streets[start][stop].name].time += 1; // more cars are passing
                const minArrival = lights[stop][streets[start][stop].name].minArrival;
                lights[stop][streets[start][stop].name].arrival = Math.min(car.earliestArrivals[i + 1], minArrival);
            }
        }
    }
    // console.log(lights);
    let result = [];

    for (let intersection in lights) {
        // intersection
        // console.log(lights[intersection]);
        const streets = [];
        const configs = Object.entries(lights[intersection]);

        if (configs.length === 1) {
            streets.push({
                streetName: configs[0][0],
                time: configs[0][1].time,
            });
        } else {
            configs.sort((a, b) => a[1].minArrival - b[1].minArrival);
            for (let t = 0; t < configs.length; t++) {
                configs[configs.length - t - 1][1].time += t;
                streets.push({
                    streetName: configs[configs.length - t - 1][0],
                    time: configs[configs.length - t - 1][1].time,
                });
            }
        }

        result.push({
            intersection,
            streets,
        });
    }

    console.log(JSON.stringify(result));

    let formattedResult = `${result.length}
`;

    for (let intersection of result) {
        formattedResult += `${intersection.intersection}
${intersection.streets.length}
`;
        for (let street of intersection.streets) {
            formattedResult += `${street.streetName} ${street.time}
`;
        }
    }

    console.log(formattedResult);

    return formattedResult;
}

module.exports = {
    run,
};
