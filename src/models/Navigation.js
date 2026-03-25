import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';

/*
import mongoose from 'mongoose';

const NavigationSchema = new mongoose.Schema(
  {
    documentName: { 
      type: String, 
      required: true, 
      unique: true,
      default: 'main_header' 
    },
    data: { 
      type: mongoose.Schema.Types.Mixed, 
      required: true 
    }
  },
  { timestamps: true }
);

const Navigation = mongoose.models.Navigation || mongoose.model('Navigation', NavigationSchema);
export default Navigation;
*/

const Navigation = sequelize.define('navigations', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  documentName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    defaultValue: 'main_header',
  },
  data: {
    type: DataTypes.JSON,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default Navigation;