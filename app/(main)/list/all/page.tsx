import { getMockMemos } from "@/lib/converters";

export default function AllMemosPage() {

  const mockMemos = getMockMemos();

  return (
    <div>
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
