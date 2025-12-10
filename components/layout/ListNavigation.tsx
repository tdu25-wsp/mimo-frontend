"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import type { NavigationSection } from "@/types/navigation.types";

import {
    Folder,
    WandSparkles,
    BookHeart,
    Tag,
    CircleUser,
    Plus,
    Search,
    type LucideProps
} from "lucide-react";
import Heading from "../ui/Heading";

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
    Folder: Folder,
    WandSparkles: WandSparkles,
    BookHeart: BookHeart,
    Tag: Tag,
    CircleUser: CircleUser,
    Plus: Plus,
    Search: Search,
};

export function ListNavigation({navTitle = null, sections }: {navTitle?: String | null; sections: NavigationSection[] }) {
    const pathname = usePathname();
    const isRoot = pathname === "/list" || pathname === "/setting";

    const handleActionClick = (sectionTitle: string) => {
        console.log(`${sectionTitle} のアクションボタンが押されました`);
        if (sectionTitle === "タグ") {
            // モーダルを開く処理をここに追加
            console.log("タグ追加モーダルを開く処理を実行");
        }
    };

    return (
        <aside className={`w-full md:w-56 md:h-full flex flex-col space-y-4 pb-4 md:pt-22 overflow-y-auto md:bg-background ${isRoot ? "block" : "hidden"} md:block`}>
            {(navTitle && isRoot) && (
                <Heading className="block md:hidden p-4">{navTitle}</Heading>
            )}

            {sections.map((section) => {
                const ActionIcon = section.actionIcon ? iconMap[section.actionIcon] : null;

                return (
                    <div key={section.title} className="p-4">
                        <div className="flex items-center justify-between mb-2 px-2">
                            {/* タイトル */}
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                {section.title}
                            </h3>

                            {ActionIcon && (
                                <button
                                    onClick={() => handleActionClick(section.title)}
                                    className="text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded p-0.5 transition-colors"
                                >
                                    <ActionIcon size={16} />
                                </button>
                            )}
                        </div>


                        {/* 各セクションアイテム */}
                        <div className="flex flex-col bg-background rounded-lg md:bg-transparent md:rounded-none divide-y divide-gray-100">
                            {section.items.map((item) => {
                                const Icon = iconMap[item.icon];
                                const isActive = pathname === item.href;

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={twMerge(
                                            "flex items-center space-x-3 p-2 text-sm font-medium first:rounded-t-lg last:rounded-b-lg",
                                            isActive
                                                ? "bg-secondary text-primary-text"
                                                : "text--on-primary-text hover:bg-gray-100"
                                        )}
                                    >
                                        {/* アイコン */}
                                        {
                                            Icon && (
                                                <Icon className={twMerge("w-5 h-5", item.color)} style={item.color ? { color: item.color } : {}} />
                                            )
                                        }
                                        {/* テキスト */}
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )
            }
            )}
        </aside>
    );
}