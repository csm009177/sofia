const express = require("express");
const path = require("path");
const db = require("./db");

const app = express();
const PORT = 3000;

// ─────────────────────────────────────
// 미들웨어
// ─────────────────────────────────────
app.use(express.json());

// 정적 파일 서빙 (이 한 줄로 하드코딩 라우터 전부 대체)
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/components", express.static(path.join(__dirname, "..", "components")));

// ─────────────────────────────────────
// 페이지 라우트
// ─────────────────────────────────────
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// ═════════════════════════════════════
// API: 투두리스트
// ═════════════════════════════════════

// 전체 조회
app.get("/api/todos", (req, res) => {
  const todos = db.prepare("SELECT * FROM todos ORDER BY sort_order ASC, id ASC").all();
  res.json(todos);
});

// 추가
app.post("/api/todos", (req, res) => {
  const { text = "", sort_order = 0 } = req.body;
  const result = db.prepare(
    "INSERT INTO todos (text, done, sort_order) VALUES (?, 0, ?)"
  ).run(text, sort_order);
  
  const todo = db.prepare("SELECT * FROM todos WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json(todo);
});

// 수정 (텍스트, 완료 상태)
app.patch("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const fields = [];
  const values = [];

  if (req.body.text !== undefined) {
    fields.push("text = ?");
    values.push(req.body.text);
  }
  if (req.body.done !== undefined) {
    fields.push("done = ?");
    values.push(req.body.done ? 1 : 0);
  }
  if (req.body.sort_order !== undefined) {
    fields.push("sort_order = ?");
    values.push(req.body.sort_order);
  }

  if (fields.length === 0) return res.status(400).json({ error: "변경할 필드 없음" });

  fields.push("updated_at = datetime('now','localtime')");
  values.push(id);

  db.prepare(`UPDATE todos SET ${fields.join(", ")} WHERE id = ?`).run(...values);
  const todo = db.prepare("SELECT * FROM todos WHERE id = ?").get(id);
  res.json(todo);
});

// 삭제
app.delete("/api/todos/:id", (req, res) => {
  db.prepare("DELETE FROM todos WHERE id = ?").run(req.params.id);
  res.json({ ok: true });
});

// ═════════════════════════════════════
// API: 캘린더 일정
// ═════════════════════════════════════

// 월별 조회 (예: /api/events?year=2026&month=3)
app.get("/api/events", (req, res) => {
  const { year, month } = req.query;

  if (year && month) {
    // 해당 월의 시작일~종료일
    const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
    const endMonth = Number(month) === 12 ? 1 : Number(month) + 1;
    const endYear = Number(month) === 12 ? Number(year) + 1 : Number(year);
    const endDate = `${endYear}-${String(endMonth).padStart(2, "0")}-01`;

    const events = db.prepare(
      "SELECT * FROM events WHERE date >= ? AND date < ? ORDER BY date ASC, start_time ASC"
    ).all(startDate, endDate);
    res.json(events);
  } else {
    const events = db.prepare("SELECT * FROM events ORDER BY date ASC").all();
    res.json(events);
  }
});

// 추가
app.post("/api/events", (req, res) => {
  const { title = "", date, start_time = null, end_time = null, color = "#4dabf7", memo = "" } = req.body;
  
  if (!date) return res.status(400).json({ error: "날짜(date)는 필수입니다" });

  const result = db.prepare(
    "INSERT INTO events (title, date, start_time, end_time, color, memo) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(title, date, start_time, end_time, color, memo);

  const event = db.prepare("SELECT * FROM events WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json(event);
});

// 수정
app.patch("/api/events/:id", (req, res) => {
  const { id } = req.params;
  const allowedFields = ["title", "date", "start_time", "end_time", "color", "memo"];
  const fields = [];
  const values = [];

  for (const key of allowedFields) {
    if (req.body[key] !== undefined) {
      fields.push(`${key} = ?`);
      values.push(req.body[key]);
    }
  }

  if (fields.length === 0) return res.status(400).json({ error: "변경할 필드 없음" });

  fields.push("updated_at = datetime('now','localtime')");
  values.push(id);

  db.prepare(`UPDATE events SET ${fields.join(", ")} WHERE id = ?`).run(...values);
  const event = db.prepare("SELECT * FROM events WHERE id = ?").get(id);
  res.json(event);
});

// 삭제
app.delete("/api/events/:id", (req, res) => {
  db.prepare("DELETE FROM events WHERE id = ?").run(req.params.id);
  res.json({ ok: true });
});

// ─────────────────────────────────────
// 서버 시작
// ─────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 서버 실행: http://127.0.0.1:${PORT}/`);
});
