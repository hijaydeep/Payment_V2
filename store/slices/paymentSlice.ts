import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentState, Transaction } from '@/types/payment';
import { MAX_RETRIES } from '@/utils/constants';
import { RootState } from '../index';

const initialState: PaymentState = {
    status: 'IDLE',
    currentTransaction: null,
    history: [],
    selectedTransaction: null,
    error: null,
    loading: false,
};

/**
 * helper for idempotent history updates
 */
const updateHistory = (state: PaymentState) => {
    if (!state.currentTransaction) return;

    const index = state.history.findIndex(
        t => t.transactionId === state.currentTransaction?.transactionId
    );

    if (index >= 0) {
        state.history[index] = { ...state.currentTransaction };
    } else {
        state.history.unshift({ ...state.currentTransaction });
    }
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        startPayment: (state, action: PayloadAction<Transaction>) => {
            state.status = 'PROCESSING';
            state.currentTransaction = action.payload;
            state.error = null;
            state.loading = true;
        },
        paymentSuccess: (state, action: PayloadAction<{ transactionId: string }>) => {
            if (!state.currentTransaction || state.currentTransaction.transactionId !== action.payload.transactionId) return;

            state.status = 'SUCCESS';
            state.loading = false;
            state.currentTransaction.status = 'SUCCESS';
            updateHistory(state);
        },
        paymentFailed: (state, action: PayloadAction<{ transactionId: string; error: string; failureReason: string }>) => {
            if (!state.currentTransaction || state.currentTransaction.transactionId !== action.payload.transactionId) return;

            state.status = 'FAILED';
            state.error = action.payload.error;
            state.loading = false;
            state.currentTransaction.status = 'FAILED';
            state.currentTransaction.failureReason = action.payload.failureReason;
            updateHistory(state);
        },
        paymentTimeout: (state, action: PayloadAction<{ transactionId: string }>) => {
            if (!state.currentTransaction || state.currentTransaction.transactionId !== action.payload.transactionId) return;

            state.status = 'TIMEOUT';
            state.error = 'The request timed out. Please try again.';
            state.loading = false;
            state.currentTransaction.status = 'TIMEOUT';
            state.currentTransaction.failureReason = 'Gateway Timeout';
            updateHistory(state);
        },
        retryPayment: (state) => {
            if (!state.currentTransaction || state.currentTransaction.retryCount >= MAX_RETRIES) return;

            state.status = 'PROCESSING';
            state.error = null;
            state.loading = true;
            state.currentTransaction.retryCount += 1;
            state.currentTransaction.status = 'PROCESSING';
        },
        selectTransaction: (state, action: PayloadAction<Transaction | null>) => {
            state.selectedTransaction = action.payload;
        },
        hydrateTransactions: (state, action: PayloadAction<Transaction[]>) => {
            state.history = [...action.payload].sort((a, b) => b.timestamp - a.timestamp);
        },
        resetPayment: (state) => {
            state.status = 'IDLE';
            state.currentTransaction = null;
            state.selectedTransaction = null;
            state.error = null;
            state.loading = false;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
});

// Selectors
export const selectPayment = (state: RootState) => state.payment;
export const selectPaymentStatus = (state: RootState) => state.payment.status;
export const selectHistory = (state: RootState) => state.payment.history;
export const selectCurrentTransaction = (state: RootState) => state.payment.currentTransaction;

export const {
    startPayment,
    paymentSuccess,
    paymentFailed,
    paymentTimeout,
    retryPayment,
    selectTransaction,
    hydrateTransactions,
    resetPayment,
    clearError
} = paymentSlice.actions;

export default paymentSlice.reducer;
