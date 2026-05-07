import React, { useState, useMemo } from 'react';
import CardBadge from './CardBadge';
import { CardPreviewProps } from '@/types/common';
import { Eye, EyeOff } from 'lucide-react';

/**
 * virtual card preview
 */
const CardPreview: React.FC<CardPreviewProps> = ({
    cardNumber,
    cardHolder,
    expiryDate,
    cardType
}) => {
    const [isRevealed, setIsRevealed] = useState(false);

    const displayNum = useMemo(() => {
        const cleanNumber = cardNumber.replace(/\s/g, '');
        const isAmex = cardType === 'AMEX';
        const groupPattern = isAmex ? [4, 6, 5] : [4, 4, 4, 4];

        let result = '';
        let digitIdx = 0;

        groupPattern.forEach((size, groupIdx) => {
            for (let i = 0; i < size; i++) {
                if (digitIdx < cleanNumber.length) {
                    const char = cleanNumber[digitIdx];
                    if (isRevealed) {
                        result += char;
                    } else {
                        const remaining = cleanNumber.length - digitIdx;
                        result += remaining > 4 ? '•' : char;
                    }
                } else {
                    result += '•';
                }
                digitIdx++;
            }
            if (groupIdx < groupPattern.length - 1) {
                result += ' ';
            }
        });

        return result;
    }, [cardNumber, cardType, isRevealed]);

    const displayName = cardHolder || 'FULL NAME';
    const displayExpiry = expiryDate || 'MM/YY';

    return (
        <div className="w-full max-w-[480px] mx-auto aspect-[1.586/1] rounded-[2.5rem] bg-[#0c0d12] p-10 text-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.6),0_0_40px_-10px_rgba(99,102,241,0.25)] flex flex-col relative overflow-hidden select-none border border-white/5 transition-all duration-700">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(99,102,241,0.12),transparent)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(168,85,247,0.06),transparent)] pointer-events-none" />

            <div className="flex justify-between items-center z-10 mb-auto">
                <div className="w-14 h-11 bg-gradient-to-br from-amber-100 via-amber-400 to-amber-600 rounded-lg relative overflow-hidden shadow-inner flex items-center justify-center border border-amber-900/10">
                    <div className="absolute inset-0 opacity-10 grid grid-cols-4 grid-rows-4">
                        {[...Array(16)].map((_, i) => (
                            <div key={i} className="border-[0.5px] border-slate-900" />
                        ))}
                    </div>
                    <div className="w-7 h-5 border-[0.5px] border-slate-900/30 rounded-md bg-white/5" />
                </div>

                <div className="flex items-center gap-4">
                    {cardType !== 'UNKNOWN' && (
                        <div className="animate-in fade-in zoom-in duration-500">
                            <CardBadge type={cardType} />
                        </div>
                    )}
                    <button
                        onClick={() => setIsRevealed(!isRevealed)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white/50 hover:text-white backdrop-blur-xl active:scale-95 group"
                        title={isRevealed ? "Hide digits" : "Show digits"}
                    >
                        {isRevealed ? (
                            <EyeOff className="w-5 h-5" strokeWidth={2} />
                        ) : (
                            <Eye className="w-5 h-5" strokeWidth={2} />
                        )}
                    </button>
                </div>
            </div>

            <div className="space-y-8 relative z-10">
                <div className="text-[clamp(1rem,4.8vw,1.6rem)] md:text-2xl font-bold tracking-[0.08em] font-mono whitespace-nowrap [font-variant-numeric:tabular-nums] text-slate-50 drop-shadow-lg">
                    {displayNum}
                </div>

                <div className="flex justify-between items-end gap-4">
                    <div className="flex flex-col min-w-0">
                        <span className="text-[9px] uppercase font-black tracking-[0.3em] text-slate-500 mb-2">
                            Card Holder
                        </span>
                        <span className="text-sm font-bold tracking-wider uppercase truncate max-w-[240px] text-slate-100">
                            {displayName}
                        </span>
                    </div>

                    <div className="flex flex-col items-end flex-shrink-0">
                        <span className="text-[9px] uppercase font-black tracking-[0.3em] text-slate-500 mb-2">
                            Expires
                        </span>
                        <span className="text-sm font-bold font-mono text-slate-100">
                            {displayExpiry}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardPreview;
