// ChatLog 컴포넌트
"use client";
// ChatLog 컴포넌트
import React from "react";

export default function ChatLog({ chatLogs }) {
  return (
    <div style={{ overflowY: "scroll", maxHeight: "400px" }}>
      {chatLogs.map((log) => (
        <div key={log.chatLogKey}>{log.chatContents}</div>
      ))}
    </div>
  );
}

