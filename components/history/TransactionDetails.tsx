import React from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectPayment, selectTransaction } from '@/store/slices/paymentSlice';
import Button from '../ui/Button';

/**
 * view of a specific transaction.
 */
const TransactionDetails: React.FC = () => {
    const dispatch = useAppDispatch();
    const { selectedTransaction } = useAppSelector(selectPayment);

    if (!selectedTransaction) return null;

    const dataPoints = [
        { label: 'Amount', value: `${selectedTransaction.currency} ${selectedTransaction.amount.toFixed(2)}`, strong: true },
        { label: 'Status', value: selectedTransaction.status, highlight: true },
        { label: 'Date & Time', value: new Date(selectedTransaction.timestamp).toLocaleString() },
        { label: 'Network', value: 'Simulator Core' },
        { label: 'Retries', value: selectedTransaction.retryCount.toString() },
        { label: 'Payment Method', value: `•••• ${selectedTransaction.cardNumber.slice(-4)}` },
    ];

    return (
        <div className="bg-white rounded-3xl border border-slate-100 p-8 space-y-8 animate-in slide-in-from-right-6 duration-500 shadow-xl shadow-slate-200/20">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Transaction Detail</h3>
                <button
                    onClick={() => dispatch(selectTransaction(null))}
                    className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Internal Reference</span>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 select-all">
                        <code className="block break-all text-[11px] font-mono text-slate-500 leading-relaxed">
                            {selectedTransaction.transactionId}
                        </code>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                    {dataPoints.map((item) => (
                        <div key={item.label} className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{item.label}</span>
                            <span className={`text-sm font-bold tracking-tight ${item.strong ? 'text-slate-900' : item.highlight ? 'text-indigo-600' : 'text-slate-600'}`}>
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>

                {selectedTransaction.failureReason && (
                    <div className="bg-red-50 rounded-2xl p-5 space-y-2 border border-red-100">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400">Rejection Reason</span>
                        <p className="text-xs text-red-700 font-bold leading-relaxed">
                            {selectedTransaction.failureReason}
                        </p>
                    </div>
                )}
            </div>

            <Button variant="secondary" fullWidth onClick={() => dispatch(selectTransaction(null))}>
                Close Details
            </Button>
        </div>
    );
};

export default TransactionDetails;
