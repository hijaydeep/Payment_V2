import React from 'react';
import Input from '../ui/Input';
import { formatCardNumber } from '@/utils/formatters';
import { detectCardType } from '@/utils/cardUtils';
import CardBadge from '../preview/CardBadge';
import { CardInputProps } from '@/types/common';

const CardInput: React.FC<CardInputProps> = ({ value, onChange, onBlur, error, disabled }) => {
    const cardType = detectCardType(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCardNumber(e.target.value);
        onChange(formatted);
    };

    return (
        <div className="relative group">
            <Input
                label="Card Number"
                id="cardNumber"
                placeholder="0000 0000 0000 0000"
                value={value}
                onChange={handleChange}
                onBlur={onBlur}
                error={error}
                disabled={disabled}
                autoComplete="cc-number"
                inputMode="numeric"
                required
            />
            {cardType && cardType !== 'UNKNOWN' && (
                <div className="absolute right-4 top-[51px] -translate-y-1/2 flex items-center h-6 animate-in fade-in zoom-in duration-300 pointer-events-none">
                    <CardBadge type={cardType} />
                </div>
            )}
        </div>
    );
};

export default CardInput;
