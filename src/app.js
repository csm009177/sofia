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
        res.end(console.log(err));
      }
      fs.readFile("public/favicon.ico", (err, data) => {
        if (data) {
          fs.writeFile("public/favicon-32x32.png", data, (err) => {
            if (err) throw err;
            console.log("Favicon saved!");
          });
        }
      });
    });
  } else if (req.url === "/components/render.js") {
    if (renderCache) {
      res.writeHead(200, { 
        'Content-Type': 'application/javascript',
        'Cache-Control': 'public, max-age=3600' // 1시간 캐싱
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
        res.end(console.log(err));
      }
    });
  } else if (req.url === "/homework") {
    fs.readFile("public/login.html", (err, data) => {
      if (data) {
        res.end(data);
      } else {
        res.end(console.log(err));
      }
    });
  } else if (req.url === "/8month") {
    fs.readFile("public/login.html", (err, data) => {
      if (data) {
        res.end(data);
      } else {
        res.end(console.log(err));
      }
    });
  }
});

serv.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});