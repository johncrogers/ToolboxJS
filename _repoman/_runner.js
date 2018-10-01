const config = require("./config.js");
const routineRunner = require("./_routineRunner.js");
let routine = process.argv[2];
let target = process.argv[3];
routineRunner.routine(config.routines[routine][target]);
