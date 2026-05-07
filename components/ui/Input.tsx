import React from 'react';
import { InputProps } from '@/types/common';

const Input: React.FC<InputProps> = ({ 
    label, 
    error, 
    helperText, 
    hideLabel, 
    id, 
    className = '', 
    required,
    ...props 
}) => {
    return (
        <div className="space-y-2.5">
            {!hideLabel && (
                <label 
                    htmlFor={id} 
                    className="block text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 ml-1"
                >
                    {label} {required && <span className="text-rose-500 opacity-50">*</span>}
                </label>
            )}
            <div className="relative">
                <input
                    id={id}
                    className={`w-full bg-slate-50 border-2 ${error ? 'border-rose-100 focus:border-rose-200' : 'border-slate-50 focus:border-indigo-100'} rounded-2xl px-5 py-4 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none transition-all duration-300 text-sm ${className}`}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
                    {...props}
                />
            </div>
            {error ? (
                <p 
                    id={`${id}-error`} 
                    className="text-[10px] text-rose-500 font-bold uppercase tracking-widest ml-1 animate-in fade-in slide-in-from-top-1"
                >
                    {error}
                </p>
            ) : helperText ? (
                <p id={`${id}-helper`} className="text-[10px] text-slate-400 font-medium ml-1">
                    {helperText}
                </p>
            ) : null}
        </div>
    );
};

export default Input;
