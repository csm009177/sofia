'use client'

import { chatSubmitContext } from "@/app/context/chatContext";
import React, { useState, useEffect, useContext } from "react";

export default function ChatLog() {
  const [chatLogs, setChatLogs] = useState([]);
  const { chatSubmit } = useContext(chatSubmitContext);

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
  )
}