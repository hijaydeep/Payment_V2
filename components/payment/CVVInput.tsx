import React from 'react';
import Input from '../ui/Input';
import { CardType } from '@/types/payment';

interface CVVInputProps {
    value: string;
    cardType: CardType;
    onChange: (value: string) => void;
    onBlur?: () => void;
    error?: string | null;
    disabled?: boolean;
}

const CVVInput: React.FC<CVVInputProps> = ({ value, cardType, onChange, onBlur, error, disabled }) => {
    const maxLength = cardType === 'AMEX' ? 4 : 3;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const digits = e.target.value.replace(/\D/g, '').slice(0, maxLength);
        onChange(digits);
    };

    return (
        <Input
            label="CVV"
            id="cvv"
            type="password"
            placeholder={cardType === 'AMEX' ? "0000" : "000"}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            error={error}
            disabled={disabled}
            autoComplete="cc-csc"
            inputMode="numeric"
            maxLength={maxLength}
            required
        />
    );
};

export default CVVInput;
