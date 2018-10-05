module.exports.options = {
  method: "POST",
  uri: "/products",
  baseUrl: "http://localhost:3000",
  headers: {
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0MzA2MywidG9rZW5fY291bnQiOjIsImV4cCI6MTU0MTM0MTU4NH0.6LOsI-tfs62OgG801sMIKHWJOl24Ir1WI2p1t_S4XGc"
  },
  json: true
};
module.exports.start = 0;
module.exports.end = undefined;
module.exports.data = require("./../_samples/yard.js");
