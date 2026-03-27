import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';

const FAQ = sequelize.define('faqs', {
  question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  schoolId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'schools', key: 'id' },
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'courses', key: 'id' },
  },
}, {
  timestamps: true,
});

export default FAQ;
