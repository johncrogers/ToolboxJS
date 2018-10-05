const { token } = require("./config.js");
const data = require("./../_samples/yard.js").categories;
const request = require("request-promise");
const fs = require("fs");

let requests = [];
let categoryHash = {};
let categoryCount = 0;
let totalCategories = data.length;
data.map(category => {
  let options = {
    method: "POST",
    uri: "/api/yard/categories",
    baseUrl: "http://localhost:3000",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: category,
    json: true
  };
  requests.push(
    request(options, (err, res, body) => {
      if (err) {
        console.log(`\n  > ERROR (${err.errno}): ${options.body.name}`);
      } else {
        categoryHash[body.name] = body.id;
        categoryCount++;
        console.log(
          `  > ${
            options.body.name
          } inserted. (${categoryCount} of ${totalCategories})`
        );
        let hashKeys = Object.keys(categoryHash);
        let hashSize = hashKeys.length;
        if (hashSize === data.length) {
          console.log(JSON.stringify(categoryHash));
        }
      }
    })
  );
});
Promise.all(requests)
  .then(values => {
    // console.log("Success");
  })
  .catch(err => {
    console.log("ERROR:");
    // [ 'name', 'statusCode', 'message', 'error', 'options', 'response' ]
    console.log(`  > Name: ${err.name}`);
    console.log(`  > Status Code: ${err.statusCode}`);
    console.log("  > Message:", typeof err.message);
    fs.writeFile(
      "./_holysheet/yard/logs/categoryInserter.html",
      err.message,
      err => {
        if (err) {
          console.log("ERROR WHEN WRITING ERROR FILE.");
        }
        console.log("  > Error response written.");
      }
    );
  });
