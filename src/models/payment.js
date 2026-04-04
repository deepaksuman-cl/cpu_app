import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';

const Payment = sequelize.define('payments', {
  studentType: {
    type: DataTypes.STRING,
  },
  studentName: {
    type: DataTypes.STRING,
  },
  fatherName: {
    type: DataTypes.STRING,
  },
  mobileNumber: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING,
  },
  pincode: {
    type: DataTypes.STRING,
  },
  fee: {
    type: DataTypes.DECIMAL(10, 2),
  },
  razorpayOrderId: {
    type: DataTypes.STRING,
  },
  razorpayPaymentId: {
    type: DataTypes.STRING,
  },
  razorpaySignature: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'created',
  }
}, {
  timestamps: true,
});

export default Payment;