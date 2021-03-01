export function parseSteps(data) {
    return parseInt(data[0][0]);
}

export function parseStreets(data) {
    const streetsNum = parseInt(data[0][2]);
    const streetRows = data.slice(1, streetsNum + 1);
    const streetHash = {};

    for (let streetRow of streetRows) {
        const start = parseInt(streetRow[0]);
        const end = parseInt(streetRow[1]);
        const name = streetRow[2];
        const time = parseInt(streetRow[3]);
        streetHash[name] = {
            start,
            end,
            time,
        };
    }

    return streetHash;
}

export function parseCars(data, streetHash) {
    const carsNum = parseInt(data[0][3]);
    const streetsNum = parseInt(data[0][2]);
    const carRows = data.slice(1 + streetsNum, 1 + streetsNum + carsNum);
    const carsDriving = [];

    for (let i = 0; i < carsNum; i++) {
        const [routeLength, ...route] = carRows[i];
        carsDriving.push([i, route, streetHash]);
    }

    return carsDriving;
}
