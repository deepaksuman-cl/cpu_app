import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Payment from '@/models/payment';
import { createRazorpayOrder, getRazorpayKeyId } from '@/lib/payments/razorpay';

export const runtime = 'nodejs';

function cleanValue(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^\d{10}$/.test(phone);
}

export async function POST(req) {
  try {
    const body = await req.json();

    const payload = {
      studentType: cleanValue(body.studentType),
      studentName: cleanValue(body.studentName),
      fatherName: cleanValue(body.fatherName),
      mobileNumber: cleanValue(body.mobileNumber),
      email: cleanValue(body.email).toLowerCase(),
      address: cleanValue(body.address),
      city: cleanValue(body.city),
      state: cleanValue(body.state),
      pincode: cleanValue(body.pincode),
      fee: cleanValue(body.fee),
    };

    const studentId = cleanValue(body.studentId);
    const errors = [];
    const amountInRupees = Number.parseFloat(payload.fee);

    if (!['1', '2'].includes(payload.studentType)) {
      errors.push('Please select a valid student type.');
    }

    if (payload.studentType === '2' && !studentId) {
      errors.push('Student K-ID is required for old students.');
    }

    if (!payload.studentName) {
      errors.push('Student name is required.');
    }

    if (!payload.email || !isValidEmail(payload.email)) {
      errors.push('A valid email address is required.');
    }

    if (!payload.mobileNumber || !isValidPhone(payload.mobileNumber)) {
      errors.push('A valid 10-digit mobile number is required.');
    }

    if (!Number.isFinite(amountInRupees) || amountInRupees <= 0) {
      errors.push('Fee amount must be greater than zero.');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: errors[0],
        },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const razorpayOrder = await createRazorpayOrder({
      amount: Math.round(amountInRupees * 100),
      receipt: `cpu_fee_${Date.now()}`,
      notes: {
        studentType: payload.studentType,
        studentName: payload.studentName,
        studentId,
        email: payload.email,
        mobileNumber: payload.mobileNumber,
      },
    });

    const payment = await Payment.create({
      ...payload,
      fee: amountInRupees.toFixed(2),
      razorpayOrderId: razorpayOrder.id,
      status: 'created',
    });

    return NextResponse.json({
      success: true,
      message: 'Order created successfully.',
      data: {
        paymentId: payment.id,
        keyId: getRazorpayKeyId(),
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },
    });
  } catch (error) {
    console.error('Create order error:', error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Unable to create payment order.',
      },
      { status: 500 },
    );
  }
}
