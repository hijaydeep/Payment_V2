import { detectCardType } from './cardUtils';

export interface ValidationOptions {
    required?: boolean;
    allowIncomplete?: boolean;
    validateChecksum?: boolean;
}

/**
 * Validates card number using optional checksum and length checks
 */
export const validateCardNumber = (value: string, options: ValidationOptions = {}): string | null => {
    const digits = value.replace(/\D/g, '');
    if (!digits) return options.required ? 'Card number is required' : null;
    
    const cardType = detectCardType(digits);
    const expectedLength = cardType === 'AMEX' ? 15 : 16;
    
    if (digits.length < expectedLength) {
        return options.allowIncomplete ? null : 'Card number is incomplete';
    }
    
    if (digits.length > expectedLength) return 'Invalid card number length';

    if (options.validateChecksum) {
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
        if (sum % 10 !== 0) return 'Invalid card number checksum';
    }
    
    return null;
};

/**
 * Validates expiry date
 */
export const validateExpiry = (value: string, options: ValidationOptions = {}): string | null => {
    if (!value) return options.required ? 'Expiry date is required' : null;
    
    if (!/^\d{2}\/\d{2}$/.test(value)) {
        return options.allowIncomplete && value.length < 5 ? null : 'Invalid format (MM/YY)';
    }

    const [month, year] = value.split('/').map(num => parseInt(num));
    if (month < 1 || month > 12) return 'Invalid month';

    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return 'Card has expired';
    }

    if (year > currentYear + 15) {
        return 'Expiry date too far in future';
    }

    return null;
};

/**
 * Validates CVV
 */
export const validateCVV = (cvv: string, cardNumber: string, options: ValidationOptions = {}): string | null => {
    const digits = cvv.replace(/\D/g, '');
    if (!digits) return options.required ? 'CVV is required' : null;

    const cardType = detectCardType(cardNumber);
    const expectedLength = cardType === 'AMEX' ? 4 : 3;

    if (digits.length < expectedLength) {
        return options.allowIncomplete ? null : `CVV must be ${expectedLength} digits`;
    }

    if (digits.length > expectedLength) return `CVV must be ${expectedLength} digits`;

    return null;
};

/**
 * Validates card holder name
 */
export const validateCardHolder = (name: string, options: ValidationOptions = {}): string | null => {
    const trimmed = name.trim();
    if (!trimmed) return options.required ? 'Card holder name is required' : null;
    if (trimmed.length < 2) return 'Name must be at least 2 characters';
    if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) return 'Invalid characters in name';
    return null;
};

/**
 * Validates amount
 */
export const validateAmount = (amount: string, options: ValidationOptions = {}): string | null => {
    if (!amount) return options.required ? 'Amount is required' : null;
    const value = parseFloat(amount);
    if (isNaN(value)) return 'Invalid amount';
    if (value <= 0) return 'Amount must be greater than 0';
    if (value > 1000000) return 'Amount exceeds limit';

    if (amount.includes('.')) {
        const decimals = amount.split('.')[1];
        if (decimals.length > 2) return 'Max 2 decimal places';
    }

    return null;
};

/**
 * Validates the entire form and returns an error map
 */
export const validateForm = (data: {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
    amount: string;
}) => {
    return {
        cardNumber: validateCardNumber(data.cardNumber, { required: true, validateChecksum: true }),
        cardHolder: validateCardHolder(data.cardHolder, { required: true }),
        expiryDate: validateExpiry(data.expiryDate, { required: true }),
        cvv: validateCVV(data.cvv, data.cardNumber, { required: true }),
        amount: validateAmount(data.amount, { required: true }),
    };
};
