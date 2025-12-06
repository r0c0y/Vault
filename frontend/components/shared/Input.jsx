import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Input = React.forwardRef(({ className, label, error, ...props }, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-text-secondary mb-1.5 ml-1">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                className={cn(
                    'w-full bg-surface border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-200',
                    error && 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20',
                    className
                )}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-400 ml-1">{error}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
