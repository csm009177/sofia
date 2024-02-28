"use client";

import React, { useState, useEffect } from "react";
import UrlButton from "./UrlButton";

const LoginButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <>
      {isLoggedIn ? (
        <button onClick={handleLogout}>logout</button>
      ) : (
        <>
          <UrlButton url="/login" title="login" />
          <UrlButton url="signup" title="signup" />
        </>
      )}
    </>
  );
};

export default LoginButton;
