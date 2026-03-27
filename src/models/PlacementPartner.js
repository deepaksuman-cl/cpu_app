import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';

const PlacementPartner = sequelize.define('placementpartners', {
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logoUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  packageOffered: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  studentName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  courseName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  schoolId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'schools', key: 'id' },
  },
}, {
  timestamps: true,
});

export default PlacementPartner;
