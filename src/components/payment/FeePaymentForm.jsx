'use client';

import { useState } from 'react';
import {
  AlertCircle,
  Building,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Hash,
  IndianRupee,
  Loader2,
  Mail,
  Map,
  MapPin,
  Phone,
  User,
  Users,
} from 'lucide-react';

const initialFormData = {
  studentType: '',
  studentId: '',
  studentName: '',
  fatherName: '',
  mobileNumber: '',
  email: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  fee: '',
};

function FloatingInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  options = null,
  hidden = false,
  icon: Icon,
  placeholder = ' ',
}) {
  if (hidden) {
    return null;
  }

  return (
    <div className="relative mb-2 group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400 group-focus-within:text-[#00588b] transition-colors">
        {Icon ? <Icon className="h-4 w-4" /> : null}
      </div>

      {options ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`peer block w-full appearance-none rounded-lg border border-gray-200 bg-white pt-5 pb-2.5 text-sm text-gray-900 transition-all focus:border-[#00588b] focus:outline-none focus:ring-1 focus:ring-[#00588b] ${Icon ? 'pl-10' : 'pl-4'} pr-8`}
          required={required}
        >
          <option value="" disabled hidden></option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`peer block w-full appearance-none rounded-lg border border-gray-200 bg-white pt-5 pb-2.5 text-sm text-gray-900 transition-all focus:border-[#00588b] focus:outline-none focus:ring-1 focus:ring-[#00588b] ${Icon ? 'pl-10' : 'pl-4'}`}
          placeholder={placeholder}
          required={required}
        />
      )}

      <label
        htmlFor={name}
        className={`absolute top-4 z-10 origin-[0] text-sm text-gray-500 duration-300 ${Icon ? 'left-10' : 'left-4'} transform peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-[0.80] peer-focus:text-[#00588b] ${value ? '-translate-y-3 scale-[0.80]' : ''}`}
      >
        {label}
      </label>

      {options ? (
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      ) : null}
    </div>
  );
}

