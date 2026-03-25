import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';

/*
import mongoose from 'mongoose';

const ProgrammeCategorySchema = new mongoose.Schema({
  label: { type: String, required: true, unique: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.ProgrammeCategory || mongoose.model('ProgrammeCategory', ProgrammeCategorySchema);
*/

const ProgrammeCategory = sequelize.define('programmecategorys', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
     autoIncrement: true

  },
  label: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true, // Managed by named index 'idx_pcat_label' below
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  timestamps: true,
  indexes: [
    { name: 'idx_pcat_label', unique: true, fields: ['label'] },
    { name: 'idx_pcat_order', fields: ['order'] }
  ]
});

export default ProgrammeCategory;