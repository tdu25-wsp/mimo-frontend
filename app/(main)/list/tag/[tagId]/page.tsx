'use client';

import { notFound } from "next/navigation";
import { TagPageClient } from "./TagPageClient";
import { use } from "react";
import { useMainStore } from "@/lib/stores/mainStore";

interface TagPageProps {
    params: Promise<{
        tagId: string;
    }>;
}

export default function TagPage({ params }: TagPageProps) {
    const { tagId } = use(params);

    const tags = useMainStore((state) => state.tags);
    const tag = tags.find((t) => t.id === tagId);

    if (!tag) {
        notFound();
    }

    return <TagPageClient tag={tag} />;
}