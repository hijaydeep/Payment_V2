'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectHistory, selectPayment, hydrateTransactions } from '@/store/slices/paymentSlice';
import { usePaymentForm } from '@/hooks/usePaymentForm';
import { storage } from '@/utils/storage';

import PaymentForm from '@/components/payment/PaymentForm';
import StatusScreen from '@/components/status/StatusScreen';
import CardPreview from '@/components/preview/CardPreview';
import TransactionHistory from '@/components/history/TransactionHistory';
import TransactionDetails from '@/components/history/TransactionDetails';

/**
 * Final Integrated Payment Gateway Dashboard.
 */
export default function PaymentGatewayPage() {
    const dispatch = useAppDispatch();
    const history = useAppSelector(selectHistory);
    const { status, selectedTransaction } = useAppSelector(selectPayment);

    // card preview data from the form state
    const { formData, cardType } = usePaymentForm();

    // Sync with localStorage on initial mount
    useEffect(() => {
        const persistedHistory = storage.loadTransactions();
        if (persistedHistory.length > 0) {
            dispatch(hydrateTransactions(persistedHistory));
        }
    }, [dispatch]);

    // Auto-save history updates
    useEffect(() => {
        storage.saveTransactions(history);
    }, [history]);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-500">
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Main Flow Panel */}
                <main className="lg:col-span-7 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 overflow-hidden border border-slate-100 min-h-[640px] flex flex-col">
                    {status === 'IDLE' ? (
                        <PaymentForm />
                    ) : (
                        <div className="p-8 md:p-14 flex-1 flex flex-col items-center justify-center">
                            <div className="max-w-md w-full">
                                <StatusScreen />
                            </div>
                        </div>
                    )}
                </main>

                {/* Sidebar Context Panel */}
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

                {/* Global Detailed View */}
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
