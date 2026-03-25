import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';

const HomePage = sequelize.define('homepages', {
  id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.INTEGER,
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
