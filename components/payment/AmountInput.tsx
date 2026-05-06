import React from 'react';
import { CurrencyCode } from '@/types/payment';

interface AmountInputProps {
    value: string;
    currency: CurrencyCode;
    onChange: (value: string) => void;
    onCurrencyChange: (value: CurrencyCode) => void;
    error?: string | null;
    disabled?: boolean;
}

const AmountInput: React.FC<AmountInputProps> = ({ 
    value, 
    currency, 
    onChange, 
    onCurrencyChange, 
    error, 
    disabled 
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/[^0-9.]/g, '');
        const parts = val.split('.');
        if (parts.length > 2) val = parts[0] + '.' + parts[1];
        if (parts[1] && parts[1].length > 2) val = parts[0] + '.' + parts[1].slice(0, 2);
        onChange(val);
    };

    return (
        <div className="flex flex-col space-y-1.5 w-full">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Amount
            </label>
            <div className={`
                flex items-stretch bg-white border rounded-lg overflow-hidden transition-all duration-200
                ${error ? 'border-red-500 ring-4 ring-red-50' : 'border-gray-200 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50'}
                ${disabled ? 'bg-gray-50 opacity-60' : ''}
            `}>
                <select
                    value={currency}
                    disabled={disabled}
                    onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                    className="bg-gray-50 border-r border-gray-200 px-3 text-sm font-bold text-gray-600 focus:outline-none hover:bg-gray-100 transition-colors cursor-pointer"
                >
                    <option value="USD">USD</option>
                    <option value="INR">INR</option>
                </select>
                <input
                    type="text"
                    placeholder="0.00"
                    value={value}
                    disabled={disabled}
                    onChange={handleChange}
                    className="flex-1 px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none placeholder:text-gray-300"
                />
            </div>
            {error && <p className="text-xs text-red-600 font-medium mt-1">{error}</p>}
        </div>
    );
};

export default AmountInput;
