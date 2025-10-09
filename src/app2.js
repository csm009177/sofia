const http = require("http");
const path = require("path");
const fs = require("fs");
const hostname = "127.0.0.1";
const port = 3000;

const serv = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile("public/index.html", (err, data) => {
      if (!err) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      } else {
        res.writeHead(404);
        res.end("Page not found");
      }
    });
  } 
  // favicon 처리
  else if (req.url === "/favicon.ico") {
    fs.readFile("public/favicon.ico", (err, data) => {
      if (!err) {
        res.writeHead(200, {
          "Content-Type": "image/x-icon",
          "Cache-Control": "public, max-age=86400",
        });
        res.end(data);
      } else {
        res.writeHead(204); // No Content
        res.end();
      }
    });
  }
  // 🎯 자동 JavaScript 파일 라우팅
  else if (req.url.startsWith('/components/') && req.url.endsWith('.js')) {
    const filePath = req.url.replace('/components/', 'components/');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (!err) {
        res.writeHead(200, {
          'Content-Type': 'application/javascript',
          'Cache-Control': 'public, max-age=86400'
        });
        res.end(data);
        console.log(`✅ Served: ${filePath}`);
      } else {
        console.log(`❌ File not found: ${filePath}`);
        res.writeHead(404);
        res.end('File not found');
      }
    });
  }
  // 🎯 자동 정적 파일 라우팅 (CSS, 이미지 등)
  else if (req.url.startsWith('/public/')) {
    const filePath = req.url.replace('/public/', 'public/');
    const ext = path.extname(filePath).toLowerCase();
    
    const mimeTypes = {
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.ico': 'image/x-icon'
    };

    fs.readFile(filePath, (err, data) => {
      if (!err) {
        res.writeHead(200, {
          'Content-Type': mimeTypes[ext] || 'application/octet-stream',
          'Cache-Control': 'public, max-age=86400'
        });
        res.end(data);
      } else {
        res.writeHead(404);
        res.end('File not found');
      }
    });
  }
  else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

serv.listen(port, hostname, () => {
  console.log(`🚀 Server running at http://${hostname}:${port}/`);
  console.log(`📁 Auto-routing enabled for /components/*.js`);
});