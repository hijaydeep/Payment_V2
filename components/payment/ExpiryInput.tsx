import React from 'react';
import Input from '../ui/Input';
import { formatExpiry } from '@/utils/formatters';

interface ExpiryInputProps {
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    error?: string | null;
    disabled?: boolean;
}

const ExpiryInput: React.FC<ExpiryInputProps> = ({ value, onChange, onBlur, error, disabled }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatExpiry(e.target.value);
        onChange(formatted);
    };

    return (
        <Input
            label="Expiry Date"
            id="expiryDate"
            placeholder="MM/YY"
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            error={error}
            disabled={disabled}
            autoComplete="cc-exp"
            inputMode="numeric"
            maxLength={5}
            required
        />
    );
};

export default ExpiryInput;
