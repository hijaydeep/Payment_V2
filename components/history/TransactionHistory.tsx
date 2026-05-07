import React, { useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectHistory, selectTransaction, selectPayment } from '@/store/slices/paymentSlice';
import TransactionItem from './TransactionItem';
import { History } from 'lucide-react';

/**
 * Scrollable list of past transactions sorted by newest first.
 */
const TransactionHistory: React.FC = () => {
    const dispatch = useAppDispatch();
    const history = useAppSelector(selectHistory);
    const { selectedTransaction } = useAppSelector(selectPayment);

    // Ensure newest transactions are always at the top for better UX
    const sortedHistory = useMemo(() => {
        return [...history].sort((a, b) => b.timestamp - a.timestamp);
    }, [history]);

    if (history.length === 0) {
        return (
            <div className="py-16 px-4 text-center space-y-4">
                <div className="flex justify-center">
                    <div className="h-14 w-14 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                        <History className="w-7 h-7" />
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900 tracking-tight">No Transactions Yet</p>
                    <p className="text-xs text-slate-400 font-medium">Your payment history will appear here.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar scroll-smooth">
            {sortedHistory.map((tx) => (
                <TransactionItem 
                    key={tx.transactionId} 
                    transaction={tx} 
                    onClick={(t) => dispatch(selectTransaction(t))}
                    isActive={selectedTransaction?.transactionId === tx.transactionId}
                />
            ))}
        </div>
    );
};

export default TransactionHistory;
