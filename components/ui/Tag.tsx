import { X } from "lucide-react";

type TagProps = {
  label: string;
  onRemove?: () => void;
  className?: string;
};

export const Tag = ({ label, onRemove, className = "" }: TagProps) => {
  return (
    <span
      className={`
        inline-flex items-center justify-center gap-1 px-4 py-1
        rounded-full border-2
        bg-background text-primary-text font-bold text-sm
        ${className}
      `}
    >
      {label}

      {/* 削除ボタン */}
      <button
        onClick={onRemove}
        className="
          ml-0.5 text-primary-text flex items-center justify-center 
          rounded-full p-0.5
          transition-all hover:bg-gray-200
        "
        type="button"
      >
        <X size={16} strokeWidth={2.5} />
      </button>
    </span>
  );
};