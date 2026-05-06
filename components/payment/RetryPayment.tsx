import React from 'react';
import { MAX_RETRIES } from '@/utils/constants';
import Button from '../ui/Button';

interface RetryPaymentProps {
    onRetry: () => void;
    canRetry: boolean;
    isProcessing: boolean;
    retryCount: number;
}

/**
 * Presentational component for payment retries
 */
const RetryPayment: React.FC<RetryPaymentProps> = ({ 
    onRetry, 
    canRetry, 
    isProcessing, 
    retryCount 
}) => {
    const remainingRetries = MAX_RETRIES - retryCount;
    const nextAttemptNumber = retryCount + 1;

    return (
        <div className="space-y-4 w-full">
            <Button
                variant="primary"
                fullWidth
                onClick={onRetry}
                disabled={!canRetry || isProcessing}
                loading={isProcessing}
            >
                {canRetry ? `Retry (${nextAttemptNumber} / ${MAX_RETRIES})` : 'No retries left'}
            </Button>
            
            <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                {canRetry 
                    ? `${remainingRetries} ${remainingRetries === 1 ? 'attempt' : 'attempts'} remaining`
                    : 'Maximum retry attempts reached'
                }
            </p>
        </div>
    );
};

export default RetryPayment;
