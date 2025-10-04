const http = require("http");
const path = require("path");
const fs = require("fs");
const hostname = "127.0.0.1";
const port = 3000;

// 파일 캐시 객체
const fileCache = {
  render: null,
  header: null,
  main: null,
  footer: null,
  calendar: null  // calendar 추가
};

// 서버 시작시 컴포넌트 파일들을 메모리에 로드
function loadComponentsToCache() {
  const componentsToCache = [
    { key: "render", path: "components/render.js" },
    { key: "header", path: "components/header.js" },
    { key: "main", path: "components/main.js" },
    { key: "footer", path: "components/footer.js" },
    { key: "calendar", path: "components/main/calendar.js" }  // calendar 추가!
  ];

  componentsToCache.forEach(({ key, path }) => {
    fs.readFile(path, (err, data) => {
      if (!err) {
        fileCache[key] = data;
        console.log(`${path} cached in memory`);
      } else {
        console.log(`Failed to cache ${path}:`, err.message);
      }
    });
  });
}

// 캐시 로드 실행
loadComponentsToCache();

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
  else if (req.url === "/components/header.js") {
    if (fileCache.header) {
      res.writeHead(200, {
        "Content-Type": "application/javascript",
        "Cache-Control": "public, max-age=86400",
      });
      res.end(fileCache.header);
    } else {
      res.writeHead(404);
      res.end("File not found");
    }
  } 
  else if (req.url === "/components/footer.js") {
    if (fileCache.footer) {
      res.writeHead(200, {
        "Content-Type": "application/javascript",
        "Cache-Control": "public, max-age=86400",
      });
      res.end(fileCache.footer);
    } else {
      res.writeHead(404);
      res.end("File not found");
    }
  } 
  else if (req.url === "/components/main.js") {
    if (fileCache.main) {
      res.writeHead(200, {
        "Content-Type": "application/javascript",
        "Cache-Control": "public, max-age=86400",
      });
      res.end(fileCache.main);
    } else {
      res.writeHead(404);
      res.end("File not found");
    }
  }
  // calendar.js 라우팅 추가!
  else if (req.url === "/components/main/calendar.js") {
    if (fileCache.calendar) {
      res.writeHead(200, {
        "Content-Type": "application/javascript",
        "Cache-Control": "public, max-age=86400",
      });
      res.end(fileCache.calendar);
    } else {
      res.writeHead(404);
      res.end("File not found");
    }
  }
  else if (req.url === "/components/render.js") {
    if (fileCache.render) {
      res.writeHead(200, {
        "Content-Type": "application/javascript",
        "Cache-Control": "public, max-age=86400",
      });
      res.end(fileCache.render);
    } else {
      res.writeHead(404);
      res.end("File not found");
    }
  }
  // ... 나머지 라우팅
  else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

serv.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});