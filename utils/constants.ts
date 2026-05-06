export const MAX_RETRIES = 3;

export const CURRENCY_SYMBOLS: Record<string, string> = {
    USD: '$',
    INR: '₹',
};

/**
 * Regex patterns for card network detection
 */
export const CARD_PATTERNS = {
    VISA: /^4/,
    MASTERCARD: /^5[1-5]/,
    AMEX: /^3[47]/,
};

/**
 * Standard test card numbers for simulator verification
 */
export const TEST_CARDS = {
    VISA: '4242424242424242',
    MASTERCARD: '5555555555554444',
    AMEX: '378282246310005',
};

/**
 * Card network constraints
 */
export const CARD_LIMITS = {
    AMEX: { digits: 15, cvv: 4 },
    DEFAULT: { digits: 16, cvv: 3 },
};
