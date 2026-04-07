import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';

const AboutPageContent = sequelize.define('aboutpagecontents', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  section_key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  content: {
    type: DataTypes.JSON,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default AboutPageContent;
