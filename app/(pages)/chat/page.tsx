"use client";

// Chat 컴포넌트
import React, { useContext, useState } from "react";
import ChatTest from "../ui/ChatInputT";
import ChatLogT from "../ui/ChatLogT";
import { chatSubmitContext } from "@/app/context/chatContext";

export default function Chat() {
  const [chatSubmit, setChatSubmit] = useState(null)

  return (
    <div className="flex flex-col justify-between w-screen overflow-hidden">
      <chatSubmitContext.Provider value={ chatSubmit, setChatSubmit }>
        <ChatTest />
        <ChatLogT/>
      </chatSubmitContext.Provider>
    </div>
  );
}
