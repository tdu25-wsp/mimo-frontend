'use client';

import { NavLink } from "@/types/navlink.types";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ボトムナビバーコンポーネント (モバイル用)
export function BottomNav({ links }: { links: NavLink[] }) {
    const pathname = usePathname();

    return (
        <nav className="block md:hidden fixed bottom-0 left-0 right-0 h-20 bg-background">
            <div className="flex items-center justify-around h-full px-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href ||
                        (link.href !== "/" && pathname.startsWith(link.href));
                        
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg text-primary-text hover:bg-gray-background transition-colors"
                        >
                            <Icon
                                className={`w-6 h-6 ${isActive ? "text-primary" : "text-primary-text"}`}
                                strokeWidth={isActive ? 2.5 : 2}
                            />
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}