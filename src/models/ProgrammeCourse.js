import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';
import ProgrammeCategory from './ProgrammeCategory.js';

/*
import mongoose from 'mongoose';

const ProgrammeCourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  school: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProgrammeCategory', required: true },
  icon: { type: String, required: true },
  colorHex: { type: String, required: true },
  iconBg: { type: String },
  textColor: { type: String },
  borderHover: { type: String },
  programs: { type: String },
  detailsSlug: { type: String, default: '#' },
  badge: {
    label: { type: String }, 
    bgHex: { type: String, default: '#fee2e2' },
    textHex: { type: String, default: '#dc2626' }
  }
}, { timestamps: true });

export default mongoose.models.ProgrammeCourse || mongoose.model('ProgrammeCourse', ProgrammeCourseSchema);
*/

const ProgrammeCourse = sequelize.define('programmecourses', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  schoolId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'schools',
      key: 'id'
    },
    onDelete: 'SET NULL',
  },
  school: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  colorHex: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  iconBg: {
    type: DataTypes.STRING,
  },
  textColor: {
    type: DataTypes.STRING,
  },
  borderHover: {
    type: DataTypes.STRING,
  },
  programs: {
    type: DataTypes.TEXT,
  },
  detailsSlug: {
    type: DataTypes.STRING,
    defaultValue: '#',
  },
  badge: {
    type: DataTypes.JSON,
  },
}, {
  timestamps: true,
  indexes: [
    { name: 'idx_pcourse_category', fields: ['categoryId'] },
    { name: 'idx_pcourse_title', fields: ['title'] }
  ]
});

export default ProgrammeCourse;