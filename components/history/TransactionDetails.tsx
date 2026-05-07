import React from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectPayment, selectTransaction } from '@/store/slices/paymentSlice';
import Button from '../ui/Button';
import { X } from 'lucide-react';

/**
 * Premium technical inspection panel for transaction receipts.
 */
const TransactionDetails: React.FC = () => {
    const dispatch = useAppDispatch();
    const { selectedTransaction } = useAppSelector(selectPayment);

    if (!selectedTransaction) return null;

    const items = [
        { label: 'Amount', value: `${selectedTransaction.currency} ${selectedTransaction.amount.toFixed(2)}`, variant: 'strong' },
        { label: 'Status', value: selectedTransaction.status, variant: 'badge' },
        { label: 'Recorded On', value: new Date(selectedTransaction.timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) },
        { label: 'Attempt History', value: `${selectedTransaction.retryCount} Retry Attempts` },
        { label: 'Auth Method', value: `Card •••• ${selectedTransaction.cardNumber.slice(-4)}` },
    ];

    return (
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 space-y-10 animate-in slide-in-from-right-12 duration-500 shadow-[0_40px_80px_-16px_rgba(0,0,0,0.12)] border border-slate-100">
            <header className="flex justify-between items-start">
                <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">Receipt</h3>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1.5">Immutable Simulator Record</p>
                </div>
                <button 
                    onClick={() => dispatch(selectTransaction(null))}
                    aria-label="Close details"
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 hover:rotate-90 transition-all duration-300"
                >
                    <X className="w-5 h-5" />
                </button>
            </header>

            <div className="space-y-8">
                <section className="space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-300">Transaction Hash</span>
                    <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 group cursor-pointer active:scale-[0.98] transition-transform">
                        <code className="block break-all text-[11px] font-mono text-slate-500 leading-relaxed text-center select-all">
                            {selectedTransaction.transactionId}
                        </code>
                    </div>
                </section>

                <section className="space-y-1">
                    {items.map((item) => (
                        <div key={item.label} className="flex justify-between items-center py-5 border-b border-slate-50 last:border-0 group">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-500 transition-colors">{item.label}</span>
                            <span className={`text-sm font-bold tracking-tight ${
                                item.variant === 'strong' ? 'text-2xl text-slate-900' : 
                                item.variant === 'badge' ? 'text-indigo-600 bg-indigo-50 px-4 py-1 rounded-full text-xs' : 
                                'text-slate-700'
                            }`}>
                                {item.value}
                            </span>
                        </div>
                    ))}
                </section>

                {selectedTransaction.failureReason && (
                    <div className="bg-rose-50 rounded-[2rem] p-7 space-y-2.5 border border-rose-100 animate-in fade-in duration-700">
                        <header className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-400">Rejection Detail</span>
                        </header>
                        <p className="text-sm text-rose-700 font-bold leading-relaxed">
                            {selectedTransaction.failureReason}
                        </p>
                    </div>
                )}
            </div>

            <footer className="pt-4">
                <Button variant="secondary" fullWidth onClick={() => dispatch(selectTransaction(null))} className="h-16 rounded-[1.5rem] shadow-none border-slate-200">
                    Dismiss Record
                </Button>
            </footer>
        </div>
    );
};

export default TransactionDetails;
