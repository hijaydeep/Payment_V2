import { CardType } from '@/types/payment';
import { CARD_PATTERNS } from './constants';

/**
 * Detects card network
 */
export const detectCardType = (cardNumber: string): CardType => {
    const cleanNumber = cardNumber.replace(/\D/g, '');
    for (const [type, pattern] of Object.entries(CARD_PATTERNS)) {
        if (pattern.test(cleanNumber)) {
            return type as CardType;
        }
    }
    return 'UNKNOWN';
};
