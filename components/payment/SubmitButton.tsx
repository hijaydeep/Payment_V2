import React from 'react';
import Button from '../ui/Button';
import { CURRENCY_SYMBOLS } from '@/utils/constants';
import { SubmitButtonProps } from '@/types/common';

const SubmitButton: React.FC<SubmitButtonProps> = ({ 
    loading, 
    disabled, 
    amount, 
    currency 
}) => {
    const symbol = CURRENCY_SYMBOLS[currency] || currency;
    const displayAmount = parseFloat(amount) ? parseFloat(amount).toFixed(2) : '0.00';

    return (
        <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            disabled={disabled}
        >
            Pay {symbol}{displayAmount}
        </Button>
    );
};

export default SubmitButton;
