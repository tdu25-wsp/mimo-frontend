'use client';

import { NavLink } from "@/types/navlink.types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Heading from "../ui/Heading";

// サイドバーコンポーネント (PC用)
export function Sidebar({ links }: { links: NavLink[] }) {
    const pathname = usePathname();

    return (
        <aside className="hidden md:block fixed left-0 top-0 h-full w-48 bg-background border-r border-secondary-text/10">
            <div className="p-8">
                <Heading level="h1" className="pb-8">Mimo</Heading>
                <nav className="space-y-2">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href ||
                            (link.href !== "/" && pathname.startsWith(link.href));

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="flex items-center gap-3 py-3 rounded-lg text-primary-text hover:bg-gray-background transition-colors"
                            >
                                <Icon
                                    className={`w-6 h-6 ${isActive ? "text-primary" : "text-primary-text"}`}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                                <span className={isActive ? "font-bold" : "font-medium"}>
                                    {link.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}