import React from 'react';
import { AmountInputProps, CurrencyCode } from '@/types/common';

/**
 * amount and currency selection control.
 */
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

        // 10 character limit
        if (val.length > 10) val = val.slice(0, 10);

        const parts = val.split('.');
        if (parts.length > 2) val = parts[0] + '.' + parts[1];
        if (parts[1] && parts[1].length > 2) val = parts[0] + '.' + parts[1].slice(0, 2);
        onChange(val);
    };

    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                Amount
            </label>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-slate-400 font-bold text-sm">{currency}</span>
                </div>
                <input
                    type="text"
                    inputMode="decimal"
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    placeholder="0.00"
                    maxLength={10}
                    className={`w-full bg-slate-50 border-2 ${error ? 'border-red-100 focus:border-red-200' : 'border-slate-50 focus:border-indigo-100'} rounded-2xl py-4 pl-14 pr-24 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none transition-all duration-300 text-lg`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <select
                        value={currency}
                        onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                        disabled={disabled}
                        className="bg-white border border-slate-100 rounded-xl px-3 py-1.5 text-[10px] font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer shadow-sm"
                    >
                        <option value="USD">USD</option>
                        <option value="INR">INR</option>
                    </select>
                </div>
            </div>
            {error && (
                <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1 animate-in fade-in slide-in-from-top-1">
                    {error}
                </p>
            )}
        </div>
    );
};

export default AmountInput;
