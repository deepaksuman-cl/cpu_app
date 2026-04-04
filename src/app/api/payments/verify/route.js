import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Payment from '@/models/payment';
import { verifyRazorpaySignature } from '@/lib/payments/razorpay';

export const runtime = 'nodejs';

function cleanValue(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(req) {
  try {
    const body = await req.json();

    const razorpayOrderId = cleanValue(body.razorpay_order_id);
    const razorpayPaymentId = cleanValue(body.razorpay_payment_id);
    const razorpaySignature = cleanValue(body.razorpay_signature);

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json(
        {
          success: false,
          message: 'Incomplete payment verification payload.',
        },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const payment = await Payment.findOne({
      where: { razorpayOrderId },
    });

    if (!payment) {
      return NextResponse.json(
        {
          success: false,
          message: 'Payment record not found for this order.',
        },
        { status: 404 },
      );
    }

    const isValid = verifyRazorpaySignature({
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature,
    });

    if (!isValid) {
      await payment.update({
        razorpayPaymentId,
        razorpaySignature,
        status: 'signature_failed',
      });

      return NextResponse.json(
        {
          success: false,
          message: 'Payment signature verification failed.',
        },
        { status: 400 },
      );
    }

    await payment.update({
      razorpayPaymentId,
      razorpaySignature,
      status: 'paid',
    });

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully.',
      data: {
        paymentId: payment.id,
        orderId: razorpayOrderId,
      },
    });
  } catch (error) {
    console.error('Verify payment error:', error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Unable to verify payment.',
      },
      { status: 500 },
    );
  }
}
