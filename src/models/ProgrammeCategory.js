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
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  timestamps: true,
});

export default ProgrammeCategory;