import React from 'react';

interface ErrorMessageProps {
    message: string;
    id?: string;
    className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, id, className = '' }) => {
    if (!message) return null;

    return (
        <p
            id={id}
            className={`text-sm text-red-600 mt-1 font-medium ${className}`}
            aria-live="polite"
        >
            {message}
        </p>
    );
};

export default ErrorMessage;
