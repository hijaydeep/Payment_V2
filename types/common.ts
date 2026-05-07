import { CurrencyCode, Transaction, CardType, PaymentStatus } from './payment';

export type { CurrencyCode, Transaction, CardType, PaymentStatus };

export interface RetryPaymentProps {
    onRetry: () => void;
    canRetry: boolean;
    isProcessing: boolean;
    retryCount: number;
}

export interface ProcessingStateProps {
    onCancel: () => void;
}

export interface SuccessStateProps {
    amount: number;
    currency: string;
    transactionId: string;
    onDone: () => void;
}

export interface FailedStateProps {
    reason: string;
    onRetry: () => void;
    canRetry: boolean;
    isProcessing: boolean;
    retryCount: number;
    onBack: () => void;
}

export interface TimeoutStateProps {
    onRetry: () => void;
    canRetry: boolean;
    isProcessing: boolean;
    retryCount: number;
    onBack: () => void;
}

export interface TransactionItemProps {
    transaction: Transaction;
    onClick: (transaction: Transaction) => void;
    isActive: boolean;
}

export interface AmountInputProps {
    value: string;
    currency: CurrencyCode;
    onChange: (value: string) => void;
    onCurrencyChange: (value: CurrencyCode) => void;
    error?: string | null;
    disabled?: boolean;
}
