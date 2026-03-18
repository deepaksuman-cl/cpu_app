import mongoose from 'mongoose';

// --- Sub-Schemas for Course Structure ---

const TitleHighlightSchema = new mongoose.Schema({
  main: String,
  highlight: String,
  skyHighlight: String
}, { _id: false });

const CTASchema = new mongoose.Schema({
  label: String,
  link: String,
  primary: Boolean
}, { _id: false });

const ValueLabelSchema = new mongoose.Schema({
  value: String,
  label: String
}, { _id: false });

const HeroSchema = new mongoose.Schema({
  bgImage: String,
  badge: String,
  title: TitleHighlightSchema,
  description: String,
  cta: [CTASchema],
  quickStats: [ValueLabelSchema]
}, { _id: false });

const AccomplishmentsSchema = new mongoose.Schema({
  heading: String,
  trustBadge: String,
  stats: [new mongoose.Schema({
    icon: String,
    value: String,
    label: String,
    suffix: String
  }, { _id: false })]
}, { _id: false });

const OverviewSchema = new mongoose.Schema({
  sectionTitle: TitleHighlightSchema,
  subtitle: String,
  paragraphs: [String],
  tags: [String],
  gridCards: [new mongoose.Schema({
    icon: String,
    label: String,
    sub: String,
    color: String
  }, { _id: false })]
}, { _id: false });

const ScopeSchema = new mongoose.Schema({
  sectionTitle: TitleHighlightSchema,
  subtitle: String,
  bgImage: String,
  body: String
}, { _id: false });

const CurriculumSchema = new mongoose.Schema({
  sectionTitle: TitleHighlightSchema,
  subtitle: String,
  introNote: String,
  outroNote: String,
  courseStructure: [new mongoose.Schema({
    category: String,
    shortName: String,
    description: String,
    credits: Number
  }, { _id: false })],
  valueAddedCourses: [new mongoose.Schema({
    name: String,
    credits: Number,
    category: String,
    description: String
  }, { _id: false })],
  accordionSections: [new mongoose.Schema({
    id: String,
    title: String,
    content: mongoose.Schema.Types.Mixed, // High priority for curriculum content
    hasTable: Boolean
  }, { _id: false })]
}, { _id: false });

const DeptSlideSchema = new mongoose.Schema({
  title: String,
  icon: String,
  items: [String],
  cta: String
}, { _id: false });

const AdmissionFeeSchema = new mongoose.Schema({
  sectionTitle: TitleHighlightSchema,
  subtitle: String,
  bgImage: String,
  youtubeVideoId: String,
  admissionCriteria: [new mongoose.Schema({
    color: String,
    text: String,
    link: String
  }, { _id: false })],
  feeDetails: [new mongoose.Schema({
    label: String,
    amount: String
  }, { _id: false })]
}, { _id: false });

const ScholarshipsSchema = new mongoose.Schema({
  sectionTitle: TitleHighlightSchema,
  subtitle: String,
  bgImage: String,
  dateHeaders: [String],
  rows: [new mongoose.Schema({
    range: String,
    values: [String]
  }, { _id: false })],
  earlyBird: {
    label: String,
    values: [String]
  },
  notes: [new mongoose.Schema({
    icon: String,
    text: String
  }, { _id: false })]
}, { _id: false });

const WhyJoinSchema = new mongoose.Schema({
  sectionTitle: TitleHighlightSchema,
  subtitle: String,
  reasons: [new mongoose.Schema({
    icon: String,
    title: String,
    desc: String
  }, { _id: false })]
}, { _id: false });

const UniqueFeatureSchema = new mongoose.Schema({
  sectionTitle: TitleHighlightSchema,
  subtitle: String,
  bgImage: String,
  features: [new mongoose.Schema({
    num: String,
    icon: String,
    title: String,
    desc: String
  }, { _id: false })]
}, { _id: false });

const ApplyStepsSchema = new mongoose.Schema({
  sectionTitle: TitleHighlightSchema,
  subtitle: String,
  bgImage: String,
  guideLabel: String,
  ctaLabel: String,
  ctaLink: String,
  steps: [new mongoose.Schema({
    icon: String,
    step: String,
    label: String,
    desc: String
  }, { _id: false })]
}, { _id: false });

const FAQSchema = new mongoose.Schema({
  sectionTitle: TitleHighlightSchema,
  subtitle: String,
  items: [new mongoose.Schema({
    q: String,
    a: String
  }, { _id: false })]
}, { _id: false });

const ExploreDepartmentSchema = new mongoose.Schema({
  sectionTitle: TitleHighlightSchema,
  subtitle: String,
  items: [new mongoose.Schema({
    icon: String,
    title: String,
    description: String,
    link: String,
    slug: String
  }, { _id: false })]
}, { _id: false });

// --- Main Course Schema ---

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
  
  // Structured Data
  title: String,
  duration: String,
  eligibility: String,
  description: String,
  
  hero: HeroSchema,
  accomplishments: AccomplishmentsSchema,
  overview: OverviewSchema,
  scope: ScopeSchema,
  curriculum: CurriculumSchema,
  admissionFee: AdmissionFeeSchema,
  scholarships: ScholarshipsSchema,
  whyJoin: WhyJoinSchema,
  uniqueFeatures: UniqueFeatureSchema,
  applySteps: ApplyStepsSchema,
  faq: FAQSchema,
  exploreDepartment: {
    sectionTitle: TitleHighlightSchema,
    subtitle: String,
    slides: [DeptSlideSchema]
  }
}, { timestamps: true });

// Force re-compile to pick up schema changes in development
if (mongoose.models.Course) {
  delete mongoose.models.Course;
}

const Course = mongoose.model('Course', CourseSchema);

export default Course;
