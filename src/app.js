const http = require("http");
const path = require("path");
const fs = require("fs");
const hostname = "127.0.0.1";
const port = 3000;

// 렌더 파일을 서버 시작시 메모리에 로드
let renderCache = null;
fs.readFile("components/render.js", (err, data) => {
  if (!err) {
    renderCache = data;
    console.log("render.js cached in memory");
  }
});

const serv = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile("public/index.html", (err, data) => {
      if (data) {
        res.end(data);
      } else {
        res.writeHead(404);
        res.end("Page not found");
        console.log(err);
      }
    });
  } 
  else if(req.url === "/components/header.js"){
    fs.readFile("components/header.js", (err, data) => {
      if (data) {
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(data);
      } else {
        res.writeHead(404);
        res.end("File not found");
        console.log(err);
      }
    });
  }
  else if (req.url === "/favicon.ico") {
    fs.readFile("public/favicon.ico", (err, data) => {
      if (data) {
        res.writeHead(200, { "Content-Type": "image/x-icon" });
        res.end(data);
      } else {
        res.writeHead(404);
        res.end("Favicon not found");
      }
    });
  } else if (req.url === "/components/render.js") {
    if (renderCache) {
      res.writeHead(200, {
        "Content-Type": "application/javascript",
        "Cache-Control": "public, max-age=3600",
      });
      res.end(renderCache);
    } else {
      res.writeHead(404);
      res.end("File not found");
    }
  } else if (req.url === "/class") {
    fs.readFile("public/login.html", (err, data) => {
      if (data) {
        res.end(data);
      } else {
        res.writeHead(404);
        res.end("Page not found");
        console.log(err);
      }
    });
  } else if (req.url === "/homework") {
    fs.readFile("public/login.html", (err, data) => {
      if (data) {
        res.end(data);
      } else {
        res.writeHead(404);
        res.end("Page not found");
        console.log(err);
      }
    });
  } else if (req.url === "/8month") {
    fs.readFile("public/login.html", (err, data) => {
      if (data) {
        res.end(data);
      } else {
        res.writeHead(404);
        res.end("Page not found");
        console.log(err);
      }
    });
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

serv.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
