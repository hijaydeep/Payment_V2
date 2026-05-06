import React from 'react';
import Input from '../ui/Input';
import { formatCardNumber } from '@/utils/formatters';
import { detectCardType } from '@/utils/cardUtils';

interface CardInputProps {
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    error?: string | null;
    disabled?: boolean;
}

const CardInput: React.FC<CardInputProps> = ({ value, onChange, onBlur, error, disabled }) => {
    const cardType = detectCardType(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCardNumber(e.target.value);
        onChange(formatted);
    };

    return (
        <div className="relative">
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
                <div className="absolute right-3 top-[38px] px-2 py-0.5 bg-gray-100 rounded text-[10px] font-bold text-gray-600 uppercase tracking-wider border border-gray-200">
                    {cardType}
                </div>
            )}
        </div>
    );
};

export default CardInput;
