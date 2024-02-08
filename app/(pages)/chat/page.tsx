"use client";

import { useCallback, useState } from "react";


// Chat 컴포넌트
export default function Chat() {
  const [message, setMessage] = useState("");

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch('/chatlogForm', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      // 입력 후 입력란 초기화
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full w-screen overflow-hidden">
      <form onSubmit={handleMessageSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
