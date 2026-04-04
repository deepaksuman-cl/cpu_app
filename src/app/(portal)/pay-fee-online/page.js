import Script from 'next/script';
import FeePaymentForm from '@/components/payment/FeePaymentForm';

export const metadata = {
  title: 'Pay Fee Online | Career Point University',
  description: 'Secure online fee payment portal for Career Point University students.',
};

export default function PayFeeOnlinePage() {
  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      <FeePaymentForm />
    </>
  );
}
