module.exports.paths = {
  root: "/Users/johnrogers/code/rigup/"
};
module.exports.commands = {
  git: {
    checkout: (() => {
      return `git checkout ${process.argv[4]}`;
    })(),
    master: "git checkout master",
    pull: "git pull",
    merge: "git merge master",
    branch: "git branch"
  },
  rake: {
    migrate: "rake db:migrate RAILS_ENV=development",
    bubbles: "rake db:use_bubbles_scrubbed_db"
  },
  packages: {
    npm: "npm install",
    bundle: "bundle install"
  },
  workspaces: require("./../_grindstone/_workspaces.js")
};
module.exports.routines = {
  update: {
    test: [
      ["git", "master"],
      ["git", "pull"],
      ["git", "checkout"],
      ["git", "merge"]
    ],
    rebuildHard: [
      ["git", "master"],
      ["git", "pull"],
      ["packages", "npm"],
      ["packages", "bundle"],
      ["rake", "bubbles"],
      ["rake", "migrate"],
      ["git", "checkout"],
      ["git", "merge"],
      ["rake", "migrate"]
    ],
    rebuildSoft: [
      ["git", "master"],
      ["git", "pull"],
      ["packages", "npm"],
      ["packages", "bundle"],
      ["rake", "migrate"],
      ["git", "checkout"],
      ["git", "merge"],
      ["rake", "migrate"]
    ],
    code: [["git", "master"], ["git", "pull"]],
    packages: [["packages", "npm"], ["packages", "bundle"]],
    db: [["rake", "migrate"]]
  }
};
