import mongoose from 'mongoose';

// --- Sub-Schemas for Strict Structure ---

const LabelLinkSchema = new mongoose.Schema({
  label: String,
  link: String
}, { _id: false });

const TitleHighlightSchema = new mongoose.Schema({
  main: String,
  highlight: String,
  skyHighlight: String
}, { _id: false });

// A flexible schema that can be either a String or a TitleHighlightSchema
// However, Mongoose doesn't support easy "or" types for sub-schemas without Mixed.
// So we will use the Object structure as the standard, but handle mapping in seeder if needed.
// Actually, let's just use TitleHighlightSchema for everything that's failing.

const HeroSchema = new mongoose.Schema({
  bgImage: String,
  badge: String,
  title: TitleHighlightSchema,
  subtitle: String, // Added subtitle
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

const StatItemSchema = new mongoose.Schema({
  value: String,
  label: String,
  icon: String
}, { _id: false });

const ExploreDepartmentSchema = new mongoose.Schema({
  sectionTitle: TitleHighlightSchema,
  subtitle: String,
  items: [new mongoose.Schema({
    icon: String,
    title: String,
    description: String,
    items: [String],
    link: String,
    slug: String
  }, { _id: false })]
}, { _id: false });

const AboutSchema = new mongoose.Schema({
  vision: {
    title: TitleHighlightSchema, // Standardized
    label: String,
    icon: String,
    text: String,
    highlights: [new mongoose.Schema({
      value: String,
      label: String
    }, { _id: false })]
  },
  mission: {
    title: TitleHighlightSchema, // Standardized
    label: String,
    icon: String,
    points: [String]
  }
}, { _id: false });

const ProgrammeCourseSchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  specializations: [new mongoose.Schema({
    name: String,
    slug: String
  }, { _id: false })]
}, { _id: false });

const LevelSchema = new mongoose.Schema({
  label: String,
  icon: String,
  courses: [ProgrammeCourseSchema]
}, { _id: false });

const ProgrammesHeaderSchema = new mongoose.Schema({
  bgImage: String,
  title: TitleHighlightSchema,
  subtitle: String,
  description: String,
  levels: [LevelSchema]
}, { _id: false });

const PlacementItemSchema = new mongoose.Schema({
  name: String,
  company: String,
  pkg: String,
  img: String,
  slug: String // Added slug
}, { _id: false });

const PlacementsSchema = new mongoose.Schema({
  title: {
    main: String,
    highlight: String
  },
  label: String,
  subtitle: String,
  list: [PlacementItemSchema]
}, { _id: false });

const AlumniItemSchema = new mongoose.Schema({
  name: String,
  role: String,
  company: String,
  img: String,
  slug: String // Added slug
}, { _id: false });

const AlumniSchema = new mongoose.Schema({
  title: TitleHighlightSchema,
  label: String,
  list: [AlumniItemSchema]
}, { _id: false });

const IndustryPartnerSchema = new mongoose.Schema({
  name: String,
  url: String,
  slug: String // Added slug
}, { _id: false });

const IndustrySchema = new mongoose.Schema({
  title: TitleHighlightSchema,
  label: String,
  partners: [IndustryPartnerSchema]
}, { _id: false });

const ResearchSchema = new mongoose.Schema({
  title: TitleHighlightSchema,
  label: String,
  gallery: [String],
  stats: [StatItemSchema]
}, { _id: false });

const CommunitySchema = new mongoose.Schema({
  title: TitleHighlightSchema,
  label: String,
  description: [String],
  gallery: [new mongoose.Schema({
    src: String,
    caption: String
  }, { _id: false })]
}, { _id: false });

const InfraItemSchema = new mongoose.Schema({
  title: String,
  desc: String,
  img: String,
  slug: String // Added slug
}, { _id: false });

const InfrastructureSchema = new mongoose.Schema({
  title: TitleHighlightSchema,
  label: String,
  list: [InfraItemSchema]
}, { _id: false });

const TestimonialItemSchema = new mongoose.Schema({
  name: String,
  batch: String,
  company: String,
  emoji: String,
  rating: Number,
  photo: String,
  text: String
}, { _id: false });

const TestimonialsSchema = new mongoose.Schema({
  title: TitleHighlightSchema,
  label: String,
  list: [TestimonialItemSchema]
}, { _id: false });

// --- Main School Schema ---

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
  exploreDepartment: ExploreDepartmentSchema // Added exploreDepartment
}, { timestamps: true });

// Force re-compile to pick up schema changes in development
if (mongoose.models.School) {
  delete mongoose.models.School;
}

const School = mongoose.model('School', SchoolSchema);

export default School;
