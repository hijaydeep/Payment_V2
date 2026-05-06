import React from 'react';
import { CurrencyCode } from '@/types/payment';

interface CurrencySelectorProps {
    value: CurrencyCode;
    onChange: (value: CurrencyCode) => void;
    disabled?: boolean;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ value, onChange, disabled }) => {
    return (
        <div className="flex flex-col space-y-1.5">
            <label htmlFor="currency" className="text-sm font-semibold text-gray-700">
                Currency
            </label>
            <select
                id="currency"
                value={value}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value as CurrencyCode)}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-900"
            >
                <option value="USD">USD - US Dollar</option>
                <option value="INR">INR - Indian Rupee</option>
            </select>
        </div>
    );
};

export default CurrencySelector;
