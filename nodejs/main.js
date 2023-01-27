const http = require("http");
const fs = require("fs");
const url = require("url");

function templateHTML(title, list, body) {
  return `
  <!doctype html>
  <html>
  <head>
  <title>WEB1 - ${title}</title>
  <meta charset="utf-8">
  </head>
  <body>
  <h1><a href="/">WEB</a></h1>
  ${list}
  ${body}
  </body>
  </html>
  `;
}

function templateList(filelist) {
  let list = "<ol>";
  let i = 0;
  while (i < filelist.length) {
    list += `<li><a href="?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list + "</ol>";
  return list;
}

const app = http.createServer(function (request, response) {
  const _url = request.url;
  const queryData = url.parse(request.url, true).query; //url의 ?변수명=값 (QueryString)
  const pathname = url.parse(_url, true).pathname;

  let title = queryData.id;

  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir("./data", function (error, filelist) {
        title = "Welcome";
        const description = "Hello Node.js";
        const list = templateList(filelist);

        const template = templateHTML(
          title,
          list,
          `<h2>${title}</h2>${description}`
        );
        response.writeHead(200);
        response.end(template); //응답.
      });
    } else {
      fs.readdir("./data", function (error, filelist) {
        const list = templateList(filelist);
        fs.readFile(`data/${title}`, "utf-8", function (err, description) {
          const template = templateHTML(
            title,
            list,
            `<h2>${title}</h2>${description}`
          );
          response.writeHead(200);
          response.end(template); //응답.
        });
      });
    }
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000);
