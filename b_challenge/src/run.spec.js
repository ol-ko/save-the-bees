const { run } = require('./run');
const fs = require('fs');

const input = fs.readFileSync('./input/a.txt').toString();
const output = fs.readFileSync('./output/b.txt').toString();

describe('b_challenge', () => {
    it('fails', () => {
        expect(run(input)).toEqual(output);
    });
});
