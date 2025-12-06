import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const variants = {
        primary: 'bg-primary text-background hover:bg-opacity-90 shadow-glow',
        secondary: 'bg-surface border border-border text-text-primary hover:bg-card hover:border-primary/30',
        outline: 'bg-transparent border border-border text-text-secondary hover:text-text-primary hover:border-primary/50',
        ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface',
        danger: 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5 text-base',
        lg: 'px-6 py-3 text-lg',
        icon: 'p-2',
    };

    return (
        <button
            ref={ref}
            className={cn(
                'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
