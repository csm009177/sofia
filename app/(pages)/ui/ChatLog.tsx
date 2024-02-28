"use client";

import React from "react";

export default function ChatLog({ chatLogs }) {
  return (
    <div style={{ overflowY: "scroll", maxHeight: "400px" }}>
      {chatLogs.map((log) => (
        <div key={log.chatLogKey}>
          <strong>{log.username}: </strong>
          {log.chatContents}
        </div>
      ))}
    </div>
  );
}
