import React, { useState, useMemo } from 'react';
import { CardType } from '@/types/payment';
import CardBadge from './CardBadge';

interface CardPreviewProps {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cardType: CardType;
}

/**
 * Premium virtual card preview with interactive masking and high-fidelity textures.
 */
const CardPreview: React.FC<CardPreviewProps> = ({ 
    cardNumber, 
    cardHolder, 
    expiryDate, 
    cardType 
}) => {
    const [isRevealed, setIsRevealed] = useState(false);

    const displayNum = useMemo(() => {
        if (!cardNumber) return '•••• •••• •••• ••••';
        if (isRevealed) return cardNumber;
        
        // Secure masking: keep spacing, hide all but last 4 digits
        return cardNumber.replace(/\d/g, (char, index) => {
            const digitIndex = cardNumber.slice(0, index).replace(/\s/g, '').length;
            const totalDigits = cardNumber.replace(/\s/g, '').length;
            return digitIndex < totalDigits - 4 ? '•' : char;
        });
    }, [cardNumber, isRevealed]);

    const displayName = cardHolder || 'FULL NAME';
    const displayExpiry = expiryDate || 'MM/YY';

    return (
        <div className="w-full max-w-[480px] mx-auto aspect-[1.586/1] rounded-3xl bg-slate-900 p-8 text-white shadow-2xl flex flex-col justify-between relative overflow-hidden select-none border border-white/10 group">
            {/* Dynamic Mesh Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(99,102,241,0.15),transparent)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(168,85,247,0.1),transparent)] pointer-events-none" />
            
            <div className="flex justify-between items-start relative z-10">
                {/* Premium EMV Chip with micro-textures */}
                <div className="w-14 h-10 bg-gradient-to-br from-amber-100 via-amber-400 to-amber-600 rounded-lg relative overflow-hidden shadow-inner group/chip">
                    <div className="absolute inset-0 opacity-20 grid grid-cols-3 grid-rows-4">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="border-[0.5px] border-slate-900/40" />
                        ))}
                    </div>
                    <div className="absolute inset-[20%] border border-slate-900/10 rounded-sm" />
                </div>
                
                <div className="flex flex-col items-end gap-3">
                    {cardType !== 'UNKNOWN' && (
                        <div className="animate-in fade-in zoom-in duration-500">
                            <CardBadge type={cardType} />
                        </div>
                    )}
                    <button 
                        onClick={() => setIsRevealed(!isRevealed)}
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all text-white/30 hover:text-white active:scale-90"
                        title={isRevealed ? "Hide digits" : "Show digits"}
                    >
                        {isRevealed ? (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
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
