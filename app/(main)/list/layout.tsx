'use client';

import { ListNavigation } from "@/components/layout/ListNavigation";
import { useMainStore } from "@/lib/stores/mainStore";
import { NavigationSection } from "@/types/navigation.types";

export default function ListLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const tags = useMainStore((state) => state.tags);

    const listSections: NavigationSection[] = [
        {
            title: "",
            items: [
                { href: "/list/search", name: "検索", icon: "Search", color: "text-primary" },
                { href: "/list/all", name: "すべて", icon: "Folder", color: "text-primary" },
                { href: "/list/summary", name: "要約", icon: "WandSparkles", color: "text-primary" },
                { href: "/list/journaling-summary", name: "ジャーナリング要約", icon: "BookHeart", color: "text-primary" },
            ],
        },
        {
            title: "タグ",
            actionIcon: "Plus",
            items: tags.map((tag) => ({
                href: `/list/tag/${tag.id}`,
                name: tag.name,
                icon: "Tag",
                color: tag.color || "text-gray-500",
            })),
        },
    ];

    return (
        <div className="flex flex-col md:flex-row h-full bg-gray-background">
            <ListNavigation navTitle={"リスト"} sections={listSections} />

            <main className="flex-1 flex flex-col md:overflow-auto md:block">
                {children}
            </main>
        </div>
    );
}