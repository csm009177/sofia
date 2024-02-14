'use client'

import React, { useState, useEffect } from "react";

export default function SignUp() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/signupForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Identification: userId, pw: password }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error signing up:", error);
      setMessage("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userId">아이디:</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">비밀번호:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">회원가입</button>
          {message && <p>{message}</p>}
        </form>

  );
}