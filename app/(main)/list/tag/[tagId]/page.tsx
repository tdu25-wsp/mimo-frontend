import { tagRepository } from "@/lib/repositories";
import { notFound } from "next/navigation";
import { TagPageClient } from "./TagPageClient";

interface TagPageProps {
    params: Promise<{
        tagId: string;
    }>;
}

export default async function TagPage({ params }: TagPageProps) {
    const { tagId } = await params;

    const tags = await tagRepository.getAll();
    const tag = tags.find((t) => t.id === tagId);

    if (!tag) {
        notFound();
    }

    return <TagPageClient tag={tag} />;
}