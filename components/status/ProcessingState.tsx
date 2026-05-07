import React from 'react';
import Spinner from '../ui/Spinner';
import Button from '../ui/Button';
import { ProcessingStateProps } from '@/types/common';

/**
 * processing state.
 */
const ProcessingState: React.FC<ProcessingStateProps> = ({ onCancel }) => (
    <div className="text-center space-y-6 py-12 animate-in fade-in duration-500">
        <div className="flex justify-center">
            <div className="p-5 bg-indigo-50 rounded-full">
                <Spinner size="lg" className="text-indigo-600" />
            </div>
        </div>
        <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight text-center">Processing Payment</h3>
            <p className="text-sm text-slate-500 font-medium text-center">Communicating with bank servers...</p>
        </div>
        <div className="flex justify-center">
            <Button variant="ghost" size="sm" onClick={onCancel} className="mt-4">
                Cancel Transaction
            </Button>
        </div>
    </div>
);

export default ProcessingState;
