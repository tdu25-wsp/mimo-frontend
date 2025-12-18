"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h2 className="text-xl font-bold">予期せぬエラーが発生しました</h2>
      <p className="text-gray-500">読み込みに失敗しました。</p>
      <button
        onClick={() => reset()} // 再試行ボタン
        className="px-4 py-2 bg-primary text-white rounded-lg"
      >
        もう一度試す
      </button>
    </div>
  );
}