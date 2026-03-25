import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';

/*
import mongoose from 'mongoose';

const PageSchema = new mongoose.Schema({
  title: { type: String },
  slug: { type: String, unique: true, required: true },
  meta: { 
    title: { type: String }, 
    description: { type: String } 
  },
  hero: { 
    title: { type: String }, 
    bgImage: { type: String }, 
    badge: { type: String },
    hideHero: { type: Boolean, default: false }
  },
  blocks: [BlockSchema]
}, { timestamps: true });

const Page = mongoose.model('Page', PageSchema);
export default Page;
*/

const Page = sequelize.define('pages', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
     autoIncrement: true

  },
  title: {
    type: DataTypes.STRING,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  meta: {
    type: DataTypes.JSON,
  },
  hero: {
    type: DataTypes.JSON,
  },
  blocks: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
  },
  pageCssId: { type: DataTypes.STRING, allowNull: true },
  pageCssClass: { type: DataTypes.STRING, allowNull: true },
}, {
  timestamps: true,
  indexes: [
    {
      name: 'idx_page_slug',
      unique: true,
      fields: ['slug'],
    },
  ],
});

export default Page;
