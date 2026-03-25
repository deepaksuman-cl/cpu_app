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
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  school: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'ProgrammeCategories',
      key: 'id',
    },
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
});

// Relationships
ProgrammeCategory.hasMany(ProgrammeCourse, { foreignKey: 'categoryId', as: 'courses' });
ProgrammeCourse.belongsTo(ProgrammeCategory, { foreignKey: 'categoryId', as: 'category' });

export default ProgrammeCourse;