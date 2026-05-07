import { CurrencyCode, Transaction, CardType, PaymentStatus, FormState, PaymentPayload } from './payment';

export type { CurrencyCode, Transaction, CardType, PaymentStatus, FormState, PaymentPayload };

/**
 * UTILITY TYPES
 */
export interface ValidationOptions {
    required?: boolean;
    allowIncomplete?: boolean;
    validateChecksum?: boolean;
}

export interface UsePaymentFormReturn {
    formData: FormState;
    cardType: CardType;
    isFormValid: boolean;
    handleChange: (field: keyof FormState, value: string) => void;
    handleBlur: (field: keyof FormState) => void;
    getFieldError: (field: keyof FormState) => string | null;
}

/**
 * COMPONENT PROPS
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    fullWidth?: boolean;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string | null;
    helperText?: string;
    hideLabel?: boolean;
}

export interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export interface ErrorMessageProps {
    message: string;
    id?: string;
    className?: string;
}

export interface CardInputProps {
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    error?: string | null;
    disabled?: boolean;
}

export interface CVVInputProps {
    value: string;
    cardType: CardType;
    onChange: (value: string) => void;
    onBlur?: () => void;
    error?: string | null;
    disabled?: boolean;
}

export interface ExpiryInputProps {
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    error?: string | null;
    disabled?: boolean;
}

export interface CurrencySelectorProps {
    value: CurrencyCode;
    onChange: (value: CurrencyCode) => void;
    disabled?: boolean;
}

export interface SubmitButtonProps {
    loading?: boolean;
    disabled?: boolean;
    amount: string;
    currency: string;
}

export interface PaymentFormProps {
    form: UsePaymentFormReturn;
    onSubmit: (payload: Omit<PaymentPayload, 'transactionId'>) => Promise<void>;
}

export interface CardBadgeProps {
    type: CardType;
}

export interface CardPreviewProps {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cardType: CardType;
}

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
