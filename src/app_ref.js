const http = require("http");
const path = require("path");
const fs = require("fs");
const hostname = "127.0.0.1";
const port = 3000;

// 파일 캐시 객체
const fileCache = new Map();

// main.js에서 import되는 파일들을 자동 감지하는 함수
function extractImportsFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const importRegex = /import\s+.*\s+from\s+['"`]([^'"`]+)['"`]/g;
    const imports = [];
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1];
      // 상대 경로를 절대 경로로 변환
      if (importPath.startsWith('./') || importPath.startsWith('../')) {
        const basePath = path.dirname(filePath);
        const resolvedPath = path.resolve(basePath, importPath + '.js');
        imports.push(resolvedPath);
      }
    }
    
    return imports;
  } catch (err) {
    console.log(`Error reading file ${filePath}:`, err.message);
    return [];
  }
}

// 모든 컴포넌트와 그 의존성을 캐시에 로드
function loadComponentsToCache() {
  const baseComponents = [
    "components/render.js",
    "components/header.js", 
    "components/main.js",
    "components/footer.js"
  ];
  
  // 기본 컴포넌트들 로드
  baseComponents.forEach(filePath => {
    cacheFile(filePath);
    
    // 각 파일의 import된 파일들도 재귀적으로 로드
    const imports = extractImportsFromFile(filePath);
    imports.forEach(importPath => {
      const relativePath = path.relative(process.cwd(), importPath);
      cacheFile(relativePath);
    });
  });

  // favicon 로드
  cacheFile("public/favicon.ico", true);
}

// 개별 파일을 캐시에 로드하는 함수
function cacheFile(filePath, isBinary = false) {
  fs.readFile(filePath, isBinary ? null : 'utf8', (err, data) => {
    if (!err) {
      fileCache.set(filePath, data);
      console.log(`${filePath} cached in memory`);
    } else {
      console.log(`Failed to cache ${filePath}:`, err.message);
    }
  });
}

// 캐시 로드 실행
loadComponentsToCache();

const serv = http.createServer((req, res) => {
  const url = req.url;
  
  if (url === "/") {
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
  else if (url === "/favicon.ico") {
    const favicon = fileCache.get("public/favicon.ico");
    if (favicon) {
      res.writeHead(200, {
        "Content-Type": "image/x-icon",
        "Cache-Control": "public, max-age=86400",
      });
      res.end(favicon);
    } else {
      res.writeHead(204);
      res.end();
    }
  }
  // 동적 라우팅: /components/로 시작하는 모든 요청 처리
  else if (url.startsWith("/components/") && url.endsWith(".js")) {
    const filePath = url.substring(1); // 앞의 '/' 제거
    const cachedFile = fileCache.get(filePath);
    
    if (cachedFile) {
      res.writeHead(200, {
        "Content-Type": "application/javascript",
        "Cache-Control": "public, max-age=86400",
      });
      res.end(cachedFile);
    } else {
      // 캐시에 없으면 실시간으로 파일 읽기 (개발 중에만)
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (!err) {
          res.writeHead(200, {
            "Content-Type": "application/javascript",
            "Cache-Control": "no-cache", // 개발 중에는 캐시 비활성화
          });
          res.end(data);
        } else {
          res.writeHead(404);
          res.end("File not found");
        }
      });
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