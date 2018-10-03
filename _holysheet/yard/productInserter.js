const data = require("./../_samples/yard.js").categories;
const request = require("request");

let requests = [];
data.map(category => {
  let options = {
    method: "POST",
    uri: "/yard/products",
    baseUrl: "http://localhost:3000/api",
    headers: {
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0MzA2MywidG9rZW5fY291bnQiOjEsImV4cCI6MTU0MTAwMjUzM30.rKgX5Lb5C5z1HdfUW3COh42PhbLObSh0SmSPLjHf6x8"
    },
    body: category,
    json: true
  };
  requests.push(
    new Promise((resolve, reject) => {
      resolve(
        request(options, (err, res, body) => {
          if (err) {
            console.log("ERR:", err);
          }
          console.log("RESPONSE:", body);
        })
      );
    })
  );
});
Promise.all(requests)
  .then(values => {
    console.log("Success");
  })
  .catch(err => {
    console.log("ERR:", err);
  });
