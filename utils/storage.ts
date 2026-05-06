import { Transaction } from '@/types/payment';

const STORAGE_KEY = 'payment_simulator_history';

/**
 * Storage utility for cross-session transaction persistence.
 */
export const storage = {
    /**
     * Saves transaction history to localStorage
     */
    saveTransactions: (history: Transaction[]): void => {
        if (typeof window === 'undefined') return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    },

    /**
     * Loads transaction history from localStorage
     */
    loadTransactions: (): Transaction[] => {
        if (typeof window === 'undefined') return [];
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            if (!data) return [];

            const parsed = JSON.parse(data);
            if (Array.isArray(parsed)) {
                return parsed.filter(tx => tx && tx.transactionId);
            }
            return [];
        } catch (error) {
            console.error('Failed to parse localStorage data:', error);
            return [];
        }
    },

    /**
     * Clears all persisted transactions
     */
    clearTransactions: (): void => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(STORAGE_KEY);
    },
};
