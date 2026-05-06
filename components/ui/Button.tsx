import React, { forwardRef } from 'react';
import Spinner from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, variant = 'primary', size = 'md', loading, fullWidth, className = '', disabled, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center font-bold uppercase tracking-widest rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed text-xs';
        
        const variants = {
            primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-100 shadow-md shadow-indigo-100',
            secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 focus:ring-slate-100 shadow-sm',
            ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-50',
            destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-100 shadow-md shadow-red-100',
        };

        const sizes = {
            sm: 'px-4 py-2',
            md: 'px-6 py-3.5',
            lg: 'px-8 py-4.5 text-sm',
        };

        const widthStyles = fullWidth ? 'w-full' : '';

        return (
            <button
                ref={ref}
                disabled={disabled || loading}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyles} ${className}`}
                {...props}
            >
                {loading && <Spinner size="sm" className="mr-2" />}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
