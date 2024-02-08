'use client'

import { useRouter } from "next/navigation";

export default function UrlButton({ url, title }: { url: string; title: string }) {
  const router = useRouter();

  const useCustomButton = () => {
    // 클릭 시 해당 URL로 페이지 이동
    router.push(`${url}`);
    console.log(`url : ${url}` )
  };
  return (
    <button onClick={useCustomButton}>{title}</button>
  );
}