import React from 'react';

// コンポーネントが受け取るProps（プロパティ）の型を定義します
type LinkButtonProps = {
  /** リンク先のURL */
  href: string;
  /** リンク内に表示するテキストや要素 */
  children: React.ReactNode;
  /** 親コンポーネントから追加のTailwindクラスを指定するため (任意) */
  className?: string;
};

/**
 * 画像のような下線付きのシンプルなリンクコンポーネント
 */
const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  children,
  className = '', // デフォルト値を空文字に設定
}) => {
  // 適用するTailwindクラスを定義
  const baseClasses = `
    text-lg text-black
    underline
    transition-colors duration-150 ease-in-out
    hover:text-blue-600
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:rounded
  `;

  // 基本クラスとpropsから渡されたclassNameを結合
  // trim()で前後の空白を削除し、replace()で複数の空白を1つにまとめます
  const combinedClasses = `${baseClasses} ${className}`.trim().replace(/\s+/g, ' ');

  return (
    <a href={href} className={combinedClasses}>
      {children}
    </a>
  );
};

export default LinkButton;