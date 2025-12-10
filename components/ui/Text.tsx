import { ReactNode } from "react";

type TextStyle =
  | "body"           // 本文：メモの内容など
  | "body-bold"      // 太文字：強調したい本文
  | "caption"        // 説明：補足説明
  | "caption-muted"  // 補助説明：控えめな補足テキスト
  | "label"          // ラベル：フォームのラベル
  | "small"          // 小さいテキスト：注釈、タイムスタンプなど
  | "small-muted";   // 控えめな小テキスト：日時など

type TextAlign = "left" | "center" | "right";

interface TextProps {
  children: ReactNode;
  style?: TextStyle;
  align?: TextAlign;
  className?: string;
  as?: "p" | "span" | "div" | "label";
}

// スタイルテンプレート定義
const styleTemplates: Record<TextStyle, string> = {
  body: "text-base text-on-primary-text font-normal",
  "body-bold": "text-base text-primary-text font-bold",
  caption: "text-sm text-secondary-text font-normal",
  "caption-muted": "text-sm text-muted-text font-normal",
  label: "text-sm text-primary-text font-medium",
  small: "text-xs text-secondary-text font-normal",
  "small-muted": "text-xs text-muted-text font-normal",
};

// デフォルトのHTML要素（スタイルに応じて変更可能）
const defaultElements: Record<TextStyle, "p" | "span" | "div" | "label"> = {
  body: "p",
  "body-bold": "p",
  caption: "p",
  "caption-muted": "p",
  label: "label",
  small: "span",
  "small-muted": "span",
};

const alignStyles: Record<TextAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export default function Text({
  children,
  style = "body",
  align = "left",
  className = "",
  as,
}: TextProps) {
  // asが指定されていない場合、スタイルに応じたデフォルト要素を使用
  const Component = as || defaultElements[style];
  
  const combinedClassName = [
    styleTemplates[style],
    alignStyles[align],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Component className={combinedClassName}>{children}</Component>;
}
