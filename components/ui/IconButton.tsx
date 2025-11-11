import React from "react";
import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

// 1. cva を使ってボタンのスタイルバリアントを定義
const iconButtonVariants = cva(
    // すべてのボタンに適用される基本スタイル
    "inline-flex items-center justify-center rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    {
        variants: {
            // 「色」のバリアント
            color: {
                default:
                    "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 focus-visible:ring-gray-300",
            },
            // 「サイズ」のバリアント（ボタンのパディングを制御）
            size: {
                small: "h-6 w-6", // 1.5rem = 24x24px
                default: "h-10 w-10", // 2.5rem = 40x40px
                large: "h-12 w-12", // 3rem = 48x48px
            },
            // 「シャドウ」のバリアント
            shadow: {
                true: "shadow-md hover:shadow-lg transition-shadow",
                false: "",
            },
        },
        // デフォルトのバリアント
        defaultVariants: {
            color: "default",
            size: "default",
            shadow: false,
        },
    }
);

// 2. Lucideアイコンのサイズをボタンの 'size' prop に連動させるためのマップ
const iconSizeMap: Record<"small" | "default" | "large", number> = {
    small: 16, // 24pxボタン用
    default: 24, // 40pxボタン用
    large: 32, // 48pxボタン用
};

// 3. コンポーネントのPropsを定義
export interface IconButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">, // <-- 修正点: Omit を追加
    VariantProps<typeof iconButtonVariants> {
    // 'icon' prop を LucideIcon として必須にする
    icon: LucideIcon;
}

// 4. IconButton コンポーネント本体
const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
    (
        { className, color, size, shadow, icon: Icon, ...props },
        ref
    ) => {
        // 'size' prop に基づいて Lucide アイコンのピクセルサイズを決定
        const iconPixelSize = iconSizeMap[size || "default"];

        return (
            <button
                ref={ref}
                // twMerge と cva を組み合わせてクラスを適用
                className={twMerge(
                    iconButtonVariants({ color, size, shadow, className })
                )}
                {...props}
            >
                <Icon size={iconPixelSize} />
                <span className="sr-only">Icon button</span>
            </button>
        );
    }
);

IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };