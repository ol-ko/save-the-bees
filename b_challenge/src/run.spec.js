const { run } = require('./run');

describe('b_challenge', () => {
    it('fails', () => {
        expect(run()).toEqual('Save the trees!');
    });
});
