import run from './run.js';
import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.resolve('./src/data/input/a.txt')).toString();
fs.writeFileSync('./src/data/output/a.txt', run(input));
