import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentState, Transaction, PaymentStatus } from '@/types/payment';
import { MAX_RETRIES } from '@/utils/constants';

const initialState: PaymentState = {
    status: 'IDLE',
    currentTransaction: null,
    history: [],
    selectedTransaction: null,
    error: null,
    loading: false,
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        hydrateTransactions: (state, action: PayloadAction<Transaction[]>) => {
            state.history = action.payload;
        },
        startPayment: (state, action: PayloadAction<Transaction>) => {
            state.status = 'PROCESSING';
            state.currentTransaction = action.payload;
            state.error = null;
            state.loading = true;
        },
        paymentSuccess: (state, action: PayloadAction<{ transactionId: string }>) => {
            if (state.currentTransaction && state.currentTransaction.transactionId === action.payload.transactionId) {
                const completedTransaction: Transaction = {
                    ...state.currentTransaction,
                    status: 'SUCCESS',
                    timestamp: Date.now(),
                };
                state.status = 'SUCCESS';
                state.currentTransaction = completedTransaction;
                state.history = [completedTransaction, ...state.history.filter(tx => tx.transactionId !== action.payload.transactionId)];
                state.loading = false;
            }
        },
        paymentFailed: (state, action: PayloadAction<{ transactionId: string; error: string; failureReason?: string }>) => {
            if (state.currentTransaction && state.currentTransaction.transactionId === action.payload.transactionId) {
                const failedTransaction: Transaction = {
                    ...state.currentTransaction,
                    status: 'FAILED',
                    failureReason: action.payload.failureReason,
                    timestamp: Date.now(),
                };
                state.status = 'FAILED';
                state.currentTransaction = failedTransaction;
                state.error = action.payload.error;
                state.history = [failedTransaction, ...state.history.filter(tx => tx.transactionId !== action.payload.transactionId)];
                state.loading = false;
            }
        },
        paymentTimeout: (state, action: PayloadAction<{ transactionId: string }>) => {
            if (state.currentTransaction && state.currentTransaction.transactionId === action.payload.transactionId) {
                const timeoutTransaction: Transaction = {
                    ...state.currentTransaction,
                    status: 'TIMEOUT',
                    failureReason: 'Gateway Timeout',
                    timestamp: Date.now(),
                };
                state.status = 'TIMEOUT';
                state.currentTransaction = timeoutTransaction;
                state.history = [timeoutTransaction, ...state.history.filter(tx => tx.transactionId !== action.payload.transactionId)];
                state.loading = false;
            }
        },
        retryPayment: (state) => {
            if (state.currentTransaction && state.currentTransaction.retryCount < MAX_RETRIES) {
                state.status = 'PROCESSING';
                state.currentTransaction.retryCount += 1;
                state.error = null;
                state.loading = true;
            }
        },
        selectTransaction: (state, action: PayloadAction<Transaction | null>) => {
            state.selectedTransaction = action.payload;
        },
        resetPayment: (state) => {
            state.status = 'IDLE';
            state.currentTransaction = null;
            state.error = null;
            state.loading = false;
        },
    },
});

export const {
    hydrateTransactions,
    startPayment,
    paymentSuccess,
    paymentFailed,
    paymentTimeout,
    retryPayment,
    selectTransaction,
    resetPayment,
} = paymentSlice.actions;

export const selectPayment = (state: { payment: PaymentState }) => state.payment;
export const selectHistory = (state: { payment: PaymentState }) => state.payment.history;
export const selectCurrentTransaction = (state: { payment: PaymentState }) => state.payment.currentTransaction;
export const selectPaymentStatus = (state: { payment: PaymentState }) => state.payment.status;

export default paymentSlice.reducer;
