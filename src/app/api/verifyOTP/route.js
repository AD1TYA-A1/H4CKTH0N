import { NextResponse } from 'next/server';
import { otpStore } from '../sendOTP/route';

const MAX_ATTEMPTS = 3;

export async function POST(request) {
    try {
        const { phoneNumber, otp } = await request.json();
        console.log(phoneNumber);
        console.log(otp);

        const storedData = otpStore.get(phoneNumber);
        console.log(storedData);
        console.log('All stored keys:', Array.from(otpStore.keys()));

        if (!storedData) {
            return NextResponse.json({
                success: false,
                message: 'OTP not found or expired'
            });
        }

        // Check expiration
        if (Date.now() > storedData.expiresAt) {
            otpStore.delete(phoneNumber);
            return NextResponse.json({
                success: false,
                message: 'OTP expired'
            });
        }

        // Check attempts
        if (storedData.attempts >= MAX_ATTEMPTS) {
            otpStore.delete(phoneNumber);
            return NextResponse.json({
                success: false,
                message: 'Too many failed attempts. Please request a new OTP.'
            });
        }

        // Verify OTP
        if (storedData.otp === otp) {
            otpStore.delete(phoneNumber);
            return NextResponse.json({
                success: true,
                message: 'Verification successful'
            });
        }

        // Increment failed attempts
        storedData.attempts += 1;
        otpStore.set(phoneNumber, storedData);

        return NextResponse.json({
            success: false,
            message: `Invalid OTP. ${MAX_ATTEMPTS - storedData.attempts} attempts remaining.`
        });

    } catch (error) {
        console.error('Error verifying OTP:', error);
        return NextResponse.json(
            { success: false, message: 'Verification failed' },
            { status: 500 }
        );
    }
}