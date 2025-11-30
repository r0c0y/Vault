import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Card = React.forwardRef(({ className, children, hoverEffect = true, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                'bg-card border border-border rounded-2xl p-6 transition-all duration-300',
                hoverEffect && 'hover:-translate-y-1 hover:shadow-glass hover:border-primary/20',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});

Card.displayName = 'Card';

export default Card;
