module.exports.helpNotes = {
  create: {
    description: "Creates a new workspace file.",
    example: "wb create rigup /Users/johnrogers/code/rigup/",
    arguments: {
      name: "Name used to reference the workspace in the future.",
      path: "Path to target directory"
    }
  },
  open: {
    description: "Opens a workspace for normal use.",
    example: "wb open rigup",
    arguments: {
      name:
        "Name of the target workspace to open. [ Do not include file extension. ]"
    }
  },
  edit: {
    description: "Opens up a workspace configuration for editing.",
    example: "wb edit rigup",
    arguments: {
      name: "Target workspace to edit."
    }
  },
  remove: {
    description: "Removes target workspace configuration file.",
    example: "wb remove rigup",
    arguments: {
      name:
        "Target workspace to be deleted. [ Do not include file path or extension. ]"
    }
  },
  show: {
    description: "Opens the directory that contains all workspace files.",
    example: "wb show",
    arguments: {}
  },
  list: {
    description: "Displays a list of the currently available workspaces.",
    example: "wb list",
    arguments: {}
  }
};
module.exports.help = () => {
  console.log("AVAILABLE COMMANDS:");
  let commands = Object.keys(this.helpNotes);
  commands.forEach(command => {
    let commandArguments = Object.keys(this.helpNotes[command].arguments);
    console.log(`\n  > ${command}: ${this.helpNotes[command].description}`);
    console.log(`    -> Example: ${this.helpNotes[command].example}`);
    if (commandArguments.length) {
      console.log("    -> Arguments:");
      commandArguments.forEach(argument => {
        console.log(
          `      - ${argument}: ${this.helpNotes[command].arguments[argument]}`
        );
      });
    }
  });
};
module.exports.show = () => {
  const config = require("./config.js").config;
  const child_process = require("child_process");
  console.log("Opening workspace folder:");
  child_process.exec(`open ${config.pathToWorkspaces}/`);
};
module.exports.list = () => {
  const config = require("./config.js").config;
  const fs = require("fs");
  process.chdir(config.pathToWorkspaces);
  fs.readdir(process.cwd(), function(err, files) {
    if (err) {
      console.log(err);
      return;
    }
    let filter = process.argv[3];
    console.log("Current Workspaces:", filter ? `by ${filter}` : "");
    files.sort().forEach(file => {
      if (filter && file.includes(filter)) {
        console.log(`  -> ${file}`);
      }
      if (!filter) {
        console.log(`  -> ${file}`);
      }
    });
  });
};
module.exports.open = () => {
  const config = require("./config.js").config;
  const child_process = require("child_process");
  let fileName = process.argv[3];
  let path = `open ${config.pathToWorkspaces}/${fileName}.code-workspace`;
  console.log(`Opening workspace: ${process.argv[3]}`);
  console.log(`  -> path: ${path}`);
  child_process.exec(path);
};
module.exports.create = () => {
  const config = require("./config.js").config;
  const fs = require("fs");
  let fileName = `${config.pathToWorkspaces}/${process.argv[3]}.code-workspace`;
  let path = process.argv[4];
  let contents = `{
  "folders": [
    {
      "path": "${path}"
    }
  ],
  "settings": {}
}`;
  console.log(`Creating workspace: ${process.argv[3]}`);
  fs.writeFile(fileName, contents, err => {
    if (err) {
      console.log(`ERROR:`, err);
    }
  });
};
module.exports.edit = () => {
  const config = require("./config.js").config;
  const child_process = require("child_process");
  let command = `open -t ${config.pathToWorkspaces}/${
    process.argv[3]
  }.code-workspace`;
  console.log(`Open to edit: ${process.argv[3]}`);
  child_process.exec(command);
};
module.exports.remove = () => {
  const config = require("./config.js").config;
  const fs = require("fs");
  let fileName = `${config.pathToWorkspaces}/${process.argv[3]}.code-workspace`;
  console.log(`Deleting workspace ${process.argv[3]}`);
  fs.unlink(fileName, err => {
    if (err) {
      console.log(err);
    }
    console.log("  -> Successfully deleted.");
  });
};
module.exports.init = () => {
  // const fs = require("fs");
  // let contents = `module.exports.config = {
  //   pathToWorkspaces: "./Desktop/ToolboxJS/_workbench/personal"
  // };`;
  // const readline = require("readline");
  // const rl = readline.createInterface({
  //   input: process.stdin,
  //   output: process.stdout
  // });
  // rl.question("What do you think of Node.js? ", answer => {
  //   // TODO: Log the answer in a database
  //   console.log(`Thank you for your valuable feedback: ${answer}`);
  //   rl.close();
  // });
  // fs.writeFile(fileName, contents, err => {
  //   if (err) {
  //     console.log(`ERROR:`, err);
  //   }
  // });
};
