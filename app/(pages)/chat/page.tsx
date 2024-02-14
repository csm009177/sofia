"use client";

// Chat 컴포넌트
import React, { useContext, useState } from "react";
import ChatTest from "../ui/ChatInputT";
import { chatSubmitContext } from "@/app/context/chatContext";
import ChatLog from "../ui/ChatLogT";

export default function Chat() {
  const [chatSubmit, setChatSubmit] = useState("")
  return (
    <div className="flex flex-col justify-between w-screen overflow-hidden">
      <chatSubmitContext.Provider value={ chatSubmit, setChatSubmit }>
        <ChatTest />
        <ChatLog/>
      </chatSubmitContext.Provider>
    </div>
  );
}
