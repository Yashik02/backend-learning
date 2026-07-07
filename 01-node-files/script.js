// global object - equivalent to qindow object from browser
//console.log(global);

// process - a importnat global object with info about the running process
//console.log(process);

// about node argv - all the arguments passed as input to a file
//console.log(process.argv);

// require is used to import a file
//const math = require('./math');
// importing a directory
//const fruits = require("./fruits");

// npm - node package manager
// it is a library with useful packages like react.js and express.js etc
// it can be used to package your code for others to use
// it is a command line tool (like an app store for code)

const figlet = require('./figlet-test');
console.log(figlet.generate("saransh"));


// require is the old way before ES6 javascript, now we have a new import keyword
// we only use either require or import for a project not both.

// import {sum, mul, div, sub, PI, g} from "./math.js";

// console.log(sum(1,2));
