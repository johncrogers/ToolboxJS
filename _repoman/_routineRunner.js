module.exports.command = (section, command) => {
  const { commands, paths } = require("./config.js");
  const { execSync } = require("child_process");
  execSync(commands[section][command], { cwd: paths.root, stdio: [0, 1, 2] });
};
module.exports.routine = routine => {
  const { commands } = require("./config.js");
  console.log(`BEGIN ROUTINE:`);
  routine.forEach(command => {
    console.log("  -> running command:", commands[command[0]][command[1]]);
    this.command(command[0], command[1]);
  });
};
