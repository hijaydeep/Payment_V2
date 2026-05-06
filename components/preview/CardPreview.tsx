import React from 'react';
import { CardType } from '@/types/payment';
import CardBadge from './CardBadge';

interface CardPreviewProps {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cardType: CardType;
}

const CardPreview: React.FC<CardPreviewProps> = ({ 
    cardNumber, 
    cardHolder, 
    expiryDate, 
    cardType 
}) => {
    // Show normalized value from state or placeholder
    const displayNum = cardNumber || '•••• •••• •••• ••••';
    const displayName = cardHolder || 'Your Name';
    const displayExpiry = expiryDate || 'MM/YY';

    return (
        <div className="w-full max-w-[480px] mx-auto aspect-[1.586/1] rounded-2xl bg-slate-900 p-8 text-white shadow-2xl flex flex-col justify-between relative overflow-hidden select-none border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />
            
            <div className="flex justify-between items-start relative z-10">
                <div className="w-12 h-9 bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-500 rounded-lg relative shadow-inner">
                    <div className="absolute inset-1 border border-black/5 rounded-sm opacity-30" />
                </div>
                {cardType !== 'UNKNOWN' && <CardBadge type={cardType} />}
            </div>

            <div className="space-y-8 relative z-10">
                {/* Responsive text clamp to ensure number never wraps, tight tracking for premium feel */}
                <div className="text-[clamp(1rem,4.5vw,1.5rem)] md:text-2xl font-semibold tracking-[0.03em] font-mono whitespace-nowrap [font-variant-numeric:tabular-nums]">
                    {displayNum}
                </div>

                <div className="flex justify-between items-end gap-4 overflow-hidden">
                    <div className="flex flex-col min-w-0">
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500 mb-1">
                            Card Holder
                        </span>
                        <span className="text-sm font-semibold tracking-wide uppercase truncate">
                            {displayName}
                        </span>
                    </div>

                    <div className="flex flex-col items-end flex-shrink-0">
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500 mb-1">
                            Expires
                        </span>
                        <span className="text-sm font-semibold font-mono">
                            {displayExpiry}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardPreview;
