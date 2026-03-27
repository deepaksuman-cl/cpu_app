import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';

const Facility = sequelize.define('facilities', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
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

export default Facility;
