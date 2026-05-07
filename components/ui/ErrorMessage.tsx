import React from 'react';
import { ErrorMessageProps } from '@/types/common';
import { AlertCircle } from 'lucide-react';

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, id, className = '' }) => {
    return (
        <div 
            id={id}
            role="alert"
            className={`flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 animate-in fade-in slide-in-from-top-2 duration-300 ${className}`}
        >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-[11px] font-bold uppercase tracking-wider">{message}</p>
        </div>
    );
};

export default ErrorMessage;
