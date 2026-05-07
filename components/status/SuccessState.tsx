import React from 'react';
import Button from '../ui/Button';
import { SuccessStateProps } from '@/types/common';

/**
 * successful payment.
 */
const SuccessState: React.FC<SuccessStateProps> = ({ amount, currency, transactionId, onDone }) => (
    <div className="w-full bg-white rounded-3xl border border-emerald-100 p-8 md:p-10 text-center space-y-8 shadow-xl shadow-emerald-500/5 animate-in zoom-in duration-500">
        <div className="flex justify-center">
            <div className="h-20 w-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
            </div>
        </div>
        <div className="space-y-2 text-center">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Success!</h3>
            <p className="text-sm text-slate-500 font-medium px-4">
                Your payment has been processed successfully.
            </p>
        </div>
        <div className="bg-slate-50 rounded-2xl p-5 space-y-3 text-left">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <span>Amount Paid</span>
                <span className="text-slate-900 font-bold">{currency} {amount.toFixed(2)}</span>
            </div>
            <div className="pt-3 border-t border-slate-200">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                    Transaction ID
                </span>
                <span className="block break-all text-[10px] font-mono text-slate-600 bg-white p-3 rounded-lg border border-slate-100 select-all leading-relaxed">
                    {transactionId}
                </span>
            </div>
        </div>
        <Button variant="primary" fullWidth onClick={onDone}>
            Done
        </Button>
    </div>
);

export default SuccessState;
