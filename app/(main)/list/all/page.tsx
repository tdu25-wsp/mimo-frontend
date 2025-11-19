import { Header } from "@/components/layout/Header";
import { getMockMemos } from "@/lib/converters";
import { Share } from "lucide-react";

export default function AllMemosPage() {

  const mockMemos = getMockMemos();

  return (
    <div>
      <Header
        title="すべて"
        showBackButton={true}
        rightContent={
          <>
            <button className="p-2 hover:bg-gray-100 rounded-full"><Share size={20} /></button>
            <button className="p-2 hover:bg-gray-100 rounded-full"><p>選択</p></button>
          </>
        }
      />

      <h1>AllMemosView</h1>

      {/* 仮でモックメモデータを表示 */}
      <ul>
        {mockMemos.map((memo) => (
          <li key={memo.id} className="my-16 space-y-2">
            
            <p>{memo.content}</p>
            {/* createdDate */}

            <p>メモ作成日時</p>
            <p>{memo.createdAt}</p>
            <p>メモ更新日時</p>
            <p>{memo.updatedAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
