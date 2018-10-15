const fs = require("fs");
const request = require("request-promise-native");

async function sendRequests() {
  const { options, start, end, data } = require("./categories/config.js");
  const products = data.products;
  const categoryHash = data.categoryHash;
  const loopTo = end || products.length;
  let requestCount = 0;
  let totalRequests = loopTo - start;
  console.log(`REQUEST START: ${start}`);
  console.log(`REQUEST END: ${loopTo}`);

  for (let productIndex = start; productIndex < loopTo; productIndex++) {
    let product = products[productIndex];
    product.yard_category_id = categoryHash[product.category];
    options.body = product;
    console.log(`Building request for ${product.title}:`);

    await request(options)
      .then(res => {
        requestCount++;
        console.log(
          `  > ${product.title} inserted. (${requestCount} of ${totalRequests})`
        );
      })
      .catch(err => {
        if (err) {
          console.log(`\n  > ERROR: ${product.title}`);
          console.log(
            `    -> Product Category: ${product.category}\n` +
              `    -> Category Hash: ${categoryHash[product.category]}\n`
          );
          fs.writeFile(
            `./_holysheet/yard/logs/${product.title}.html`,
            err.message,
            err => {
              if (err) {
                console.log("ERROR WHEN WRITING ERROR FILE.");
              }
              console.log("  > Error response written.");
            }
          );
        }
      });
  }
}
sendRequests();
