// a index file is required to import files from a directory

const apple = require('./apple');
const banana = require('./banana');
const orange = require('./orange');

let fruits = {
    apple: apple,
    banana: banana,
    orange: orange
};

module.exports = fruits;