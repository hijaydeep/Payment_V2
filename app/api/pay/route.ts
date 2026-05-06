import { NextResponse } from 'next/server';

interface PaymentRequestBody {
    transactionId: string;
    amount: number;
    currency: string;
}

/**
 * Mock Payment API Route
 * Simulates gateway processing with validation and random outcomes.
 */
export async function POST(req: Request) {
    try {
        const body = (await req.json()) as Partial<PaymentRequestBody>;
        const { transactionId, amount, currency } = body;

        // Payload Validation: Ensure strict API contract with safe type checking
        if (!transactionId || typeof amount !== 'number' || !currency) {
            return NextResponse.json({
                success: false,
                message: 'Invalid payload',
                failureReason: 'Missing or invalid required fields'
            }, { status: 400 });
        }

        const latency = Math.floor(Math.random() * 2000) + 1000;
        const random = Math.random() * 100;

        // 15% Probability: Triggers Client Timeout
        if (random < 15) {
            await new Promise(resolve => setTimeout(resolve, 10000));
            return NextResponse.json({
                success: false,
                transactionId,
                status: 'TIMEOUT',
                message: 'Gateway Timeout',
                failureReason: 'Gateway Timeout'
            }, { status: 504 });
        }

        await new Promise(resolve => setTimeout(resolve, latency));

        // 25% Probability: Transaction Failure
        if (random < 40) { // 15 (timeout) + 25 (fail) = 40
            const failureReasons = [
                'Insufficient funds',
                'Bank declined the transaction',
                'Gateway unavailable',
                'Potential fraud suspected'
            ];
            const reason = failureReasons[Math.floor(Math.random() * failureReasons.length)];

            return NextResponse.json({
                success: false,
                transactionId,
                status: 'FAILED',
                message: 'Payment failed',
                failureReason: reason
            }, { status: 400 });
        }

        // 60% Probability: Transaction Success
        return NextResponse.json({
            success: true,
            transactionId,
            status: 'SUCCESS',
            message: `Successfully processed ${currency} ${amount}`
        });

    } catch (error: unknown) {
        return NextResponse.json({
            success: false,
            message: 'Internal Server Error',
            failureReason: 'System Error'
        }, { status: 500 });
    }
}
