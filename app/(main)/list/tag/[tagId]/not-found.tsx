import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-full p-8">
            <h2 className="text-2xl font-bold mb-4">タグが見つかりません</h2>
            <p className="text-muted-text mb-6">
                指定されたタグは存在しないか、削除された可能性があります。
            </p>
            <Link
                href="/list/all"
                className="px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary/90"
            >
                すべてのエントリーに戻る
            </Link>
        </div>
    );
}