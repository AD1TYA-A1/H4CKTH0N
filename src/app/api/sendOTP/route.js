import { NextResponse } from 'next/server';
import twilio from 'twilio';

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

// In-memory store (use database in production)
const otpStore = new Map();

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request) {
    try {
        const { phoneNumber } = await request.json();

        // Validate phone number format
        if (!phoneNumber || !phoneNumber.startsWith('+')) {
            return NextResponse.json(
                { success: false, message: 'Invalid phone number format. Use +1234567890' },
                { status: 400 }
            );
        }

        const otp = generateOTP();
        console.log(phoneNumber,"Phone Number at SENDOTP");
        
        // Store OTP with 5-minute expiration
        otpStore.set(phoneNumber, {
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000,
            attempts: 0
        });
        console.log("Your OTP is : ",otp,"for the Number",phoneNumber);
        
        // Send SMS
        await client.messages.create({
            body: `
            This is a demo OTP testing message!!
            Your verification code is: ${otp}. Valid for 5 minutes.
            Kindly Share this with EveryOne 😊
             
            `,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber
        });

        return NextResponse.json({
            success: true,
            message: 'OTP sent successfully'
        });

    } catch (error) {
        console.error('Error sending OTP:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to send OTP' },
            { status: 500 }
        );
    }
}

// Export the otpStore for use in verify route
export { otpStore };