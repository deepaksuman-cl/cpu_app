import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';

/*
import mongoose from 'mongoose';

const LabelLinkSchema = new mongoose.Schema({
  label: String,
  link: String
}, { _id: false });

const TitleHighlightSchema = new mongoose.Schema({
  main: String,
  highlight: String,
  skyHighlight: String
}, { _id: false });

const HeroSchema = new mongoose.Schema({
  bgImage: String,
  badge: String,
  title: TitleHighlightSchema,
  subtitle: String,
  description: String,
  cta: [new mongoose.Schema({
    label: String,
    link: String,
    primary: Boolean
  }, { _id: false })],
  quickStats: [new mongoose.Schema({
    value: String,
    label: String
  }, { _id: false })]
}, { _id: false });

// ... other schemas ...

const SchoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  metaTitle: String,
  metaDescription: String,
  breadcrumb: [LabelLinkSchema],
  hero: HeroSchema,
  stats: [StatItemSchema],
  about: AboutSchema,
  programmes: ProgrammesHeaderSchema,
  placements: PlacementsSchema,
  alumni: AlumniSchema,
  industry: IndustrySchema,
  research: ResearchSchema,
  community: CommunitySchema,
  infrastructure: InfrastructureSchema,
  testimonials: TestimonialsSchema,
  exploreDepartment: ExploreDepartmentSchema
}, { timestamps: true });

const School = mongoose.model('School', SchoolSchema);
export default School;
*/

const School = sequelize.define('schools', {
  id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.INTEGER,
    primaryKey: true,
     autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  metaTitle: {
    type: DataTypes.STRING,
  },
  metaDescription: {
    type: DataTypes.TEXT,
  },
  breadcrumb: {
    type: DataTypes.JSON,
  },
  hero: {
    type: DataTypes.JSON,
  },
  stats: {
    type: DataTypes.JSON,
  },
  about: {
    type: DataTypes.JSON,
  },
  programmes: {
    type: DataTypes.JSON,
  },
  placements: {
    type: DataTypes.JSON,
  },
  alumni: {
    type: DataTypes.JSON,
  },
  industry: {
    type: DataTypes.JSON,
  },
  research: {
    type: DataTypes.JSON,
  },
  community: {
    type: DataTypes.JSON,
  },
  infrastructure: {
    type: DataTypes.JSON,
  },
  testimonials: {
    type: DataTypes.JSON,
  },
  exploreDepartment: {
    type: DataTypes.JSON,
  },
}, {
  timestamps: true,
});

export default School;
