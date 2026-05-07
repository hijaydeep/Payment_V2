import React from 'react';
import { CurrencySelectorProps, CurrencyCode } from '@/types/common';

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ value, onChange, disabled }) => {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value as CurrencyCode)}
            disabled={disabled}
            className="bg-white border border-slate-100 rounded-xl px-3 py-1.5 text-[10px] font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer shadow-sm"
        >
            <option value="USD">USD</option>
            <option value="INR">INR</option>
        </select>
    );
};

export default CurrencySelector;
