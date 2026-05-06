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
 * Polished retry control with accurate attempt tracking.
 */
const RetryPayment: React.FC<RetryPaymentProps> = ({ 
    onRetry, 
    canRetry, 
    isProcessing, 
    retryCount 
}) => {
    // Correct remaining math: MAX_RETRIES - (already performed retries + current failure)
    const remainingRetries = MAX_RETRIES - retryCount;
    const currentRetryAttempt = retryCount + 1;

    return (
        <div className="space-y-4 w-full">
            <Button
                variant="primary"
                fullWidth
                onClick={onRetry}
                disabled={!canRetry || isProcessing}
                loading={isProcessing}
            >
                {canRetry ? `Retry Attempt ${currentRetryAttempt} of ${MAX_RETRIES}` : 'Threshold Reached'}
            </Button>
            
            <p className="text-center text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                {canRetry 
                    ? `${remainingRetries} ${remainingRetries === 1 ? 'attempt' : 'attempts'} remaining`
                    : 'Maximum retry limit exceeded'
                }
            </p>
        </div>
    );
};

export default RetryPayment;
