"use client";

import React, { useState, useEffect, useContext } from "react";
import { chatSubmitContext } from "@/app/context/chatContext";

export default function ChatInputT() {
  const [chatContents, setChatContents] = useState("");
  const { chatSubmit, setChatSubmit } = useContext(chatSubmitContext);
  useEffect(()=>{

  },[chatSubmit])
  
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
    <form onSubmit={handleChatSubmit} style={{width:"100px"}}>
      <input
        type="text"
        value={chatContents}
        onChange={(e) => setChatContents(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
