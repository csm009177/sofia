"use client";

// Chat 컴포넌트
import { useEffect, useState } from "react";

export default function Chat() {
  const [chatContents, setChatContents] = useState("");
  const [chatLogs, setChatLogs] = useState([]);

  // 채팅 내역을 가져오는 함수
  const fetchChatLogs = async () => {
    try {
      const response = await fetch("/chatlogs");
      const data = await response.json();
      setChatLogs(data);
    } catch (error) {
      console.error("Error fetching chat logs:", error);
    }
  };

  useEffect(() => {
    fetchChatLogs();
  }, []);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
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
      fetchChatLogs();
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
      {/* 채팅 내역을 화면에 출력 */}
      <div>
        {chatLogs.map((log) => (
          <div key={log.chatLogKey}>{log.chatContents}</div>
        ))}
      </div>
    </div>
  );
}
