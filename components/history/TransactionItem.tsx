import React from 'react';
import { TransactionItemProps } from '@/types/common';

/**
 * history item with interactions.
 */
const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onClick, isActive }) => {
    const date = new Date(transaction.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' });
    const time = new Date(transaction.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const statusStyles = {
        SUCCESS: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        FAILED: 'bg-rose-50 text-rose-600 border-rose-100',
        TIMEOUT: 'bg-amber-50 text-amber-600 border-amber-100',
        PROCESSING: 'bg-indigo-50 text-indigo-600 border-indigo-100',
        IDLE: 'bg-slate-50 text-slate-400 border-slate-100',
    };

    return (
        <button
            onClick={() => onClick(transaction)}
            className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 group relative overflow-hidden ${isActive
                    ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-600 shadow-xl shadow-indigo-500/5'
                    : 'border-slate-100 bg-white hover:border-slate-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/40'
                }`}
            aria-pressed={isActive}
        >
            <div className="flex justify-between items-center mb-2.5">
                <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-md border ${statusStyles[transaction.status]}`}>
                    {transaction.status}
                </span>
                <p className="text-sm font-black text-slate-900 tracking-tight">
                    {transaction.currency} {transaction.amount.toFixed(2)}
                </p>
            </div>

            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <p className="text-[10px] font-mono text-slate-400 opacity-60">
                        {transaction.transactionId.slice(0, 8)}...{transaction.transactionId.slice(-4)}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{date} • {time}</p>
                </div>
                {transaction.retryCount > 0 && (
                    <span className="text-[8px] font-black bg-slate-900 text-white px-2 py-1 rounded-full uppercase tracking-tighter scale-90 origin-right transition-transform group-hover:scale-95">
                        {transaction.retryCount} {transaction.retryCount === 1 ? 'Retry' : 'Retries'}
                    </span>
                )}
            </div>
        </button>
    );
};

export default TransactionItem;
