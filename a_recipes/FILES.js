const fs = require('fs');
const readline = require('readline');

// read sync
const input = fs.readFileSync('input/a_example').toString();

// overwrite all sync
fs.writeFileSync('output/test', input);

// append sync
fs.appendFileSync('output/test', input);

// append sync with new line
for (let i = 0; i < 1000; i++) {
    fs.appendFileSync('output/test', i + '\r\n');
}

// write stream
const writeStream = fs.createWriteStream('output/streamoutput');
for (let i = 0; i < 100000; i++) {
    writeStream.write(i + '\r\n');
}
writeStream.on('finish', () => {
    console.log('wrote all data to file');
});
console.log('ending things');
writeStream.end();

// read stream line by line
const readStream = fs.createReadStream('input/a_example');
const rl = readline.createInterface({
    input: readStream,
});
rl.on('line', (line) => {
    console.log(line);
});
