import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';

const Media = sequelize.define('medias', {
  displayName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  originalName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isExternal: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  mimeType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  altText: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: 'Media',
  freezeTableName: true,
});

export default Media;
