import React from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectPayment, resetPayment } from '@/store/slices/paymentSlice';
import { usePayment } from '@/hooks/usePayment';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import ErrorMessage from '../ui/ErrorMessage';
import RetryPayment from './RetryPayment';

/**
 * Orchestrator component that renders the current state of the payment process.
 * Centralizes usePayment hook and passes necessary methods to sub-components.
 */
const PaymentStatus: React.FC = () => {
    const dispatch = useAppDispatch();
    const { status, currentTransaction, error } = useAppSelector(selectPayment);
    const payment = usePayment();

    if (status === 'IDLE' || !currentTransaction) return null;

    return (
        <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in duration-500">
            {/* PROCESSING */}
            {status === 'PROCESSING' && (
                <div className="text-center space-y-6 py-12">
                    <div className="flex justify-center">
                        <div className="p-5 bg-indigo-50 rounded-full">
                            <Spinner size="lg" className="text-indigo-600" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Processing Payment</h3>
                        <p className="text-sm text-slate-500 font-medium">Communicating with bank servers...</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={payment.cancelPayment} className="mt-4">
                        Cancel Transaction
                    </Button>
                </div>
            )}

            {/* SUCCESS */}
            {status === 'SUCCESS' && (
                <div className="w-full bg-white rounded-3xl border border-emerald-100 p-8 md:p-10 text-center space-y-8 shadow-xl shadow-emerald-500/5">
                    <div className="flex justify-center">
                        <div className="h-20 w-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-3xl font-bold text-slate-900 tracking-tight text-center">Success!</h3>
                        <p className="text-sm text-slate-500 font-medium px-4 text-center">
                            Your payment has been processed successfully.
                        </p>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-5 space-y-3">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            <span>Amount Paid</span>
                            <span className="text-slate-900 font-bold">{currentTransaction.currency} {currentTransaction.amount}</span>
                        </div>
                        <div className="pt-3 border-t border-slate-200">
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 text-left">
                                Transaction ID
                            </span>
                            <span className="block break-all text-[10px] font-mono text-slate-600 text-left bg-white p-3 rounded-lg border border-slate-100 select-all leading-relaxed">
                                {currentTransaction.transactionId}
                            </span>
                        </div>
                    </div>
                    <Button variant="primary" fullWidth onClick={() => dispatch(resetPayment())}>
                        Done
                    </Button>
                </div>
            )}

            {/* FAILED / TIMEOUT */}
            {(status === 'FAILED' || status === 'TIMEOUT') && (
                <div className="w-full bg-white rounded-3xl border border-red-100 p-8 md:p-10 text-center space-y-8 shadow-xl shadow-red-500/5">
                    <div className="flex justify-center">
                        <div className="h-20 w-20 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-3xl font-bold text-slate-900 tracking-tight text-center">
                            {status === 'TIMEOUT' ? 'Timed Out' : 'Failed'}
                        </h3>
                        <ErrorMessage 
                            message={currentTransaction.failureReason || error || 'Gateway rejection'} 
                            className="text-center mt-2 px-4"
                        />
                    </div>
                    
                    <div className="pt-2">
                        <RetryPayment 
                            onRetry={payment.retryPayment}
                            canRetry={payment.canRetry}
                            isProcessing={payment.isProcessing}
                            retryCount={currentTransaction.retryCount}
                        />
                    </div>

                    <Button variant="ghost" size="sm" fullWidth onClick={() => dispatch(resetPayment())} className="text-slate-400 hover:text-slate-600">
                        Back to Payment Form
                    </Button>
                </div>
            )}
        </div>
    );
};

export default PaymentStatus;
