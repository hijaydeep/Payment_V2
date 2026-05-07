import React from 'react';
import Input from '../ui/Input';
import { CVVInputProps } from '@/types/common';

const CVVInput: React.FC<CVVInputProps> = ({ 
    value, 
    cardType, 
    onChange, 
    onBlur, 
    error, 
    disabled 
}) => {
    const maxLength = cardType === 'AMEX' ? 4 : 3;
    const label = cardType === 'AMEX' ? 'CID' : 'CVV';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, '').slice(0, maxLength);
        onChange(val);
    };

    return (
        <Input
            label={label}
            id="cvv"
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
