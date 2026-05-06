'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectHistory, selectPayment, hydrateTransactions } from '@/store/slices/paymentSlice';
import { usePaymentForm } from '@/hooks/usePaymentForm';
import { usePayment } from '@/hooks/usePayment';
import { storage } from '@/utils/storage';

import CardInput from '@/components/payment/CardInput';
import ExpiryInput from '@/components/payment/ExpiryInput';
import CVVInput from '@/components/payment/CVVInput';
import AmountInput from '@/components/payment/AmountInput';
import SubmitButton from '@/components/payment/SubmitButton';
import StatusScreen from '@/components/status/StatusScreen';
import CardPreview from '@/components/preview/CardPreview';
import TransactionHistory from '@/components/history/TransactionHistory';
import TransactionDetails from '@/components/history/TransactionDetails';
import Input from '@/components/ui/Input';

/**
 * Final Integrated Payment Gateway Dashboard.
 */
export default function PaymentGatewayPage() {
    const dispatch = useAppDispatch();
    const history = useAppSelector(selectHistory);
    const { status, selectedTransaction } = useAppSelector(selectPayment);
    const { submitPayment } = usePayment();

    const {
        formData,
        cardType,
        isFormValid,
        handleChange,
        handleBlur,
        getFieldError
    } = usePaymentForm();

    // 1. Hydration: Sync with localStorage on initial mount
    useEffect(() => {
        const persistedHistory = storage.loadTransactions();
        if (persistedHistory.length > 0) {
            dispatch(hydrateTransactions(persistedHistory));
        }
    }, [dispatch]);

    // 2. Persistence: Auto-save history updates
    useEffect(() => {
        storage.saveTransactions(history);
    }, [history]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        // Convert amount from string to number before submitting to the engine
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
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-500">
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Main Flow Panel */}
                <main className="lg:col-span-7 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 overflow-hidden border border-slate-100 min-h-[640px] flex flex-col">
                    {status === 'IDLE' ? (
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
                    ) : (
                        <div className="p-8 md:p-14 flex-1 flex flex-col items-center justify-center">
                            <div className="max-w-md w-full">
                                <StatusScreen />
                            </div>
                        </div>
                    )}
                </main>

                {/* Sidebar Context Panel: Visual Preview & Historical Context */}
                <aside className="lg:col-span-5 space-y-8">
                    {/* Live Card Visualization */}
                    <div className="bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl shadow-slate-900/30">
                        <CardPreview
                            cardNumber={formData.cardNumber}
                            cardHolder={formData.cardHolder}
                            expiryDate={formData.expiryDate}
                            cardType={cardType}
                        />
                    </div>

                    {/* Historical Activity Monitoring */}
                    <section className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/40">
                        <header className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Recent Activity</h3>
                            <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full uppercase tracking-widest">
                                {history.length} Records
                            </span>
                        </header>
                        <TransactionHistory />
                    </section>
                </aside>

                {/* Global Detailed Inspection Overlay */}
                {selectedTransaction && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-500">
                        <div className="w-full max-w-xl">
                            <TransactionDetails />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
