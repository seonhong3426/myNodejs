const fs = require("fs");

//readfileSync

/*
console.log("A");
const result = fs.readFileSync("sample.txt", "utf-8");
console.log(result);
console.log("C");
*/

console.log("A");
fs.readFile("sample.txt", "utf-8", function (err, result) {
  console.log(result);
});

console.log("C");
