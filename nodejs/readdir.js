const testFolder = "data";
const fs = require("fs");

//파일의 목록을 배열로 만든다.
fs.readdir(testFolder, function (error, filelist) {
  console.log(filelist);
});
