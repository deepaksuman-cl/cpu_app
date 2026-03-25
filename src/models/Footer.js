import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';

/*
import mongoose from 'mongoose';

const FooterSchema = new mongoose.Schema({
  logo: String,
  aboutText: String,
  colors: {
    primary: String,
    background: String
  },
  socialLinks: [SocialLinkSchema],
  columns: [FooterColumnSchema],
  contact: [ContactItemSchema],
  copyright: {
    text: String,
    links: [LinkSchema]
  },
  floatingButtons: [FloatingButtonSchema],
  seo: {
    metaTitle: String,
    metaDescription: String,
    metaKeywords: String
  }
}, { timestamps: true });

const Footer = mongoose.model('Footer', FooterSchema);
export default Footer;
*/

const Footer = sequelize.define('footers', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  logo: {
    type: DataTypes.STRING,
  },
  aboutText: {
    type: DataTypes.TEXT,
  },
  colors: {
    type: DataTypes.JSON,
  },
  socialLinks: {
    type: DataTypes.JSON,
  },
  columns: {
    type: DataTypes.JSON,
  },
  contact: {
    type: DataTypes.JSON,
  },
  copyright: {
    type: DataTypes.JSON,
  },
  floatingButtons: {
    type: DataTypes.JSON,
  },
  seo: {
    type: DataTypes.JSON,
  },
}, {
  timestamps: true,
});

export default Footer;
