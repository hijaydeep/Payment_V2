import React from 'react';
import { Transaction } from '@/types/payment';

interface TransactionItemProps {
    transaction: Transaction;
    onClick: (transaction: Transaction) => void;
    isActive: boolean;
}

/**
 * Individual row component for the transaction history list.
 */
const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onClick, isActive }) => {
    const date = new Date(transaction.timestamp).toLocaleDateString();
    const time = new Date(transaction.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const statusStyles = {
        SUCCESS: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        FAILED: 'bg-red-50 text-red-700 border-red-100',
        TIMEOUT: 'bg-amber-50 text-amber-700 border-amber-100',
        PROCESSING: 'bg-indigo-50 text-indigo-700 border-indigo-100',
        IDLE: 'bg-slate-50 text-slate-700 border-slate-100',
    };

    return (
        <button
            onClick={() => onClick(transaction)}
            className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group relative overflow-hidden ${
                isActive 
                    ? 'border-indigo-600 bg-indigo-50/30 ring-1 ring-indigo-600' 
                    : 'border-slate-100 hover:border-slate-200 bg-white hover:bg-slate-50'
            }`}
            aria-pressed={isActive}
        >
            <div className="flex justify-between items-start mb-3">
                <div className="space-y-1">
                    <span className={`text-[9px] font-black uppercase tracking-[0.15em] px-2 py-1 rounded-md border ${statusStyles[transaction.status]}`}>
                        {transaction.status}
                    </span>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{date} • {time}</p>
                </div>
                <p className="text-sm font-black text-slate-900 tracking-tight">
                    {transaction.currency} {transaction.amount.toFixed(2)}
                </p>
            </div>
            
            <div className="flex justify-between items-center">
                <p className="text-[10px] font-mono text-slate-400 truncate max-w-[160px] opacity-70">
                    {transaction.transactionId}
                </p>
                {transaction.retryCount > 0 && (
                    <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                        {transaction.retryCount} {transaction.retryCount === 1 ? 'Retry' : 'Retries'}
                    </span>
                )}
            </div>
        </button>
    );
};

export default TransactionItem;
