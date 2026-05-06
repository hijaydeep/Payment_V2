import { useState, useMemo, useCallback } from 'react';
import { detectCardType } from '@/utils/cardUtils';
import { validateCardNumber, validateCardHolder, validateExpiry, validateCVV, validateAmount } from '@/utils/validators';
import { CurrencyCode } from '@/types/payment';
import { formatCardNumber } from '@/utils/formatters';

interface FormState {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
    amount: string;
    currency: CurrencyCode;
}

type TouchedState = Partial<Record<keyof FormState, boolean>>;

/**
 * Hook to manage payment form state and dependent field updates
 */
export const usePaymentForm = () => {
    const [formData, setFormData] = useState<FormState>({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
        amount: '',
        currency: 'USD',
    });

    const [touched, setTouched] = useState<TouchedState>({});

    const cardType = useMemo(() => detectCardType(formData.cardNumber), [formData.cardNumber]);

    const isFormValid = useMemo(() => {
        const options = { required: true, validateChecksum: true };
        return (
            validateCardNumber(formData.cardNumber, options) === null &&
            validateCardHolder(formData.cardHolder, { required: true }) === null &&
            validateExpiry(formData.expiryDate, { required: true }) === null &&
            validateCVV(formData.cvv, formData.cardNumber, { required: true }) === null &&
            validateAmount(formData.amount, { required: true }) === null
        );
    }, [formData]);

    const handleChange = useCallback((field: keyof FormState, value: string) => {
        setFormData(prev => {
            let normalizedValue = value;

            // Enforce source-of-truth normalization before storing
            if (field === 'cardNumber') {
                normalizedValue = formatCardNumber(value);
            }

            const next = { ...prev, [field]: normalizedValue };

            // Cross-field logic: Sync CVV length with card type
            if (field === 'cardNumber') {
                const prevType = detectCardType(prev.cardNumber);
                const nextType = detectCardType(normalizedValue);
                
                if (prevType !== nextType) {
                    const maxCVV = nextType === 'AMEX' ? 4 : 3;
                    if (next.cvv.length > maxCVV) {
                        next.cvv = next.cvv.slice(0, maxCVV);
                    }
                }
            }

            return next;
        });
    }, []);

    const handleBlur = useCallback((field: keyof FormState) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    }, []);

    const getFieldError = (field: keyof FormState) => {
        if (!touched[field]) return null;
        const val = formData[field];
        const opt = { required: true, allowIncomplete: true, validateChecksum: true };

        switch (field) {
            case 'cardNumber': return validateCardNumber(val, opt);
            case 'cardHolder': return validateCardHolder(val, opt);
            case 'expiryDate': return validateExpiry(val, opt);
            case 'cvv': return validateCVV(val, formData.cardNumber, opt);
            case 'amount': return validateAmount(val, opt);
            default: return null;
        }
    };

    return {
        formData,
        cardType,
        isFormValid,
        handleChange,
        handleBlur,
        getFieldError,
    };
};
