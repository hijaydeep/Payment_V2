import React from 'react';
import { TimeoutStateProps } from '@/types/common';
import { Clock } from 'lucide-react';
import RetryPayment from '../payment/RetryPayment';
import Button from '../ui/Button';

const TimeoutState: React.FC<TimeoutStateProps> = ({ 
    onRetry, 
    canRetry, 
    isProcessing, 
    retryCount, 
    onBack 
}) => {
    return (
        <div className="flex flex-col items-center text-center space-y-10 animate-in fade-in zoom-in duration-500">
            <div className="relative">
                <div className="absolute inset-0 bg-amber-100 rounded-full blur-3xl opacity-30" />
                <div className="relative w-24 h-24 bg-amber-50 rounded-3xl flex items-center justify-center border border-amber-100 shadow-xl shadow-amber-500/5">
                    <Clock className="w-10 h-10 text-amber-500" />
                </div>
            </div>

            <div className="space-y-6 w-full">
                <div className="space-y-1">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Gateway Timeout</h3>
                    <p className="text-slate-400 text-sm font-medium">The payment processor took too long to respond.</p>
                </div>

                <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl text-amber-700 text-[11px] font-bold uppercase tracking-wider">
                    Please do not refresh the page
                </div>

                <div className="pt-4 space-y-4">
                    <RetryPayment 
                        onRetry={onRetry}
                        canRetry={canRetry}
                        isProcessing={isProcessing}
                        retryCount={retryCount}
                    />
                    
                    <Button variant="ghost" fullWidth onClick={onBack}>
                        Cancel and go back
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TimeoutState;
