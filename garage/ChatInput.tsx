"use client";

// ChatInput 컴포넌트
import React, { useState } from "react";

function ChatInput({ onSubmit }) {
  const [chatContents, setChatContents] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(chatContents);
    setChatContents(""); // 채팅 입력 후 입력값 초기화
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={chatContents}
        onChange={(e) => setChatContents(e.target.value)}
      />
      <button type="submit">submit</button>
    </form>
  );
}

export default ChatInput;
