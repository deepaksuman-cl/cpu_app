import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';

const Flipbook = sequelize.define('flipbooks', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  pdf_url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  cover_image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  meta_title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  meta_description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  cover_image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  backdrop_image: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  hooks: {
    beforeValidate: (flipbook) => {
      if (flipbook.title && !flipbook.slug) {
        flipbook.slug = flipbook.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
      }
    }
  },
  indexes: [
    {
      name: 'idx_flipbook_slug',
      unique: true,
      fields: ['slug']
    }
  ]
});

export default Flipbook;
