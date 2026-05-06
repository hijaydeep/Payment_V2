import { useCallback, useRef, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
    startPayment, 
    paymentSuccess, 
    paymentFailed, 
    paymentTimeout, 
    retryPayment as retryAction,
    selectCurrentTransaction,
    selectPaymentStatus
} from '@/store/slices/paymentSlice';
import { PaymentResponse, Transaction } from '@/types/payment';
import { MAX_RETRIES } from '@/utils/constants';

/**
 * Hook to manage the payment execution lifecycle
 * Handles UUID generation and Redux state synchronization
 */
export const usePayment = () => {
    const dispatch = useAppDispatch();
    const currentTransaction = useAppSelector(selectCurrentTransaction);
    const status = useAppSelector(selectPaymentStatus);
    const abortControllerRef = useRef<AbortController | null>(null);

    const isProcessing = status === 'PROCESSING';

    const canRetry = useMemo(() => {
        if (!currentTransaction) return false;
        const isFailed = currentTransaction.status === 'FAILED' || currentTransaction.status === 'TIMEOUT';
        return isFailed && currentTransaction.retryCount < MAX_RETRIES;
    }, [currentTransaction]);

    const executePayment = useCallback(async (transaction: Transaction) => {
        const controller = new AbortController();
        abortControllerRef.current = controller;

        const timeoutId = setTimeout(() => {
            controller.abort();
        }, 6000); // 6-second gateway timeout

        try {
            const response = await fetch('/api/pay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    transactionId: transaction.transactionId,
                    amount: transaction.amount,
                    currency: transaction.currency,
                    cardNumber: transaction.cardNumber,
                }),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            const data: PaymentResponse = await response.json();

            if (data.success) {
                dispatch(paymentSuccess({ transactionId: data.transactionId }));
            } else {
                dispatch(paymentFailed({ 
                    transactionId: data.transactionId, 
                    error: data.message, 
                    failureReason: data.failureReason 
                }));
            }
        } catch (error: unknown) {
            clearTimeout(timeoutId);
            
            // Explicit Timeout Branch (AbortController)
            if (error instanceof Error && error.name === 'AbortError') {
                dispatch(paymentTimeout({ transactionId: transaction.transactionId }));
            } else {
                dispatch(paymentFailed({ 
                    transactionId: transaction.transactionId, 
                    error: 'An unexpected error occurred', 
                    failureReason: 'Network Error' 
                }));
            }
        } finally {
            abortControllerRef.current = null;
        }
    }, [dispatch]);

    const submitPayment = useCallback(async (payload: Omit<Transaction, 'transactionId' | 'status' | 'timestamp' | 'retryCount' | 'failureReason'>) => {
        const transactionId = crypto.randomUUID();
        
        const newTransaction: Transaction = {
            ...payload,
            transactionId,
            status: 'PROCESSING',
            timestamp: Date.now(),
            retryCount: 0,
        };

        dispatch(startPayment(newTransaction));
        await executePayment(newTransaction);
    }, [dispatch, executePayment]);

    const retryPayment = useCallback(async () => {
        if (!currentTransaction || !canRetry) return;

        dispatch(retryAction());
        
        // Use deterministic object to prevent stale closure bug
        // currentTransaction.retryCount is from the current render snapshot
        const retryingTransaction: Transaction = {
            ...currentTransaction,
            status: 'PROCESSING',
            retryCount: currentTransaction.retryCount + 1,
        };

        await executePayment(retryingTransaction);
    }, [currentTransaction, canRetry, dispatch, executePayment]);

    const cancelPayment = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
    }, []);

    return {
        submitPayment,
        retryPayment,
        cancelPayment,
        isProcessing,
        canRetry,
    };
};
