import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';

/*
import mongoose from 'mongoose';

const ProgrammeSettingsSchema = new mongoose.Schema({
  metaTitle: { type: String, default: "Programmes | Career Point University" },
  metaDescription: { type: String, default: "Explore our world-class Diploma, UG, PG, and Doctoral programmes." },
  breadcrumbs: [{
    label: { type: String },
    link: { type: String }
  }],
  sidebarCta: {
    icon: { type: String, default: "GraduationCap" },
    title: { type: String, default: "Need Guidance?" },
    description: { type: String, default: "Talk to our admissions counsellor for personalised guidance." },
    buttonText: { type: String, default: "Book Free Counselling" },
    buttonLink: { type: String, default: "/contact" }
  },
  mainCta: {
    icon: { type: String, default: "TrendingUp" },
    badgeText: { type: String, default: "Admissions 2025–26 Open" },
    title: { type: String, default: "Start Your Academic Journey Today" },
    description: { type: String, default: "Limited seats available. Apply before 30th June 2025." },
    primaryBtnText: { type: String, default: "Apply Now" },
    primaryBtnLink: { type: String, default: "/apply" },
    secondaryBtnText: { type: String, default: "Download Brochure" },
    secondaryBtnLink: { type: String, default: "/brochure" }
  }
}, { timestamps: true });

export default mongoose.models.ProgrammeSettings || mongoose.model('ProgrammeSettings', ProgrammeSettingsSchema);
*/

const ProgrammeSettings = sequelize.define('ProgrammeSettings', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  metaTitle: {
    type: DataTypes.STRING,
    defaultValue: "Programmes | Career Point University",
  },
  metaDescription: {
    type: DataTypes.TEXT,
    defaultValue: "Explore our world-class Diploma, UG, PG, and Doctoral programmes.",
  },
  breadcrumbs: {
    type: DataTypes.JSON,
  },
  sidebarCta: {
    type: DataTypes.JSON,
  },
  mainCta: {
    type: DataTypes.JSON,
  },
}, {
  timestamps: true,
});

export default ProgrammeSettings;
