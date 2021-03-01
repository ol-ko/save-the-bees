import { parseSteps, parseStreets, parseCars } from './parsing/parse.js';
import { getInitialSolution, getNeighborSolution, getEnergy } from './optimization/solution.js';
import simulatedAnnealing from 'simulated-annealing';

function parseInput(input) {
    return input.split('\n').map((line) => line.split(' '));
}

function getTemp(prevTemperature) {
    return prevTemperature - 0.001; // linear temperature decreasing
}

export default function run(input) {
    const data = parseInput(input);
    const steps = parseSteps(data);
    const streetHash = parseStreets(data);
    const carsDriving = parseCars(data, streetHash);

    const intersections = getInitialSolution(streetHash);
    const cachedResults = {};
    const potentialMax = carsDriving.length * (1000 + steps);

    const result = simulatedAnnealing({
        initialState: intersections,
        tempMax: 15,
        tempMin: 0.001,
        newState: getNeighborSolution,
        getTemp: getTemp,
        getEnergy: getEnergy(cachedResults, steps, carsDriving, streetHash, potentialMax),
    });

    return formatOutput(result);
}

function formatOutput(result) {
    const lines = [];
    lines.push(Object.keys(result).length);
    for (let key in result) {
        lines.push(key);
        lines.push(result[key].length);
        for (let light of result[key]) {
            lines.push(`${light[0]} ${light[1]}`);
        }
    }
    return lines.join('\n');
}
