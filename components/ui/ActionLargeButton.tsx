import React, { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

type ActionLargeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

const ActionLargeButton = ({
  label,
  className,
  ...props
}: ActionLargeButtonProps) => {

  const finalClassName = twMerge(
    clsx(
      'w-[365px]', 'h-[44px]', 'px-4', 'text-lg', 'font-bold',
      'text-white', 'bg-[#FFCE00]', 'rounded-lg', 'shadow-md',
      'transition-colors', 'hover:bg-[#FFF3C3]', 'focus:outline-none',
      'focus:ring-2', 'focus:ring-blue-500', 'focus:ring-opacity-50',
      
      className 
    )
  );

  return (
    <button
      className={finalClassName}
      {...props}
    >
      {label}
    </button>
  );
};

export default ActionLargeButton;