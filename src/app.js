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
  calendar: null,
  favicon: null // favicon 추가
};

// 서버 시작시 컴포넌트 파일들을 메모리에 로드
function loadComponentsToCache() {
  const componentsToCache = [
    { key: "render", path: "components/render.js" },
    { key: "header", path: "components/header.js" },
    { key: "main", path: "components/main.js" },
    { key: "footer", path: "components/footer.js" },
    { key: "calendar", path: "components/main/calendar.js" },
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

  // favicon 별도 로드 (바이너리 파일)
  fs.readFile("public/favicon.ico", (err, data) => {
    if (!err) {
      fileCache.favicon = data;
      console.log("favicon.ico cached in memory");
    } else {
      console.log("Failed to cache favicon.ico:", err.message);
    }
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
  // favicon 라우터 추가
  else if (req.url === "/favicon.ico") {
    if (fileCache.favicon) {
      res.writeHead(200, {
        "Content-Type": "image/x-icon",
        "Cache-Control": "public, max-age=86400", // 24시간 캐시
      });
      res.end(fileCache.favicon);
    } else {
      // favicon이 없으면 빈 응답 (404 대신)
      res.writeHead(204); // No Content
      res.end();
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
  // ... 기존 라우터들 ...
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
  else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

serv.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});