"use client";

import "../globals.css";
import { ChildrenProps } from "./ChildrenProps";
import { useEffect, useState } from "react";
import Header from "./ui/Header";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function RootLayout({ children }: ChildrenProps) {
  const [url, setUrl] = useState(window.location.pathname); // 현재 URL 경로를 가져옴
  const [showHeader, setShowHeader] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname=== "/" || pathname === "/chat" || pathname === "/planer" || pathname === "/album") {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [pathname]);

  return (
    <div className="flex flex-col justify-between h-screen w-screen overflow-hidden">
      {showHeader ? "" : <Header />}
      {children}
    </div>
  );
}
