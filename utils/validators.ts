import { ValidationOptions } from '@/types/common';

/**
 * Pure validation functions for payment fields
 */

export const validateCardNumber = (value: string, options: ValidationOptions = {}): string | null => {
    const clean = value.replace(/\s/g, '');
    if (options.required && !clean) return 'Card number is required';
    if (!/^\d+$/.test(clean)) return 'Only digits allowed';
    
    // Luhn algorithm check for complete numbers
    if (options.validateChecksum && clean.length >= 15 && !options.allowIncomplete) {
        let sum = 0;
        let shouldDouble = false;
        for (let i = clean.length - 1; i >= 0; i--) {
            let digit = parseInt(clean.charAt(i));
            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            sum += digit;
            shouldDouble = !shouldDouble;
        }
        if (sum % 10 !== 0) return 'Invalid card number checksum';
    }

    if (!options.allowIncomplete && clean.length < 15) return 'Card number too short';
    return null;
};

export const validateCardHolder = (value: string, options: ValidationOptions = {}): string | null => {
    if (options.required && !value.trim()) return 'Card holder name is required';
    if (value.trim().length > 0 && !/^[a-zA-Z\s]+$/.test(value)) return 'Only letters allowed';
    return null;
};

export const validateExpiry = (value: string, options: ValidationOptions = {}): string | null => {
    if (options.required && !value) return 'Expiry date is required';
    if (!/^\d{2}\/\d{2}$/.test(value)) return 'Use MM/YY format';

    const [month, year] = value.split('/').map(Number);
    if (month < 1 || month > 12) return 'Invalid month';

    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return 'Card has expired';
    }

    return null;
};

export const validateCVV = (value: string, cardNumber: string, options: ValidationOptions = {}): string | null => {
    if (options.required && !value) return 'CVV is required';
    
    const cleanCard = cardNumber.replace(/\D/g, '');
    const isAmex = /^3[47]/.test(cleanCard);
    const requiredLength = isAmex ? 4 : 3;

    if (!options.allowIncomplete && value.length !== requiredLength) {
        return `CVV must be ${requiredLength} digits`;
    }

    return null;
};

export const validateAmount = (value: string, options: ValidationOptions = {}): string | null => {
    if (options.required && !value) return 'Amount is required';
    const amount = parseFloat(value);
    if (isNaN(amount) || amount <= 0) return 'Invalid amount';
    if (amount > 1000000) return 'Amount exceeds limit';
    return null;
};
