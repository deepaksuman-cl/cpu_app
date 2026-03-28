import bcrypt from 'bcrypt';
import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';

const User = sequelize.define('users', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 50],
    },
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    lowercase: true,
    validate: {
      isEmail: true,
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // 🔐 Account Security
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, // admin ke liye true rakh sakte ho
  },

  loginAttempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  lockUntil: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  // 🔑 Password Reset
  resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  resetPasswordExpires: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  // 🎭 Role (future proof)
  role: {
    type: DataTypes.ENUM('admin', 'super_admin'),
    defaultValue: 'super_admin',
  },

}, {
  timestamps: true,

  paranoid: true, // soft delete (data delete nahi hota)

  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 12);
    },

    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 12);
      }
    },
  }
});

export default User;