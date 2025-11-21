import { Header } from "@/components/layout/Header";
import { getMockMemos, getMockSummaries } from "@/lib/converters";
import { Share } from "lucide-react";

export default function AllMemosPage() {
  const entries = [...getMockMemos(), ...getMockSummaries()];

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
        {entries.map((entry) => (
          <li key={entry.id} className="border-b border-gray-200 p-4">
            <p className="text-sm text-gray-500 mb-1">ID: {entry.id} | Type: {entry.type}</p>
            <p>{entry.content}</p>
          </li>
        ))}
      </ul>

    </div>
  );
}
