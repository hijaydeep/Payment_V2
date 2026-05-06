import { CurrencyCode } from '@/types/payment';
import { detectCardType } from './cardUtils';

/**
 * Formats card number based on card network (Amex: 4-6-5, others: 4-4-4-4)
 */
export const formatCardNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    const cardType = detectCardType(digits);

    if (cardType === 'AMEX') {
        return digits
            .replace(/^(\d{4})(\d{0,6})(\d{0,5}).*/, (_, p1, p2, p3) => {
                let res = p1;
                if (p2) res += ' ' + p2;
                if (p3) res += ' ' + p3;
                return res;
            })
            .trim()
            .slice(0, 17);
    }

    return digits
        .replace(/(\d{4})(?=\d)/g, '$1 ')
        .trim()
        .slice(0, 19);
};

/**
 * Formats expiry as MM/YY with intelligent auto-completion
 */
export const formatExpiry = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    
    if (digits.length === 1 && parseInt(digits) > 1) {
        return `0${digits}/`;
    }
    
    if (digits.length >= 2) {
        const month = digits.slice(0, 2);
        const year = digits.slice(2, 4);
        return `${month}/${year}`;
    }
    
    return digits.slice(0, 5);
};

/**
 * Formats number to currency string
 */
export const formatCurrency = (amount: number, currency: CurrencyCode): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(amount);
};
