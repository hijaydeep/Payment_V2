/**
 * Core type definitions for the Payment Gateway Simulator.
 */

export type PaymentStatus = 'IDLE' | 'PROCESSING' | 'SUCCESS' | 'FAILED' | 'TIMEOUT';

export type CardType = 'VISA' | 'MASTERCARD' | 'AMEX' | 'UNKNOWN';

export type CurrencyCode = 'USD' | 'INR';

export interface PaymentPayload {
    transactionId: string;
    cardNumber: string;
    cardHolder: string;
    expiryDate: string; // Format: MM/YY
    cvv: string;
    amount: number;
    currency: CurrencyCode;
}

export type PaymentResponse =
    | {
          success: true;
          transactionId: string;
          status: 'SUCCESS';
          message: string;
      }
    | {
          success: false;
          transactionId: string;
          status: 'FAILED' | 'TIMEOUT';
          message: string;
          failureReason: string;
      };

export interface Transaction extends PaymentPayload {
    status: PaymentStatus;
    timestamp: number;
    retryCount: number;
    failureReason?: string;
}

export interface PaymentState {
    status: PaymentStatus;
    currentTransaction: Transaction | null;
    history: Transaction[];
    selectedTransaction: Transaction | null;
    error: string | null;
    loading: boolean;
}
