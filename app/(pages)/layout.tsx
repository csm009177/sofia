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
    if (pathname=== "/login" || pathname === "/signin" ) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [pathname]);

  return (
    <div className="flex flex-col justify-between h-screen w-screen overflow-hidden font-bold">
      {showHeader ? <Header />: null }
      {children}
    </div>
  );
}
