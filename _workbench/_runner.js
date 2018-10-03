const workspaces = require("./_workspaces.js");
let task = process.argv[2];
workspaces[task]();
