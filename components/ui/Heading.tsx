import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingAlign = "left" | "center" | "right";

interface HeadingProps {
    children: ReactNode;
    level?: HeadingLevel;
    align?: HeadingAlign;
    className?: string;
}

// レベルに応じた自動スタイル
const levelStyles: Record<HeadingLevel, string> = {
    h1: "text-4xl font-bold",
    h2: "text-3xl font-bold",
    h3: "text-2xl font-bold",
    h4: "text-xl font-bold",
    h5: "text-lg font-bold",
    h6: "text-base font-bold",
};

const alignStyles: Record<HeadingAlign, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
};

export default function Heading({
    children,
    level = "h2",
    align = "left",
    className = "",
}: HeadingProps) {
    const Component = level;

    const combinedClassName = twMerge(
        clsx(
            "text-primary-text", // デフォルトの色をここで指定
            levelStyles[level],
            alignStyles[align],
            className // ユーザーが指定したクラス (className)
        )
    );

    return <Component className={combinedClassName}>{children}</Component>;
}
