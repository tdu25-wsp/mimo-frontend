'use client';
import { MemoEntry, SummaryEntry } from "@/types/entry";
import { Header } from "../layout/Header";
import { EntryList } from "./EntryList";
import Text from "../ui/Text";
import Heading from "../ui/Heading";

interface SummaryDetailProps {
    entry: SummaryEntry;
    sourceMemos: MemoEntry[];
}

export const SummaryDetail = ({ entry, sourceMemos }: SummaryDetailProps) => {
    const isJournaling = entry.type === "journaling";

    return (
        <div className="bg-gray-background min-h-screen">
            <Header
                title={isJournaling ? "ジャーナリング要約詳細" : "要約詳細"}
                showBackButton={true}
            />

            {/* コンテンツラッパー */}
            <div className="max-w-xl mx-auto p-4 space-y-6">

                <section className="mb-12">
                    <Heading level="h2" className="mb-2 text-primary-text text-2xl">
                        {entry.title}
                    </Heading>
                    <Text className="whitespace-pre-wrap text-on-primary-text">
                        {entry.content}
                    </Text>
                </section>

                {/* 要約元メモセクション */}
                <section className="space-y-4">
                    <h3 className="font-semibold text-lg text-on-primary-text">
                        要約元メモ ({sourceMemos.length}件)
                    </h3>
                    <div className="pb-24">
                        <EntryList
                            entries={sourceMemos}
                            emptyMessage="要約元のメモがありません"
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}