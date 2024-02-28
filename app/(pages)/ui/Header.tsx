'use client'

import { useEffect, useState } from "react";
import UrlButton from "./UrlButton";
import LoginButton from "./LoginButton";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    setIsLoggedIn(!!token); // 토큰이 존재하면 true, 아니면 false로 설정
  }, [isLoggedIn]);

  return (
    <div className="flex flex-row w-screen h-48 justify-between">
      <div className="flex flex-row h-24 w-1/4 p-5 justify-between">
        <UrlButton url="chat" title="chat" />
        <UrlButton url="planer" title="planer" />
        <UrlButton url="album" title="album" />
      </div>
        <div className="flex flex-row h-24 w-1/6 p-5 justify-between">
          <LoginButton/>
        </div>
    </div>
  );
}
