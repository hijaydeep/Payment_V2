import React from 'react';
import { ButtonProps } from '@/types/common';
import { Loader2 } from 'lucide-react';

const Button: React.FC<ButtonProps> = ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    loading, 
    fullWidth, 
    className = '', 
    disabled,
    ...props 
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-black uppercase tracking-widest transition-all duration-300 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';
    
    const variants = {
        primary: 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 hover:shadow-indigo-600/40',
        secondary: 'bg-white text-slate-900 border-2 border-slate-100 hover:border-indigo-100 hover:bg-slate-50',
        ghost: 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900',
        destructive: 'bg-rose-50 text-rose-600 hover:bg-rose-100',
    };

    const sizes = {
        sm: 'px-4 py-2 text-[10px]',
        md: 'px-8 py-4 text-xs',
        lg: 'px-10 py-5 text-sm',
    };

    const width = fullWidth ? 'w-full' : '';

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <div className="flex items-center gap-3">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                </div>
            ) : children}
        </button>
    );
};

export default Button;
