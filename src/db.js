const Database = require("better-sqlite3");
const path = require("path");

// DB 파일 경로 (프로젝트 루트/data/sofia.db)
const DB_PATH = path.join(__dirname, "..", "data", "sofia.db");

// data 폴더 없으면 생성
const fs = require("fs");
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(DB_PATH);

// WAL 모드 (성능 향상)
db.pragma("journal_mode = WAL");

// ─────────────────────────────────────
// 테이블 생성
// ─────────────────────────────────────

db.exec(`
  -- 투두리스트
  CREATE TABLE IF NOT EXISTS todos (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    text        TEXT    NOT NULL DEFAULT '',
    done        INTEGER NOT NULL DEFAULT 0,
    sort_order  INTEGER NOT NULL DEFAULT 0,
    created_at  TEXT    NOT NULL DEFAULT (datetime('now','localtime')),
    updated_at  TEXT    NOT NULL DEFAULT (datetime('now','localtime'))
  );

  -- 캘린더 일정
  CREATE TABLE IF NOT EXISTS events (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT    NOT NULL DEFAULT '',
    date        TEXT    NOT NULL,
    start_time  TEXT,
    end_time    TEXT,
    color       TEXT    NOT NULL DEFAULT '#4dabf7',
    memo        TEXT    NOT NULL DEFAULT '',
    created_at  TEXT    NOT NULL DEFAULT (datetime('now','localtime')),
    updated_at  TEXT    NOT NULL DEFAULT (datetime('now','localtime'))
  );
`);

console.log("✅ DB 초기화 완료:", DB_PATH);

module.exports = db;
