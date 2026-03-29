/**
 * 투두리스트 API 클라이언트
 * - DB에 저장/조회/수정/삭제
 */

export const TodoAPI = {
  async 전체조회() {
    const res = await fetch("/api/todos");
    return res.json();
  },

  async 추가(text = "", sort_order = 0) {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, sort_order }),
    });
    return res.json();
  },

  async 수정(id, data) {
    const res = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async 삭제(id) {
    const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });
    return res.json();
  },
};

export const EventAPI = {
  async 월별조회(year, month) {
    const res = await fetch(`/api/events?year=${year}&month=${month}`);
    return res.json();
  },

  async 전체조회() {
    const res = await fetch("/api/events");
    return res.json();
  },

  async 추가(data) {
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async 수정(id, data) {
    const res = await fetch(`/api/events/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async 삭제(id) {
    const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
    return res.json();
  },
};
