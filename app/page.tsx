'use client';

import React from 'react';
import CardInput from '@/components/payment/CardInput';
import ExpiryInput from '@/components/payment/ExpiryInput';
import CVVInput from '@/components/payment/CVVInput';
import AmountInput from '@/components/payment/AmountInput';
import SubmitButton from '@/components/payment/SubmitButton';
import CardPreview from '@/components/preview/CardPreview';
import Input from '@/components/ui/Input';
import { usePaymentForm } from '@/hooks/usePaymentForm';

export default function PaymentGatewayPage() {
    const {
        formData,
        cardType,
        isFormValid,
        handleChange,
        handleBlur,
        getFieldError
    } = usePaymentForm();

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
                
                {/* Left Panel: Visual Summary */}
                <div className="bg-slate-900 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden order-2 lg:order-1">
                    <div className="relative z-10">
                        <header className="mb-12">
                            <h1 className="text-2xl font-bold tracking-tight text-white">Checkout</h1>
                            <p className="text-slate-400 text-sm mt-2 font-medium">Payment Simulator v2.0</p>
                        </header>
                        <div className="mb-12">
                            <CardPreview 
                                cardNumber={formData.cardNumber}
                                cardHolder={formData.cardHolder}
                                expiryDate={formData.expiryDate}
                                cardType={cardType}
                            />
                        </div>
                    </div>
                    <footer className="relative z-10 flex items-center justify-between text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                        <p>© 2026 Simulator</p>
                        <p>AES-256 SECURED</p>
                    </footer>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full -mr-48 -mt-48 blur-3xl" />
                </div>

                {/* Right Panel: Interactive Form */}
                <div className="p-8 md:p-12 order-1 lg:order-2">
                    <div className="max-w-md mx-auto space-y-10">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight text-left">Payment Details</h2>
                            <p className="text-slate-400 text-sm mt-2 font-medium text-left">Please enter your transaction information below.</p>
                        </div>

                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            {/* Card Number (Primary Priority) */}
                            <CardInput 
                                value={formData.cardNumber} 
                                onChange={(val) => handleChange('cardNumber', val)} 
                                onBlur={() => handleBlur('cardNumber')}
                                error={getFieldError('cardNumber')}
                            />

                            {/* Expiry + CVV Inline Group */}
                            <div className="grid grid-cols-2 gap-6">
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

                            {/* Card Holder */}
                            <Input
                                label="Card Holder"
                                id="cardHolder"
                                placeholder="e.g. John Doe"
                                value={formData.cardHolder}
                                onChange={(e) => handleChange('cardHolder', e.target.value)}
                                onBlur={() => handleBlur('cardHolder')}
                                error={getFieldError('cardHolder')}
                                autoComplete="name"
                                required
                            />

                            {/* Amount & Currency Integrated Control */}
                            <AmountInput 
                                value={formData.amount} 
                                currency={formData.currency} 
                                onChange={(val) => handleChange('amount', val)}
                                onCurrencyChange={(cur) => handleChange('currency', cur)}
                                error={getFieldError('amount')}
                            />

                            <SubmitButton 
                                amount={formData.amount} 
                                currency={formData.currency} 
                                disabled={!isFormValid}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
