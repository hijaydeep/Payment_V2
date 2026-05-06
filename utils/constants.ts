import { CardType, CurrencyCode } from '@/types/payment';

export const MAX_RETRIES = 3;
export const API_TIMEOUT = 6000;

export const CARD_PATTERNS: Record<Exclude<CardType, 'UNKNOWN'>, RegExp> = {
    VISA: /^4/,
    MASTERCARD: /^5[1-5]/,
    AMEX: /^3[47]/,
};

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
    USD: '$',
    INR: '₹',
};
