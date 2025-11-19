import { ListNavigation } from "@/components/layout/ListNavigation";
import { NavigationSection } from "@/types/navigation.types";

const listSections: NavigationSection[] = [
    {
        title: "",
        items: [
            { href: "/setting/account", name: "アカウント", icon: "CircleUser", color: "text-primary-text" },
            { href: "/setting/journaling-summary-setting", name: "ジャーナリング要約設定", icon: "BookHeart", color: "text-primary-text" },
        ],
    },
];

export default function SettingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col md:flex-row h-full bg-gray-background">
            <ListNavigation navTitle={"設定"} sections={listSections} />

            <main className="flex-1 overflow-auto md:block">
                {children}
            </main>
        </div>
    );
}