import { detectCardType } from './cardUtils';

/**
 * Validates card number using Luhn algorithm
 */
export const validateCardNumber = (value: string): string | null => {
    const digits = value.replace(/\D/g, '');
    if (!digits) return 'Card number is required';
    
    const cardType = detectCardType(digits);
    const isValidLength = cardType === 'AMEX' ? digits.length === 15 : (digits.length >= 13 && digits.length <= 16);
    
    if (!isValidLength) return 'Invalid card number length';

    let sum = 0;
    let shouldDouble = false;
    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = parseInt(digits.charAt(i));
        if (shouldDouble) {
            if ((digit *= 2) > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0 ? null : 'Invalid card number checksum';
};

/**
 * Validates expiry date is in the future and correct format
 */
export const validateExpiry = (value: string): string | null => {
    if (!value) return 'Expiry date is required';
    if (!/^\d{2}\/\d{2}$/.test(value)) return 'Invalid format (MM/YY)';

    const [month, year] = value.split('/').map(num => parseInt(num));
    if (month < 1 || month > 12) return 'Invalid month';

    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return 'Card has expired';
    }

    return null;
};

/**
 * Validates CVV length based on card type (AMEX is 4 digits)
 */
export const validateCVV = (cvv: string, cardNumber: string): string | null => {
    const digits = cvv.replace(/\D/g, '');
    if (!digits) return 'CVV is required';

    const cardType = detectCardType(cardNumber);
    const expectedLength = cardType === 'AMEX' ? 4 : 3;

    if (digits.length !== expectedLength) {
        return `CVV must be ${expectedLength} digits`;
    }

    return null;
};

/**
 * Validates card holder name (Allows letters, spaces, hyphens and apostrophes)
 */
export const validateCardHolder = (name: string): string | null => {
    const trimmed = name.trim();
    if (!trimmed) return 'Card holder name is required';
    if (trimmed.length < 3) return 'Name must be at least 3 characters';
    if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) return 'Name can only contain letters, spaces, hyphens and apostrophes';
    return null;
};

/**
 * Validates payment amount
 */
export const validateAmount = (amount: string): string | null => {
    if (!amount) return 'Amount is required';
    const value = parseFloat(amount);
    if (isNaN(value)) return 'Invalid amount';
    if (value <= 0) return 'Amount must be greater than 0';
    if (value > 1000000) return 'Amount exceeds limit (1,000,000)';

    // Allow max 2 decimals
    if (amount.includes('.')) {
        const decimals = amount.split('.')[1];
        if (decimals.length > 2) return 'Maximum 2 decimal places allowed';
    }

    return null;
};
