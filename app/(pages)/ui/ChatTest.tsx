"use client";

import React, { useState } from "react";

export default function ChatTest() {
  const [chatContents, setChatContents] = useState("");
  
  const handleChatSubmit = async () => {
    try {
      await fetch("/chatlogForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatContents }),
      });
      console.log("Chat submitted successfully!");
      // 채팅이 제출되면 채팅 내역을 다시 가져옴

    } catch (error) {
      console.error("Error submitting chat:", error);
    }
  };

  return (
    <form action={handleChatSubmit}>
      <input type="text" 
      value={chatContents}
      onChange={(e) => setChatContents(e.target.value)} />
      <button type="submit">submit</button>
    </form>
  );
}
