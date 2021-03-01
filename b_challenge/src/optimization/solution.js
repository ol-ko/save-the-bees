import _ from 'lodash';
import md5 from 'md5';
import { score, simulate } from '../simulation/simulate.js';

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function getEnergy(cachedResults, steps, carsDriving, streetHash, potentialMax) {
    return function (intersections) {
        const hash = md5(JSON.stringify(intersections));
        if (cachedResults[hash] === undefined) {
            const theScore = score(simulate(steps, carsDriving, intersections, streetHash));
            cachedResults[hash] = potentialMax - theScore;
            console.log(theScore);
        }

        return cachedResults[hash];
    };
}

// [[[a, 1, true], [b, 1, false]], [[c, 1, true]]]
export function getInitialSolution(streetHash) {
    const intersections = {};
    for (const name in streetHash) {
        const end = streetHash[name].end;
        if (intersections[end] === undefined) {
            intersections[end] = [[name, 1, true]]; //new Intersection([new Light(name, 1)]);
        } else {
            intersections[end].push([name, 1, false]); //new Light(name, 1, false)
        }
    }

    return intersections;
}

function prettyPrint(intersections) {
    for (let i = 0; i < intersections.length; i++) {
        console.log(i, ': ', intersections[i].lights.map((l) => [l.street, l.duration, l.isGreen].join('-')).join('|'));
    }
}

export function getNeighborSolution(base) {
    const intersections = _.cloneDeep(base);

    const busyIntersectionIndices = Object.keys(intersections).filter((key) => intersections[key].length > 1);

    const randomIntersectionIndex = busyIntersectionIndices[getRndInteger(0, busyIntersectionIndices.length)];
    // const randomIntersectionIndex = getRndInteger(0, Object.keys(intersections).length);
    const randomLightIndex = getRndInteger(0, intersections[randomIntersectionIndex].length);
    const coinToss = Math.random();

    if (coinToss > 0.5) {
        // bumping a random light
        intersections[randomIntersectionIndex][randomLightIndex][1] += 1;

        //     Math.min(
        //     intersections[randomIntersectionIndex][randomLightIndex][1] + 1,
        //     intersections[randomIntersectionIndex].length
        // );
    } else {
        // choosing a diff light to start
        let greenLightIndex = intersections[randomIntersectionIndex].findIndex((l) => l[2] === true);

        intersections[randomIntersectionIndex][greenLightIndex][2] = false;
        const nextIndex =
            greenLightIndex + 1 >= intersections[randomIntersectionIndex].length ? 0 : greenLightIndex + 1;
        // move to front
        const newGreen = intersections[randomIntersectionIndex].splice(nextIndex, 1);
        intersections[randomIntersectionIndex].unshift(newGreen[0]);
        intersections[randomIntersectionIndex][0][2] = true;
        intersections[randomIntersectionIndex][0][1] += 1;

        //     Math.min(
        //     intersections[randomIntersectionIndex][0][1] + 1,
        //     intersections[randomIntersectionIndex].length
        // );
    }

    // console.log('prev');
    // prettyPrint(base);
    // console.log('next');
    // prettyPrint(intersections);
    // console.log(JSON.stringify(intersections));
    return intersections;
}