export default function FeePaymentForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const isOldStudent = formData.studentType === '2';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const showMessage = (type, text) => {
    setNotification({ type, text });
    window.setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const orderResponse = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const orderResult = await orderResponse.json();

      if (!orderResponse.ok || !orderResult.success) {
        throw new Error(orderResult.message || 'Unable to create payment order.');
      }

      if (typeof window === 'undefined' || !window.Razorpay) {
        throw new Error('Razorpay checkout could not be loaded. Please refresh and try again.');
      }

      const options = {
        key: orderResult.data.keyId,
        amount: orderResult.data.amount,
        currency: orderResult.data.currency,
        name: 'Career Point University',
        description: 'Fee payment',
        order_id: orderResult.data.orderId,
        prefill: {
          name: formData.studentName,
          email: formData.email,
          contact: formData.mobileNumber,
        },
        notes: {
          studentType: isOldStudent ? 'Old Student' : 'New Student',
          studentId: formData.studentId || '',
        },
        theme: {
          color: '#00588b',
        },
        handler: async (response) => {
          setIsLoading(true);

          try {
            const verifyResponse = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(response),
            });

            const verifyResult = await verifyResponse.json();

            if (!verifyResponse.ok || !verifyResult.success) {
              throw new Error(verifyResult.message || 'Payment verification failed.');
            }

            showMessage('success', 'Payment successful. Your fee payment has been verified.');
            setFormData(initialFormData);
          } catch (error) {
            showMessage('error', error.message || 'Payment completed but verification failed.');
          } finally {
            setIsLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
            showMessage('error', 'Payment window closed before completion.');
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on('payment.failed', (response) => {
        setIsLoading(false);
        showMessage(
          'error',
          response?.error?.description || 'Payment failed. Please try again.',
        );
      });

      setIsLoading(false);
      razorpay.open();
    } catch (error) {
      setIsLoading(false);
      showMessage('error', error.message || 'Unable to start payment.');
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 text-gray-800 selection:bg-[#ffb900] selection:text-white sm:px-6 lg:px-8">
      <div className="fixed inset-0 -z-10 overflow-hidden bg-[#f8fbff] pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] h-[50%] w-[50%] rounded-full bg-gradient-to-br from-[#00588b]/5 to-transparent blur-3xl" />
        <div className="absolute top-[60%] -right-[10%] h-[60%] w-[60%] rounded-full bg-gradient-to-tl from-[#ffb900]/10 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {notification ? (
        <div
          className={`fixed top-6 right-6 z-50 flex max-w-sm items-center rounded-lg border-l-4 bg-white p-4 text-sm shadow-lg ${
            notification.type === 'success'
              ? 'border-green-500 text-green-800'
              : 'border-red-500 text-red-800'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="mr-3 h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="mr-3 h-5 w-5 text-red-500" />
          )}
          <div className="font-medium">{notification.text}</div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="ml-4 text-gray-400 transition-colors hover:text-gray-900"
          >
            &times;
          </button>
        </div>
      ) : null}

      <div className="relative z-10 w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Pay Fee <span className="text-[#00588b]">Online</span>
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Fast, secure, and easy fee payment portal.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/50 bg-white/80 shadow-xl backdrop-blur-sm">
          <div className="p-6 sm:p-8 md:p-10">
            <form id="applicationForm" onSubmit={handleSubmit}>
              <div className="mb-6 flex items-center border-b border-gray-100 pb-4">
                <User className="mr-2 h-5 w-5 text-[#ffb900]" />
                <h2 className="text-lg font-semibold text-gray-800">Student Detail</h2>
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
                <FloatingInput
                  label="Student Type"
                  name="studentType"
                  value={formData.studentType}
                  onChange={handleChange}
                  icon={Users}
                  options={[
                    { value: '1', label: 'New Student' },
                    { value: '2', label: 'Old Student' },
                  ]}
                  required
                />

                <FloatingInput
                  label="Student K-ID"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  icon={Hash}
                  hidden={!isOldStudent}
                  required={isOldStudent}
                />

                {!isOldStudent ? <div className="hidden md:block" /> : null}

                <FloatingInput
                  label="Student Name"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  icon={User}
                  required
                />

                <FloatingInput
                  label="Father Name"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  icon={User}
                />

                <FloatingInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  icon={Mail}
                  required
                />

                <FloatingInput
                  label="Mobile Number"
                  name="mobileNumber"
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  icon={Phone}
                  required
                />

                <div className="md:col-span-2">
                  <FloatingInput
                    label="Full Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    icon={MapPin}
                  />
                </div>

                <FloatingInput
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  icon={Building}
                />

                <FloatingInput
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  icon={Map}
                />

                <FloatingInput
                  label="Pincode"
                  name="pincode"
                  type="number"
                  value={formData.pincode}
                  onChange={handleChange}
                  icon={MapPin}
                />

                <FloatingInput
                  label="Fee Amount"
                  name="fee"
                  type="number"
                  value={formData.fee}
                  onChange={handleChange}
                  icon={IndianRupee}
                  required
                />
              </div>



              <div className="mt-10 flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative inline-flex min-w-[200px] w-full items-center justify-center overflow-hidden rounded-full bg-[#00588b] px-8 py-3.5 text-base font-medium text-white transition-all duration-300 hover:bg-[#004770] hover:shadow-lg hover:shadow-[#00588b]/30 focus:outline-none focus:ring-2 focus:ring-[#00588b] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  <div className="absolute inset-0 h-full w-full -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />

                  {isLoading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <CreditCard className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  )}
                  <span>{isLoading ? 'Processing...' : 'Pay Fee Securely'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes shimmer {
              100% { transform: translateX(100%); }
            }
          `,
        }}
      />
    </div>
  );
}
