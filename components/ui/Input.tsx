import React, { forwardRef } from 'react';
import ErrorMessage from './ErrorMessage';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string | null;
    helperText?: string;
    hideLabel?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, id, error, helperText, required, className = '', hideLabel, ...props }, ref) => {
        const errorId = error ? `${id}-error` : undefined;
        const helperId = helperText ? `${id}-helper` : undefined;

        return (
            <div className={`flex flex-col space-y-1.5 w-full ${className}`}>
                {!hideLabel && (
                    <label
                        htmlFor={id}
                        className="text-xs font-bold uppercase tracking-wider text-gray-500"
                    >
                        {label}
                        {required && <span className="text-red-400 ml-1" aria-hidden="true">*</span>}
                    </label>
                )}
                
                <input
                    ref={ref}
                    id={id}
                    required={required}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : helperId}
                    className={`
                        w-full px-4 py-3 bg-white border rounded-lg transition-all duration-200
                        placeholder:text-gray-300 text-gray-900 text-sm
                        ${error 
                            ? 'border-red-500 focus:ring-4 focus:ring-red-50' 
                            : 'border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50'
                        }
                        disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
                    `}
                    {...props}
                />

                {helperText && !error && (
                    <p id={helperId} className="text-xs text-gray-400">
                        {helperText}
                    </p>
                )}

                {error && <ErrorMessage message={error} id={errorId} className="text-xs" />}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
