import React from 'react';
import { CardBadgeProps } from '@/types/common';

const CardBadge: React.FC<CardBadgeProps> = ({ type }) => {
    const isUnknown = type === 'UNKNOWN' || !type;

    const brandStyles: Record<string, string> = {
        VISA: 'bg-[#1A1F71] text-white border-[#1A1F71]',
        MASTERCARD: 'bg-[#EB001B] text-white border-[#EB001B]',
        AMEX: 'bg-[#016FD0] text-white border-[#016FD0]',
        UNKNOWN: 'bg-slate-50 text-slate-400 border-slate-200',
    };

    const style = brandStyles[type as string] || brandStyles.UNKNOWN;

    return (
        <div className={`
            px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-[0.1em] border shadow-sm transition-all duration-300
            ${style}
        `}>
            {isUnknown ? 'Card' : type}
        </div>
    );
};

export default CardBadge;
