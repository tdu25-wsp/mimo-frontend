"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface NavBarProps {
    // タイトル (文字列またはコンポーネント)
    title?: React.ReactNode;

    // 左側の表示制御
    showBackButton?: boolean;
    leftContent?: React.ReactNode; // 戻るボタン以外を置きたい場合
    onBackClick?: () => void; // 戻るボタンの挙動を上書きしたい場合

    // 右側の表示制御 (アイコンボタンなどを配置)
    rightContent?: React.ReactNode;

    // 全体のスタイル上書き用
    className?: string;
}

export function Header({
    title,
    showBackButton = false,
    leftContent,
    onBackClick,
    rightContent,
    className,
}: NavBarProps) {
    const router = useRouter();

    const handleBack = () => {
        if (onBackClick) {
            onBackClick();
        } else {
            router.back();
        }
    };

    return (
        <header
            className={twMerge(
                "sticky top-0 z-50 flex items-center justify-between h-14 px-4 bg-background border-b border-gray-200",
                className
            )}
        >
            {/* Left */}
            <div className="flex items-center justify-start w-1/3">
                {showBackButton && (
                    <button
                        onClick={handleBack}
                        className="-ml-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="戻る"
                    >
                        <ChevronLeft size={24} className="text-gray-700" />
                    </button>
                )}
                {leftContent}
            </div>

            {/* Center */}
            <div className="flex items-center justify-center w-1/3">
                {typeof title === "string" ? (
                    <h1 className="text-base font-bold truncate text-primary-text">
                        {title}
                    </h1>
                ) : (
                    title
                )}
            </div>

            {/* Right */}
            <div className="flex items-center justify-end w-1/3 gap-1">
                {rightContent}
            </div>
        </header>
    );
}