import React from 'react';
import Button from '../ui/Button';

interface SubmitButtonProps {
    loading?: boolean;
    disabled?: boolean;
    amount: string;
    currency: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ loading, disabled, amount, currency }) => {
    const label = loading ? 'Processing...' : `Pay ${currency} ${amount || '0.00'}`;

    return (
        <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            disabled={disabled}
            className="mt-4"
        >
            {label}
        </Button>
    );
};

export default SubmitButton;
