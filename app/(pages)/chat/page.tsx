"use client";

// Chat 컴포넌트
import { useState } from "react";

export default function Chat() {
  const [chatMessage, setChatMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      await fetch('/chatlogForm', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatContents: chatMessage }),
      });
      // 채팅 메시지를 서버로 전송한 후 입력 필드 초기화
      setChatMessage("");
    } catch (error) {
      console.error("Error sending chat message:", error);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full w-screen overflow-hidden">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
