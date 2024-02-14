
"use client";

import React, { useState, useEffect, useContext } from "react";
import { chatSubmitContext } from "@/app/context/chatContext";

// ChatLog 컴포넌트
export default function ChatLogT() {
  const [chatLogs, setChatLogs] = useState([]);
  const { chatSubmit } = useContext(chatSubmitContext);
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
  }, [chatSubmit]);

  return (
    <div style={{ overflowY: "scroll", maxHeight: "400px" }}>
      {chatLogs.map((log) => (
        <div key={log.chatLogKey}>{log.chatContents}</div>
      ))}
    </div>
  );
}

