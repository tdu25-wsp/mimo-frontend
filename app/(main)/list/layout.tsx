import { ListNavigation } from "@/components/layout/ListNavigation";
import { NavigationSection } from "@/types/navigation.types";

// 仮のリストセクションデータ
const listSections: NavigationSection[] = [
    {
        title: "",
        items: [
            { href: "/list/all", name: "すべて", icon: "Folder", color: "text-primary" },
            { href: "/list/summary", name: "要約", icon: "WandSparkles", color: "text-primary" },
            { href: "/list/journaling-summary", name: "ジャーナリング要約", icon: "BookHeart", color: "text-primary" },
        ],
    },
    {
        title: "タグ",
        actionIcon: "Plus",
        items: [
            { href: "/list/tag01", name: "タグ01", icon: "Tag", color: "text-red-500" },
            { href: "/list/tag02", name: "タグ02", icon: "Tag", color: "text-orange-500" },
            { href: "/list/tag03", name: "タグ03", icon: "Tag", color: "text-yellow-500" },
            { href: "/list/tag04", name: "タグ04", icon: "Tag", color: "text-green-500" },
            { href: "/list/tag05", name: "タグ05", icon: "Tag", color: "text-sky-500" },
            { href: "/list/tag06", name: "タグ06", icon: "Tag", color: "text-blue-500" },
            { href: "/list/tag07", name: "タグ07", icon: "Tag", color: "text-purple-500" },
            { href: "/list/tag08", name: "タグ08", icon: "Tag", color: "text-pink-500" },
            { href: "/list/tag09", name: "タグ09", icon: "Tag", color: "text-red-500" },
            { href: "/list/tag10", name: "タグ10", icon: "Tag", color: "text-red-500" },
            { href: "/list/tag11", name: "タグ11（アイコンなし）", icon: "", color: "text-red-500" },
            { href: "/list/tag12", name: "タグ12（アイコンなし）", icon: "", color: "text-red-500" },
            { href: "/list/tag13", name: "タグ13（アイコンなし）", icon: "", color: "text-red-500" },
            { href: "/list/tag14", name: "タグ14（アイコンなし）", icon: "", color: "text-red-500" },
            { href: "/list/tag15", name: "タグ15（アイコンなし）", icon: "", color: "text-red-500" },
        ],
    },
];

export default function ListLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col md:flex-row h-full bg-gray-background">
            <ListNavigation navTitle={"リスト"} sections={listSections} />

            <main className="flex-1 overflow-auto md:block">
                {children}
            </main>
        </div>
    );
}