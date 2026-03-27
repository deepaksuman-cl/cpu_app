import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';

const Testimonial = sequelize.define('testimonials', {
  studentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reviewText: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  batch: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  course: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  package: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tag: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tagColor: {
    type: DataTypes.STRING,
    allowNull: true,
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

export default Testimonial;
