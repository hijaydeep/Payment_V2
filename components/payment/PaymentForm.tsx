'use client';

import React from 'react';
import { usePaymentForm } from '@/hooks/usePaymentForm';
import { usePayment } from '@/hooks/usePayment';
import CardInput from './CardInput';
import ExpiryInput from './ExpiryInput';
import CVVInput from './CVVInput';
import AmountInput from './AmountInput';
import SubmitButton from './SubmitButton';
import Input from '../ui/Input';

/**
 * payment form.
 * form state, validation, and submission orchestration.
 */
const PaymentForm: React.FC = () => {
    const { submitPayment } = usePayment();
    const {
        formData,
        cardType,
        isFormValid,
        handleChange,
        handleBlur,
        getFieldError
    } = usePaymentForm();

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        // Convert amount from string to number before submitting
        await submitPayment({
            cardNumber: formData.cardNumber,
            cardHolder: formData.cardHolder,
            expiryDate: formData.expiryDate,
            cvv: formData.cvv,
            amount: parseFloat(formData.amount),
            currency: formData.currency,
        });
    };

    return (
        <div className="p-8 md:p-14 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="max-w-md mx-auto space-y-12">
                <header>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Checkout</h2>
                    <p className="text-slate-400 text-sm mt-3 font-semibold uppercase tracking-widest">Safe & Secured Simulator</p>
                </header>

                <form className="space-y-7" onSubmit={handleFormSubmit}>
                    <CardInput
                        value={formData.cardNumber}
                        onChange={(val) => handleChange('cardNumber', val)}
                        onBlur={() => handleBlur('cardNumber')}
                        error={getFieldError('cardNumber')}
                    />

                    <div className="grid grid-cols-2 gap-7">
                        <ExpiryInput
                            value={formData.expiryDate}
                            onChange={(val) => handleChange('expiryDate', val)}
                            onBlur={() => handleBlur('expiryDate')}
                            error={getFieldError('expiryDate')}
                        />
                        <CVVInput
                            value={formData.cvv}
                            cardType={cardType}
                            onChange={(val) => handleChange('cvv', val)}
                            onBlur={() => handleBlur('cvv')}
                            error={getFieldError('cvv')}
                        />
                    </div>

                    <Input
                        label="Card Holder"
                        id="cardHolder"
                        placeholder="E.G. JOHN DOE"
                        value={formData.cardHolder}
                        onChange={(e) => handleChange('cardHolder', e.target.value)}
                        onBlur={() => handleBlur('cardHolder')}
                        error={getFieldError('cardHolder')}
                        className="uppercase placeholder:opacity-30"
                        required
                    />

                    <AmountInput
                        value={formData.amount}
                        currency={formData.currency}
                        onChange={(val) => handleChange('amount', val)}
                        onCurrencyChange={(cur) => handleChange('currency', cur)}
                        error={getFieldError('amount')}
                    />

                    <div className="pt-4">
                        <SubmitButton
                            amount={formData.amount}
                            currency={formData.currency}
                            disabled={!isFormValid}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentForm;
