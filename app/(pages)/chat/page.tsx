"use client";

// Chat 컴포넌트
import { useState } from "react";


export default function Chat() {
  const [chatContents, setChatContents] = useState("");
  
  const handleChatSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      await fetch('/chatlogForm', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatContents }),
      });
      console.log("Chat submitted successfully!");
    } catch (error) {
      console.error("Error submitting chat:", error);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full w-screen overflow-hidden">
      <form onSubmit={handleChatSubmit}>
        <input
          type="text"
          value={chatContents}
          onChange={(e) => setChatContents(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
