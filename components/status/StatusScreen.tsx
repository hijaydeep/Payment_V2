import React from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectPayment, resetPayment } from '@/store/slices/paymentSlice';
import { usePayment } from '@/hooks/usePayment';

import ProcessingState from './ProcessingState';
import SuccessState from './SuccessState';
import FailedState from './FailedState';
import TimeoutState from './TimeoutState';

const StatusScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const { status, currentTransaction, error } = useAppSelector(selectPayment);
    const payment = usePayment();

    if (status === 'IDLE' || !currentTransaction) return null;

    const handleBack = () => dispatch(resetPayment());

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
            {status === 'PROCESSING' && (
                <ProcessingState onCancel={payment.cancelPayment} />
            )}

            {status === 'SUCCESS' && (
                <SuccessState
                    amount={currentTransaction.amount}
                    currency={currentTransaction.currency}
                    transactionId={currentTransaction.transactionId}
                    onDone={handleBack}
                />
            )}

            {status === 'FAILED' && (
                <FailedState
                    reason={currentTransaction.failureReason || error || 'Payment rejected'}
                    onRetry={payment.retryPayment}
                    canRetry={payment.canRetry}
                    isProcessing={payment.isProcessing}
                    retryCount={currentTransaction.retryCount}
                    onBack={handleBack}
                />
            )}

            {status === 'TIMEOUT' && (
                <TimeoutState
                    onRetry={payment.retryPayment}
                    canRetry={payment.canRetry}
                    isProcessing={payment.isProcessing}
                    retryCount={currentTransaction.retryCount}
                    onBack={handleBack}
                />
            )}
        </div>
    );
};

export default StatusScreen;
