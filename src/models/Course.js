import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';
import School from './School.js';

/*
import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
  },
  metaTitle: String,
  metaDescription: String,
  
  title: String,
  duration: String,
  eligibility: String,
  description: String,
  
  hero: HeroSchema,
  accomplishments: AccomplishmentsSchema,
  overview: OverviewSchema,
  scope: ScopeSchema,
  curriculum: CurriculumSchema,
  roadmap: {
    sectionTitle: TitleHighlightSchema,
    subtitle: String,
    years: [RoadmapYearSchema]
  },
  admissionFee: AdmissionFeeSchema,
  scholarships: ScholarshipsSchema,
  whyJoin: WhyJoinSchema,
  uniqueFeatures: UniqueFeatureSchema,
  applySteps: ApplyStepsSchema,
  faq: FAQSchema,
  exploreDepartment: ExploreDepartmentSchema
}, { timestamps: true });

const Course = mongoose.model('Course', CourseSchema);
export default Course;
*/

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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
  schoolId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Schools',
      key: 'id',
    },
  },
  metaTitle: {
    type: DataTypes.STRING,
  },
  metaDescription: {
    type: DataTypes.TEXT,
  },
  title: {
    type: DataTypes.STRING,
  },
  duration: {
    type: DataTypes.STRING,
  },
  eligibility: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  hero: {
    type: DataTypes.JSON,
  },
  accomplishments: {
    type: DataTypes.JSON,
  },
  overview: {
    type: DataTypes.JSON,
  },
  scope: {
    type: DataTypes.JSON,
  },
  curriculum: {
    type: DataTypes.JSON,
  },
  roadmap: {
    type: DataTypes.JSON,
  },
  admissionFee: {
    type: DataTypes.JSON,
  },
  scholarships: {
    type: DataTypes.JSON,
  },
  whyJoin: {
    type: DataTypes.JSON,
  },
  uniqueFeatures: {
    type: DataTypes.JSON,
  },
  applySteps: {
    type: DataTypes.JSON,
  },
  faq: {
    type: DataTypes.JSON,
  },
  exploreDepartment: {
    type: DataTypes.JSON,
  },
}, {
  timestamps: true,
});

// Relationships
School.hasMany(Course, { foreignKey: 'schoolId', as: 'courses' });
Course.belongsTo(School, { foreignKey: 'schoolId', as: 'school' });

export default Course;
