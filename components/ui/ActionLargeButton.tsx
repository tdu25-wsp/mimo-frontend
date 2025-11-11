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
      'w-full', 'h-[40px]', 'px-4', 'text-lg', 'font-bold',
      'text-white', 'bg-primary', 'rounded-lg',
      'transition-colors', 'hover:bg-primary-hover', 'focus:outline-none',
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