import React from 'react';
import ErrorMessage from '../ui/ErrorMessage';
import RetryPayment from '../payment/RetryPayment';
import Button from '../ui/Button';
import { FailedStateProps } from '@/types/common';

/**
 * rejected payment.
 */
const FailedState: React.FC<FailedStateProps> = ({ reason, onRetry, canRetry, isProcessing, retryCount, onBack }) => (
    <div className="w-full bg-white rounded-3xl border border-rose-100 p-8 md:p-10 text-center space-y-8 shadow-xl shadow-rose-500/5 animate-in zoom-in duration-500">
        <div className="flex justify-center">
            <div className="h-20 w-20 bg-rose-50 rounded-full flex items-center justify-center text-rose-500">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        </div>
        <div className="space-y-2 text-center">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Payment Failed</h3>
            <ErrorMessage message={reason} className="text-center mt-2 px-4" />
        </div>
        <div className="pt-2">
            <RetryPayment
                onRetry={onRetry}
                canRetry={canRetry}
                isProcessing={isProcessing}
                retryCount={retryCount}
            />
        </div>
        <Button variant="ghost" size="sm" fullWidth onClick={onBack} className="text-slate-400 hover:text-slate-600 font-bold tracking-widest uppercase text-[10px]">
            Back to Form
        </Button>
    </div>
);

export default FailedState;
