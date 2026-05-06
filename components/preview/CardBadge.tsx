import React from 'react';
import { CardType } from '@/types/payment';

interface CardBadgeProps {
    type: CardType;
}

const CardBadge: React.FC<CardBadgeProps> = ({ type }) => {
    const isUnknown = type === 'UNKNOWN' || !type;
    
    return (
        <div className={`
            px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border
            ${isUnknown 
                ? 'bg-gray-50 text-gray-400 border-gray-200' 
                : 'bg-white text-gray-900 border-gray-300 shadow-sm'
            }
        `}>
            {isUnknown ? 'Card' : type}
        </div>
    );
};

export default CardBadge;
