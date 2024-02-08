'use client'

import "../globals.css";
import { ChildrenProps } from "./ChildrenProps";
import { useState } from "react";
import Header from './ui/Header';


export default function RootLayout({ children }:ChildrenProps) {
  const [url, setUrl] = useState(window.location.pathname); // 현재 URL 경로를 가져옴
  return (
    <div  className='flex flex-col justify-between h-screen w-screen overflow-hidden'>
      {url=== '/' && <Header/>}     
      {/* {url === "/" && <Header/>}
      {url === "/" && <Header/>}
      {url === "/" && <Header/>} */}
      {children}
    </div>
  )
}
