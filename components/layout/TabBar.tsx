'use client';

import { NavLink } from "@/types/navlink.types";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";
import { MessageSquare, List, Settings } from "lucide-react";

// ナビゲーションリンク配列
const navLinks: NavLink[] = [
  { href: "/", label: "ホーム", icon: MessageSquare },
  { href: "/list", label: "リスト", icon: List },
  { href: "/setting", label: "設定", icon: Settings },
];

export default function TabBar() {
  return (
    <>
      {/* サイドバー (PC) */}
      <Sidebar links={navLinks} />

      {/* ボトムナビバー (モバイル) */}
      <BottomNav links={navLinks} />
    </>
  );
}