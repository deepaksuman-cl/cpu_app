import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';

const HomePage = sequelize.define('HomePage', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    defaultValue: 'Home',
  },
  sections: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {},
  },
  seo: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {
      title: '',
      description: '',
      keywords: '',
      ogImage: ''
    },
  },
}, {
  timestamps: true,
});

export default HomePage;
