import { SummaryDetail } from "@/components/features/SummaryDetail";
import { memoRepository } from "@/lib/repositories";
import { summaryRepository } from "@/lib/repositories";
import { MemoEntry } from "@/types/entry";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function SummaryDetailPage(props: Props) {
    const params = await props.params;
    const id = params.id;
    
    const entry = await summaryRepository.getById(id);

    if (!entry) {
        notFound();
    }

    const sourceMemos = await memoRepository.getByIds(entry.memoIds) as MemoEntry[];

    return <SummaryDetail entry={entry} sourceMemos={sourceMemos} />;
}